#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for the remote database to be online..."

    while ! nc -z $DB_HOST $DB_PORT; do
        sleep 0.1
    done

    echo "Database started!"
fi

make make_migrations

make migrate

make generate_static_auto

make run