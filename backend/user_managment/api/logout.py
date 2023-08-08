import jwt

from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, serializers, status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response


from server.settings import LOCALE, SECRET_KEY

from ..models import Token, User

class LogoutSerializer(serializers.ModelSerializer):
    """Serializer input for the logout api requestn_
    """
    class Meta:
        model = User
        fields = ()

    def fetch_token_data(self, token: str) -> dict:
        """Fetch the jwt token and returns it as dictionnary

        Args:
            request (Request): Request sent by the client

        Returns:
            dict: JWT token decoded and cast as dictionnary
        """
        return jwt.decode(token,SECRET_KEY, ['HS256'])

    def fetch_user(self, username:str, raise_exception: bool) -> User:
        """Fetch the current logged in user

        Args:
            `username` (`str`): username of the user
            `raise_exception` (`bool`): If an exception should be thrown when an error is

        Raises:
            ValidationError: No user found in the database

        Returns:
            User: Current logged in user
        """
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist as exception:
            if raise_exception:
                raise ValidationError(
                    LOCALE.load_localised_text("LOGIN_FAIL_USERNAME_PASSWORD_NO_MATCH")
                )\
                    from exception
            return None

    def fetch_token(self, user:User, jti: str, raise_exception: bool) -> Token:
        """Fetch the token stored in the database

        Args:
            `user` (`User`): current logged in user
            `jti` (`str`): id of the jwt token
            `raise_exception` (`bool`): If an exception should be thrown when an error is
            occuring

        Raises:
            `ValidationError`: No jwt token found

        Returns:
            `Token`: Current session JWT Token
        """
        try:
            return Token.objects.get(user=user, jti=jti)
        except Token.DoesNotExist as exception:
            if raise_exception:
                raise ValidationError(
                    LOCALE.load_localised_text("LOGOUT_TOKEN_UNKNOWN")
                ) from exception
            return None

    def is_valid(self, *, raise_exception=False):
        token_dict = self.fetch_token_data(self.instance['token'])
        user: User = self.instance['user']
        token:Token = self.fetch_token(user,token_dict['jti'], raise_exception)
        return {
            'token':token,
            'user':user
        }

class Logout(generics.GenericAPIView):
    """Logout API view
    """
    serializer_class = LogoutSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(operation_description="End of user session")
    def post(self, request:Request , *_ , **kwargs):
        """Logout method with the post verb

        Args:
            `request` (`Request`): Logout request sent by the client

        Returns:
            - `200` : Successful logout
            - `401` : User not logged in
        """
        serializer = self.get_serializer({
            'token': request.headers['Authorization'].replace("Bearer ",""),
            'user': request.user
        }
        )
        data = serializer.is_valid()
        data['token'].delete()
        data['user'].update_user_online_status(False)
        return Response({
            "message":LOCALE.load_localised_text("LOGOUT_OUT_SUCCESS")
        },status=status.HTTP_200_OK)
