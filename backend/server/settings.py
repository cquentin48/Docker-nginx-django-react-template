"""
Django settings for server project.

Generated by 'django-admin startproject' using Django 4.1.3.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""
from datetime import timedelta
import os

from pathlib import Path

import mimetypes

import django
from django.utils.translation import gettext

from tools.env_vars import load_env_var_list

from tools.localisation import Localisation


django.utils.translation.ugettext = gettext

mimetypes.add_type("text/css",".css",True)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get("SECRET_KEY","my_secret_production_key")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(os.environ.get("DEBUG",1))

ALLOWED_HOSTS = load_env_var_list("ALLOWED_HOSTS",'["0.0.0.0","127.0.0.1"]')

CORS_ALLOWED_ORIGINS = load_env_var_list("CORS_ALLOWED_ORIGINS",'["http://0.0.0.0:3000"]')

CORS_ORIGIN_ALLOW_ALL = True

CSRF_TRUSTED_ORIGINS = load_env_var_list("CSRF_TRUSTED_ORIGINS",'["http://localhost"]')

# Application definition

INSTALLED_APPS = [
    'user_managment',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'data',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
    'drf_yasg',
    'graphene_django',
    'whitenoise',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware'
]

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'user_managment.authentication.UserAuthentication'
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ]
}

GRAPHENE = {
    "SCHEMA": "data.schema.schema"
}


ROOT_URLCONF = 'server.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

WSGI_APPLICATION = 'server.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'HOST':os.environ.get("POSTGRES_HOST","localhost"),
        'PORT':os.environ.get("POSTGRES_PORT","5432"),
        'NAME':os.environ.get("POSTGRES_NAME","backend_db"),
        'ENGINE':os.environ.get("POSTGRES_ENGINE","django.db.backends.postgresql"),
        'USER':os.environ.get("POSTGRES_USER","backend"),
        'PASSWORD':os.environ.get("POSTGRES_PASSWORD","Quen7tin."),
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = 'user_managment.User'

AUTHENTICATION_BACKEND = [
    'user_managment.backend.UsernameBackend',
    'django.contrib.auth.backends.ModelBackend'
]

SIMPLE_JWT = {
    'TOKEN_OBTAIN_SERIALIZER':
        "user_managment.api.authenticate.UserManagmentTokenObtainPairSerializer",
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
    'UPDATE_LAST_LOGIN': True,
}

# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

LOCALE = Localisation(LANGUAGE_CODE)

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'staticfiles/'

STATIC_ROOT = os.path.join(os.path.dirname(os.path.dirname(__file__)),STATIC_URL)

MEDIA_URL = '/media/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
