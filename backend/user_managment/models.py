import datetime
import django

from django.db import models
from django.contrib.auth.models import(
    AbstractBaseUser
)

from rest_framework import status
from rest_framework.exceptions import APIException

from server.settings import LOCALE
from .manager import UserManager

# Create your models here.
class User(AbstractBaseUser):
    """Custom User model
    """
    objects = UserManager()

    email = models.EmailField(
        verbose_name=LOCALE.load_localised_text("USER_OBJECT_EMAIL"),
        max_length=255,
        unique=True
    )

    username = models.TextField(
        verbose_name=LOCALE.load_localised_text("USER_OBJECT_USERNAME"),
        unique=True
    )

    avatar_image = models.FileField(
        verbose_name=LOCALE.load_localised_text("USER_OBJECT_AVATAR_IMAGE"),
        upload_to='user',
        null=True,
        blank=True
    )

    is_active = models.BooleanField(default=True)
    is_currently_logged_in = models.BooleanField(
        default=False,
        verbose_name=LOCALE.load_localised_text("USER_OBJECT_IS_CURRENTLY_LOGGED_IN")
    )
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)

    registration_date = models.DateTimeField(
        verbose_name=LOCALE.load_localised_text("USER_OBJECT_REGISTRATION_DATE"),
        default=django.utils.timezone.now
    )

    USERNAME_FIELD = "username"

    REQUIRED_FIELDS = ['email']

    @staticmethod
    def create_superuser(username:str, password:str, email:str):
        """Creates a superuser

        Args:
            - `username` (`str`): username entered
            - `password` (`str`): password entered
            - `email` (`str`): email entered
        
        Returns:
            `User`: Admin user
        """
        user:User = User.objects.create(username=username,
            email=email,
            password=password,
            admin=True,
            staff=True,
            is_active=True
        )
        user.save()

        return user

    def get_full_name(self) -> str:
        """Get user name

        Returns:
            str: user name
        """
        return str(self)

    def get_short_name(self) -> str:
        """Get user name

        Returns:
            str: user name
        """
        return str(self)

    def __str__(self) -> str:
        return self.username

    def has_perm(self, perm: str, _=None) -> bool:
        """Check if the user can access a part of an app or not

        Args:
            perm (str): part of the app requested

        Returns:
            bool: True yes | False no
        """
        if self.is_admin:
            return True
        if 'view_' in perm or 'auth' in perm :
            return False
        return True

    def has_module_perms(self, app_label: str) -> bool:
        """Check if user can access the app

        Args:
            app_label (str): label of the app

        Returns:
            bool: True yes | False no
        """
        if app_label == "auth" and self.is_admin is False:
            return False
        return True

    @property
    def is_staff(self) -> bool:
        """Check if user is staff employee or not

        Returns:
            bool: True yes | False no
        """
        return self.staff

    @property
    def is_user_active(self) -> bool:
        """Check if user is an active account or not

        Returns:
            bool: True yes | False no
        """
        return self.is_active

    def update_user_online_status(self, new_status: bool):
        """Update user status to be online or offline

        Args:
            new_status (bool): `True` online | `False` offline
        """
        self.is_currently_logged_in = new_status

    @property
    def is_admin(self) -> bool:
        """Check if user is admin or not

        Returns:
            bool: True yes | False no
        """
        return self.admin

    class AlreadyExist(APIException):
        """Exception when either a
        field or a user is already taken
        """
        status_code = status.HTTP_409_CONFLICT
        default_detail = LOCALE.load_localised_text("USER_REGISTER_USERNAME_ALREADY_TAKEN")
        default_code = "USER_REGISTER_USERNAME_ALREADY_TAKEN"

class Token(models.Model):
    """JWT Token connection stored in the server backend side
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    jti = models.CharField(max_length=32)
    issued_at = models.DateField()
    expires_at = models.DateField()

    is_valid = models.BooleanField()

    @staticmethod
    def create_token(user_id:str, jti:str, issued_at:int, expires_at:int):
        """Creates and store a token access inside the backend server side database

        Args:
            user_id (str): id of the currently login user
            jti (str): id of the jwt token
            issued_at (int): long format for the issued time token
            expires_at (int): long format for the expires time token

        Returns:
            Token: Newly created token
        """
        user = User.objects.filter(id=user_id).first()
        token:Token = Token.objects.create(
            user = user,
            jti = jti,
            issued_at = datetime.datetime.fromtimestamp(issued_at),
            expires_at = datetime.datetime.fromtimestamp(expires_at),
            is_valid = True
        )

        return token

    def __str__(self) -> str:
        return str(self.user)+":"+str(self.jti)+":"+str(self.issued_at)+"-"+str(self.expires_at)
