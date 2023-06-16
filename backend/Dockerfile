FROM python:latest

WORKDIR /app

ARG DEBUG ${DEBUG}

ARG ALLOWED_HOST ${ALLOWED_HOST}

ARG SECRET_KEY ${SECRET_KEY}

ARG DB_HOST ${DB_HOST}
ARG DB_PORT ${DB_PORT}
ARG DB_ENGINE ${DB_ENGINE}
ARG DB_NAME ${DB_NAME}
ARG DB_USER ${DB_USER}
ARG DB_PASSWORD ${DB_PASSWORD}

COPY ./ /app

EXPOSE 8000

RUN apt-get update && apt-get install -y netcat-traditional

RUN make install

COPY entrypoint.sh /app

RUN chmod +x /app/entrypoint.sh

CMD [ "/app/entrypoint.sh" ]