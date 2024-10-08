from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir solicitudes desde cualquier origen
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Métodos HTTP permitidos
    allow_headers=["*"],  # Cabeceras permitidas
)

classifier = pipeline(task='text-classification', model="modelo_cwe/checkpoint-20790")

class VulnerabilityRequest(BaseModel):
    vuln: str

@app.post("/classify")
async def classify_vulnerability(vuln_request: VulnerabilityRequest):
    vuln = vuln_request.vuln
    result = classifier(vuln)
    return {"result": result}

@app.get("/")
async def read_root():
    example_vuln = (
        "Los dispositivos de CPU Siemens SIMATIC S7-300 permiten a los atacantes remotos causar una denegación de servicio "
        "(transición de modo de defecto) a través de paquetes elaborados en (1) puerto TCP 102 o (2) Profibus."
    )
    result = classifier(example_vuln)
    return {"example_vuln": example_vuln, "result": result}
