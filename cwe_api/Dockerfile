FROM python:slim

WORKDIR /app

COPY . .

RUN apt-get update -y \
    && apt-get install -y --no-install-recommends \
       wget=1.21.3-1+deb11u1 \
       unzip=6.0-26+deb11u1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    || (echo "Failed to install packages" && exit 1)

RUN pip install --no-cache-dir torchvision==0.15.2 torchaudio==2.0.2 --index-url https://download.pytorch.org/whl/cpu \
    && pip install --no-cache-dir -r requirements.txt

RUN if [ ! -d modelo_cwe ]; then \
      echo "modelo_cwe not found. Downloading it..."; \
      wget --progress=bar:force "https://drive.usercontent.google.com/download?id=1OtRNObv-Il2B5nDnpzMSGj_yBJAlskuS&export=download&confirm=" -O modelo_cwe.zip \
      && unzip modelo_cwe.zip && rm modelo_cwe.zip \
      || { echo "Failed to download or unzip model"; exit 1; } \
    fi

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
