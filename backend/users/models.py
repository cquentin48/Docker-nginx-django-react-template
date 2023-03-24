from django.db import models
from django.contrib.auth.models import AbstractUser

from server.settings import LOCALE

from .managers import UserManager

# Create your models here.
class CustomUser(AbstractUser):
    id = models.IntegerField(primary_key=True)

    username = models.TextField(LOCALE.load_localised_text("USER_OBJECT_USERNAME"))
    email = models.EmailField(LOCALE.load_localised_text("USER_OBJECT_EMAIL"))

    is_activated = models.BooleanField(LOCALE.load_localised_text("USER_OBJECT_IS_ACCOUNT_ACTIVATED"))
    is_staff = models.BooleanField(LOCALE.load_localised_text("USER_OBJECT_IS_ACCOUNT_STAFF"))
    
    date_joined = models.DateField(LOCALE.load_localised_text("USER_OBJECT_DATE_JOINED"))
    last_log_in = models.DateField(LOCALE.load_localised_text("USER_OBJECT_LAST_LOG_IN"))

    objects = UserManager()

    def __str__(self) -> str:
        return str(self.id)+"-"+self.username+"-"+self.email
