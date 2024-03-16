FROM node:16.5.0-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3007
CMD ["nginx", "-g", "daemon off;"]
