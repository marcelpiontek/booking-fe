# build stage
FROM node:lts-slim as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/booking-fe /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]