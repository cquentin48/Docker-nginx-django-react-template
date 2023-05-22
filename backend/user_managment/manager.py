from django.contrib.auth import get_user_model
from django.contrib.auth.models import(
    BaseUserManager
)

from server.settings import LOCALE

class UserManager(BaseUserManager):
    """User manager class
    """
    def validate_input(self, input_value, locale_key_error):
        """Validate the input passed in the method.
        If the input is null or empty, a ValueError is et

        Args:
            input_value (_type_): value input entered
            locale_key_error (_type_): label key error in the 
            yaml locale file

        Raises:
            ValueError: When the value is None or empty
        """
        if not input_value:
            message = LOCALE.load_localised_text(locale_key_error)
            raise ValueError(message)

    def create_user(self, username: str, email: str, password: str=None):
        """
        Create a regular user for the database

        Args:
            username (str): username entered by the user
            email (str): email entered by the user
            password (str, optional): Password entered by the user. Defaults to None.
        
        Raises:
            ValueError: Either the username or the email is empty

        Returns:
            User: Created regular user
        """
        self.validate_input(username,"USER_REGISTER_USERNAME_IS_EMPTY")
        self.validate_input(email,"USER_REGISTER_EMAIL_IS_EMPTY")
        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username: str, email: str, password: str):
        """Create a superuser for usages inside the admin
        panel

        Args:
            username (str): username entered by the user
            email (str): email entered by the user
            password (str, optional): Password entered by the user. Defaults to None.

        Returns:
            User: Created superuser
        """
        user = self.create_user(
            username=username,
            email=email,
            password=password,
        )
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user
