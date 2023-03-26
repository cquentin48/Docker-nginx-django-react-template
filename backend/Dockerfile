FROM python:latest

WORKDIR /app

COPY ./ /app

RUN make install

RUN make make_migrations

RUN make migrate

RUN make generate_static_auto

RUN cp -a /app/staticfiles /

EXPOSE 8000

CMD [ "make", "run" ]