FROM node:13-alpine as build

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM nginx:1.19.4-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]