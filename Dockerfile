# syntax=docker.io/docker/dockerfile:1.7-labs
FROM node:16.5.0-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY --exclude=nginx.conf . .
RUN npm run build

FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build .
EXPOSE 3007
CMD ["nginx", "-g", "daemon off;"]
