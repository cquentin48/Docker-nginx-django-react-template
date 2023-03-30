from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models import CharField, EmailField, BooleanField

from server.settings import LOCALE

class UserManager(BaseUserManager):
    def check_input(self, value_entered, error_label:str):
        """Check if the input entered is filled.
        Otherwise a TypeError is Raised

        Args:
            value_entered (_type_): input value entered or not
            by the user
            error_label (str): label for the error message in the yaml
            res file

        Raises:
            TypeError: When the input is not filled
        """
        if value_entered is None:
            raise TypeError(
                LOCALE.load_localised_text(error_label)
            )

    def create_user(self, username, email, password=None, **_):
        """Creates and return a newly created user account

        Args:
            username (_type_): New account username
            email (_type_): New account email
            password (_type_, optional): New account password
        """
        self.check_input(username,"USER_REGISTER_USERNAME_IS_EMPTY")
        self.check_input(email,"USER_REGISTER_EMAIL_IS_EMPTY")
        self.check_input(password,"USER_REGISTER_PASSWORD_IS_EMPTY")

        user:AbstractBaseUser = self.model(
            username=username,
            email=email)
        user.password = password
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password=None, **_):
        """Create a super-user for the administrations parts

        Args:
            username (_type_): _description_
            email (_type_): _description_
            password (_type_, optional): _description_. Defaults to None.
        """
        user = self.create_user(
            username=username,
            email=email,
            password=password,
            _=_)
        user.is_superuser = True
        user.is_staff = True

        user.save(using=self._db)

        return user

class User(AbstractBaseUser, PermissionsMixin):
    username = CharField(
        db_index=True,
        max_length=255,
        unique=True,
        verbose_name=LOCALE.load_localised_text("USER_OBJECT_USERNAME")
    )
    email = EmailField(
        db_index=True,
        unique=True,
        null=True,
        blank=True,
        verbose_name=LOCALE.load_localised_text("USER_OBJECT_EMAIL")
    )
    is_active = BooleanField(
        default=True,
        verbose_name=LOCALE.load_localised_text("USER_OBJECT_IS_ACCOUNT_ACTIVATED")
    )
    is_staff = BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self) -> str:
        return self.email
