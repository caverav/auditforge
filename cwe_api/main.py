import ssl
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from inferencer import inferencer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir solicitudes desde cualquier origen
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Métodos HTTP permitidos
    allow_headers=["*"],  # Cabeceras permitidas
)

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
