# Build
FROM node:18 AS build

WORKDIR /apps/websash

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Serve
FROM nginx:alpine

COPY --from=build /apps/websash/build /usr/share/nginx/html

EXPOSE 80