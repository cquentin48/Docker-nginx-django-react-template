from django.apps import AppConfig

from server.settings import LOCALE

class UsersConfig(AppConfig):
    """User config class
    for the administration view
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users_managment'
    verbose_name = LOCALE.load_localised_text("USER_APP_LABEL")
