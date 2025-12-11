FROM node:20

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

# Use npm ci for clean and consistent installs in build environments
RUN npm ci

COPY . .

ENV NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

RUN npm run build

CMD ["npm", "run", "start"]
