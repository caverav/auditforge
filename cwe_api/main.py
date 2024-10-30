import ssl
import hashlib
import requests
from pathlib import Path
from fastapi import FastAPI
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
BYTE_RANGE = (0, 10485759)  # 10 MB

def calculate_local_checksum(file_path, byte_limit):
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        chunk = f.read(byte_limit)
        sha256_hash.update(chunk)
    return sha256_hash.hexdigest()

def calculate_remote_checksum(url, byte_range):
    headers = {'Range': f'bytes={byte_range[0]}-{byte_range[1]}'}
    response = requests.get(url, headers=headers, stream=True)

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
    local_checksum = calculate_local_checksum(LOCAL_FILE_PATH, byte_limit=BYTE_RANGE[1] + 1)
    remote_checksum = calculate_remote_checksum(REMOTE_FILE_URL, BYTE_RANGE)

    match = local_checksum == remote_checksum
    return {"checksum_match": match}

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
