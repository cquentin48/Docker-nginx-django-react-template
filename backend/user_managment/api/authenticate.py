from rest_framework import status
from rest_framework.exceptions import ValidationError
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

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        username = attrs['username']
        password = attrs['password']

        self.is_input_filled(username,"LOGIN_USERNAME_EMPTY")
        self.is_input_filled(password,"LOGIN_PASSWORD_EMPTY")
        user: User = User.objects.get(username=attrs['username'])
        if user:
            if not user.check_password(password):
                raise User.DoesNotExist(
                    LOCALE.load_localised_text("LOGIN_FAIL_USERNAME_PASSWORD_NO_MATCH")
                )
            data['username'] = attrs['username']
            data['access'] = refresh.access_token
            data['refresh'] = refresh
            return data
        raise User.DoesNotExist(
            LOCALE.load_localised_text("LOGIN_FAIL_USERNAME_PASSWORD_NO_MATCH")
        )

    @classmethod
    def get_token(cls, user:User):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        # pylint: disable=trailing-comma-tuple
        token['isAdmin'] = str(user.is_admin),
        # pylint: disable=trailing-comma-tuple
        token['profilePicture'] = str(user.avatar_image),
        token['registrationDate'] = 0 if user.registration_date is None\
            else user.registration_date.timestamp()*1000,
        token['lastLoginDate'] = 0 if user.last_login is None else user.last_login.timestamp()*1000

        return token

class UserManagmentTokenObtainPairView(TokenObtainPairView):
    """Custom Token obtain pair view
    """
    serializer_class=UserManagmentTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        """HTTP Post request method
        """
        try:
            serializer = self.get_serializer(data=request.data)
            data = serializer.validate(request.data)
            Token.create_token(
                data['refresh']['user_id'],
                data['refresh']['jti'],
                data['refresh']['iat'],
                data['refresh']['exp']
            )
            user:User = User.objects.filter(username=data['username']).first()
            user.update_user_online_status(True)
            return Response(
                {
                    'access':str(data['refresh']),
                    'refresh':str(data['access'])
                },
                status=status.HTTP_200_OK
            )
        except ValidationError as exception:
            return Response({
                "message":exception.default_detail
            },status=exception.default_code)
        except User.DoesNotExist as exception:
            return Response({
                "message":str(exception)
            },status=status.HTTP_404_NOT_FOUND)
