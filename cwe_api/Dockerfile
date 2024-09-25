FROM python:slim

WORKDIR /app

COPY . .

RUN  apt-get update \
      && apt-get install -y --no-install-recommends \
        wget=1.21.* \
        unzip=6.0-* \
      && apt-get clean \
      && rm -rf /var/lib/apt/lists/*

RUN if [ ! -d modelo_cwe ]; then \
      echo "modelo_cwe not found. Downloading it..."; \
      wget "https://drive.usercontent.google.com/download?id=1KBoB-iLT3-2HJqMvXucMuh3Wi_r0ngP-&export=download&confirm=" -O modelo_cwe.zip \
      && unzip modelo_cwe.zip && rm modelo_cwe.zip \
      || { echo "Failed to download or unzip model"; exit 1; } \
    fi

RUN pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
