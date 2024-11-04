import ssl
import hashlib
import requests
import os
import shutil
import zipfile
from pathlib import Path
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from inferencer import inferencer
from cvss_inferencer import inferencer as cvss_inferencer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir solicitudes desde cualquier origen
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Métodos HTTP permitidos
    allow_headers=["*"],  # Cabeceras permitidas
)

LOCAL_FILE_PATH = Path("/app/modelo_cwe.zip")
REMOTE_FILE_URL = "https://drive.usercontent.google.com/download?id=1OtRNObv-Il2B5nDnpzMSGj_yBJAlskuS&export=download&confirm="
CWE_MODEL_FOLDER_PATH = Path("/app/modelo_cwe")
APP_PATH = Path("/app")

BYTE_RANGE = (0, 10485759)  # 10 MB

def calculate_local_checksum(file_path, byte_limit):
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        chunk = f.read(byte_limit)
        sha256_hash.update(chunk)
    return sha256_hash.hexdigest()

def calculate_remote_checksum(url, byte_range):
    headers = {'Range': f'bytes={byte_range[0]}-{byte_range[1]}'}
    try:
        response = requests.get(url, headers=headers, stream=True)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        raise Exception(f"Error al obtener el archivo remoto: {e}")
        
    sha256_hash = hashlib.sha256()
    for chunk in response.iter_content(chunk_size=8192):
        sha256_hash.update(chunk)
    return sha256_hash.hexdigest()

class VulnerabilityRequest(BaseModel):
    vuln: str

@app.post("/classify")
async def classify_vulnerability(vuln_request: VulnerabilityRequest):
    vuln = vuln_request.vuln
    result = inferencer(vuln)
    return {"result": result}

@app.post("/cvss")
async def classify_vulnerability(vuln_request: VulnerabilityRequest):
    vuln = vuln_request.vuln
    result = cvss_inferencer(vuln)
    return {"result": result}

@app.get("/")
async def read_root():
    example_vuln = (
        "Los dispositivos de CPU Siemens SIMATIC S7-300 permiten a los atacantes remotos causar una denegación de servicio "
        "(transición de modo de defecto) a través de paquetes elaborados en (1) puerto TCP 102 o (2) Profibus."
    )
    result = inferencer(example_vuln)
    return {"example_vuln": example_vuln, "result": result}

@app.get("/check_cwe_update")
async def check_cwe_update():
    try:
        local_checksum = calculate_local_checksum(LOCAL_FILE_PATH, byte_limit=BYTE_RANGE[1] + 1)
        remote_checksum = calculate_remote_checksum(REMOTE_FILE_URL, BYTE_RANGE)

        match = local_checksum == remote_checksum
        return {"checksum_match": match}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e

@app.post("/update_cwe_model")
async def update_cwe_model():
    backup_file_path = f"{LOCAL_FILE_PATH}.bak"
    try:
        if os.path.exists(LOCAL_FILE_PATH):
            if os.path.exists(backup_file_path):
                os.remove(backup_file_path)
            shutil.move(LOCAL_FILE_PATH, backup_file_path)

        response = requests.get(REMOTE_FILE_URL, stream=True)
        if response.status_code == 200:
            with open(LOCAL_FILE_PATH, "wb") as local_zip:
                for chunk in response.iter_content(chunk_size=8192):
                    local_zip.write(chunk)
        else:
            if os.path.exists(backup_file_path):
                shutil.move(backup_file_path, LOCAL_FILE_PATH)
            raise HTTPException(status_code=500, detail="Failed to download CWE model")

        if os.path.exists(CWE_MODEL_FOLDER_PATH):
            shutil.rmtree(CWE_MODEL_FOLDER_PATH)

        with zipfile.ZipFile(LOCAL_FILE_PATH, 'r') as zip_ref:
            zip_ref.extractall(APP_PATH)

        if os.path.exists(backup_file_path):
            os.remove(backup_file_path)

        return {"status": "success", "message": "Updated CWE model successfully"}

    except Exception as e:
        if os.path.exists(backup_file_path):
            shutil.move(backup_file_path, LOCAL_FILE_PATH)
        raise HTTPException(status_code=500, detail=str(e)) from e

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        ssl_keyfile="ssl/key.pem",
        ssl_certfile="ssl/cert.pem",
        ssl_version=ssl.PROTOCOL_TLS_SERVER
    )
