#!/usr/bin/env bash

if [[ "$POSTGRES_ENGINE" = *"postgres"* ]]
then
    echo "Waiting for the remote database to be online..."

    while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
        sleep 0.1
    done

    echo "Database started!"
fi

echo "Make migrations"
make make_migrations

make migrate

make generate_static_auto

make run