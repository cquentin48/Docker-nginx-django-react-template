from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import AbstractUser

from server.settings import LOCALE

# Create your models here.
class CustomUser(AbstractUser):
    """
    Custom User model Class
    """

    id = models.IntegerField(primary_key=True)

    username = \
        models.TextField(
            verbose_name=LOCALE.load_localised_text("USER_OBJECT_USERNAME"),
            unique=True
        )
    email = \
        models.EmailField(
            verbose_name=LOCALE.load_localised_text("USER_OBJECT_EMAIL"),
            unique=True
        )

    is_activated = \
        models.BooleanField(
            verbose_name=LOCALE.load_localised_text("USER_OBJECT_IS_ACCOUNT_ACTIVATED"),
            default=False
        )
    is_staff = \
        models.BooleanField(
            verbose_name=LOCALE.load_localised_text("USER_OBJECT_IS_ACCOUNT_STAFF"),
            default=False
        )

    date_joined = \
        models.DateField(
            verbose_name=LOCALE.load_localised_text("USER_OBJECT_DATE_JOINED"),
            default=now
        )
    last_log_in = \
        models.DateField(
            verbose_name=LOCALE.load_localised_text("USER_OBJECT_LAST_LOG_IN"),
            default=now
        )

    is_logged_in = \
        models.BooleanField(
            verbose_name=LOCALE.load_localised_text('USER_OBJECT_IS_LOGGED_IN'),
            default=False
        )

    def __str__(self) -> str:
        return str(self.id)+"-"+self.username+"-"+self.email
