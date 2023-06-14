FROM node:16 AS builder

WORKDIR /app

COPY frontend/package.json ./

RUN npm install

COPY frontend/ ./

RUN npm run build

FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

RUN mkdir -p /usr/share/nginx/html/static/locale

RUN apt update -y

RUN apt install npm -y

COPY --from=builder /app/ /home/webApp

COPY --from=builder /app/src/main/res/locale /usr/share/nginx/html/static/locale

EXPOSE 80

WORKDIR /home/webApp

ENV CI=1

CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]