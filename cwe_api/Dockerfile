FROM python:3.12-slim

WORKDIR /app

COPY . .
ARG CWE_MODEL_URL

RUN set -e \
    && apt-get update -y \
    && apt-get install -y --no-install-recommends \
       wget \
       unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    || { echo "Error: Fallo en la instalación de paquetes"; exit 1; }

RUN pip install --no-cache-dir torchvision==0.17.0+cpu torchaudio==2.2.0+cpu --index-url https://download.pytorch.org/whl/cpu \
    && pip install --no-cache-dir -r requirements.txt

RUN if [ ! -d modelo_cwe ]; then \
      echo "modelo_cwe not found. Downloading it..."; \
      wget --progress=bar:force "$CWE_MODEL_URL" -O modelo_cwe.zip \
      && unzip modelo_cwe.zip && rm modelo_cwe.zip \
      || { echo "Failed to download or unzip model"; exit 1; } \
    fi

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--ssl-keyfile", "ssl/key.pem", "--ssl-certfile", "ssl/cert.pem"]
