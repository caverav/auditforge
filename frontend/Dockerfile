# BUILD STAGE
FROM node:20.15.0-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env .
RUN npm run build

# PRODUCTION STAGE

FROM nginx:stable-alpine
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /etc/nginx/ssl
COPY ssl/server* /etc/nginx/ssl/
COPY --from=build /app/dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
