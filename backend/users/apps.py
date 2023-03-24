from django.apps import AppConfig

from server.settings import LOCALE

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = LOCALE.load_localised_text("USER_APP_NAME")
    label = LOCALE.load_localised_text("USER_APP_LABEL")
