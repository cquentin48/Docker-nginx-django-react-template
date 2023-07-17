## Install requirements from 'setup.py' python file
install:
	pip install -e .[dev]

## Activate venv shell
shell:
	pipenv shell

## Generates migrations
make_migrations:
	./manage.py makemigrations

## Migrate model data
migrate:
	./manage.py migrate

## Launch django app shell
app_shell:
	./manage.py shell

## Launch django db shell
db_shell:
	./manage.py dbshell

## Generates static files
generate_static:
	./manage.py collectstatic

## Generates static files
generate_static_auto:
	./manage.py collectstatic --noinput

## Clear static files
clear_static:
	./manage.py collectstatic --noinput --clear

## Run the server
run:
	gunicorn -b 0.0.0.0:8000 server.wsgi:application --log-level debug

## Create super user
create_super_user:
	./manage.py createsuperuser

## Check lint
lint:
	pylint --load-plugins pylint_django --django-settings-module=server.settings apps_tests data server tools user_managment

## Run test suite:
tests:
	./manage.py test

## Generate coverage data from test suite
coverage_gen:
	coverage run ./manage.py test

## Display shell coverage
coverage_shell:
	coverage report

## Display html coverage
coverage_html:
	coverage html