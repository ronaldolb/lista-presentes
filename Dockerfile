# ---------- Etapa 1: build da aplicação ----------
FROM node:20-alpine AS build
WORKDIR /app

# Copia só os manifests primeiro para aproveitar o cache do Docker.
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm test -- --ci && npm run build

# ---------- Etapa 2: servir os arquivos estáticos ----------
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
