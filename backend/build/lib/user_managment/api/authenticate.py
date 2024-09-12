from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.response import Response

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from server.settings import LOCALE

from user_managment.models import User, Token

# pylint: disable=abstract-method
class UserManagmentTokenObtainPairSerializer(TokenObtainPairSerializer):

    """Serializer class for both login validation and token generation
    """
    def is_input_filled(self, value:str, error_label:str):
        """Check if the input value is filled

        Args:
            value (str): checked input value
            error_label (str): displayed error label

        Raises:
            ValidationError: When the input is not filled
        """
        if not value:
            raise ValidationError(LOCALE.load_localised_text(error_label))

    def validate_user(self,
                      user: User,
                      username:str,
                      password:str,
                      refresh) -> dict[str]:
        """Check if the user exists and return the corresponding data
        as a dict

        Args:
            user (User): fetched user
            username (str): username entered
            password (str): password entered
            data (dict[str]): request input data
            refresh (_type_): refresh access token

        Raises:
            User.DoesNotExist: If the password entered doesn't correspond
            to the one in the database

        Returns:
            dict[str]: request output data
        """
        data = {}
        if not user.check_password(password):
            raise User.DoesNotExist(
                LOCALE.load_localised_text("LOGIN_FAIL_USERNAME_PASSWORD_NO_MATCH")
            )
        data['username'] = username
        data['access'] = refresh.access_token
        data['refresh'] = refresh
        return data

    def validate(self, attrs):
        try:
            data = super().validate(attrs)
            username = attrs['username']
            password = attrs['password']

            self.is_input_filled(username,"LOGIN_USERNAME_EMPTY")
            self.is_input_filled(password,"LOGIN_PASSWORD_EMPTY")
            user = User.objects.filter(username=attrs['username'])
            refresh = self.get_token(user.first())
            return self.validate_user(user.first(),username,password,refresh)
        except AuthenticationFailed as exception:
            raise User.DoesNotExist(
                LOCALE.load_localised_text("LOGIN_FAIL_USERNAME_PASSWORD_NO_MATCH")
            ) from exception


    @classmethod
    def get_token(cls, user:User):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        token['isAdmin'] = str(user.is_admin)
        token['profilePicture'] = str(user.avatar_image)
        token['registrationDate'] = 0 if user.registration_date is None\
            else user.registration_date.timestamp()*1000
        token['lastLoginDate'] = 0 if user.last_login is None else user.last_login.timestamp()*1000

        return token

class UserManagmentTokenObtainPairView(TokenObtainPairView):
    """Custom Token obtain pair view
    """
    serializer_class=UserManagmentTokenObtainPairSerializer

    @swagger_auto_schema(operation_description="User authentication")
    def post(self, request, *args, **kwargs):
        """HTTP Post request method
        """
        try:
            serializer = self.get_serializer(data=request.data)
            data = serializer.validate(request.data)
            Token.create_token(
                data['access']['user_id'],
                data['access']['jti'],
                data['access']['iat'],
                data['access']['exp']
            )
            user:User = User.objects.filter(username=data['username']).first()
            user.update_user_online_status(True)
            return Response(
                {
                    'access':str(data['access']),
                    'refresh':str(data['refresh'])
                },
                status=status.HTTP_200_OK
            )
        except ValidationError as exception:
            return Response({
                "message":exception.default_detail
            },status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist as exception:
            return Response({
                "message":str(exception)
            },status=status.HTTP_404_NOT_FOUND)
