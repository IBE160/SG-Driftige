FROM node:20-slim

# Install system libs for native bindings
RUN apt-get update && apt-get install -y \
    libc6 \
    libstdc++6 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

ENV NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

# Explicitly use Webpack for build, by removing --turbopack from the npm run build command
RUN npm run build

CMD ["npm", "run", "start"]


