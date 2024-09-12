import jwt
from rest_framework import authentication, exceptions

from user_managment.models import Token, User

from server.settings import LOCALE, SECRET_KEY

class UserAuthentication(authentication.BaseAuthentication):
    """Custom Authentication function in order to access
    restricted parts
    """

    def fetch_token_data(self, request) -> dict:
        """Fetch the jwt token and returns it as dictionnary

        Args:
            request (Request): Request sent by the client

        Returns:
            dict: JWT token decoded and cast as dictionnary
        """
        token = authentication.get_authorization_header(request).split()[1]
        return jwt.decode(token,SECRET_KEY, ['HS256'])

    def fetch_user(self, username: str) -> User:
        """Check if the user exists and returns it

        Args:
            username (str): username entered

        Raises:
            exceptions.AuthenticationFailed: If the user requested doesn't exist

        Returns:
            User: Requested user
        """
        try:
            user = User.objects.get(username=username)
            return user
        except User.DoesNotExist as exception:
            raise exceptions.AuthenticationFailed(
                LOCALE.load_localised_text("LOGIN_FAIL_USERNAME_PASSWORD_NO_MATCH")
            ) from exception

    def check_jwt_token(self, user:User, jti:str):
        """Check if the JWT Token is set in the database

        Args:
            user (User): user which wants to be authenticated
            jti (str): JWT Token ID

        Raises:
            exceptions.AuthenticationFailed: No JWT Token associated
            with the user set in the database
        """
        try:
            Token.objects.get(user=user, jti=jti)
        except Token.DoesNotExist as exception:
            raise exceptions.AuthenticationFailed(
                LOCALE.load_localised_text("LOGOUT_TOKEN_UNKNOWN")
            ) from exception

    def authenticate(self, request):
        """Authentication method_
        """
        if len(authentication.get_authorization_header(request)) == 0 :
            return None
        data = self.fetch_token_data(request)
        user = self.fetch_user(data['username'])
        self.check_jwt_token(user,data['jti'])
        return (user,None)
