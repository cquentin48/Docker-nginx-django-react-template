from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from user_managment.models import User

# pylint: disable=abstract-method
class UserManagmentTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Serializer for the custom webapp token
    """
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
            