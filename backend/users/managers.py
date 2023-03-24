from django.contrib.auth.models import BaseUserManager

from server.settings import LOCALE

class UserManager(BaseUserManager):

    def is_value_set(self,value_entered: str,res_error_tag_name: str):
        """Check if the value entered by the user has been set.
        If not, a TypeError will be raised

        Args:
            value_entered (str): Value entered by the user
            res_error_tag_name (str): Name of the resource tag
            set in the res folder

        Raises:
            TypeError: If the value hasn't been set
        """
        if not value_entered:
            raise TypeError(LOCALE.load_localised_text(res_error_tag_name))

    def create_user(self,username:str,email:str,password: str, **_):
        """Create a normal user based on the informations sent by the user

        Args:
            username (str): New account username
            email (str): New account email
            password (str): New account password

        Returns:
            CustomUser: _description_
        """
        self.is_value_set(username,"USER_REGISTER_USERNAME_IS_EMPTY")
        self.is_value_set(email,"USER_REGISTER_EMAIL_IS_EMPTY")
        self.is_value_set(password,"USER_REGISTER_PASSWORD_IS_EMPTY")

        email = self.normalize_email(email)
        user = self.model(username=username,email=email)
        user.set_password(password)

        return user

