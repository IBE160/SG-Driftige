FROM python:3.9-slim-bullseye

WORKDIR /app

# Install system dependencies for Prisma and pdfminer.six
RUN apt-get update && apt-get install -y --no-install-recommends \
    libatomic1 \
    libstdc++6 \
    libgcc1 \
    openssl \
    build-essential \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy Prisma schema
COPY prisma ./prisma

# Run Python Prisma generate
RUN python -m prisma generate

# Copy the rest of the application code
COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]