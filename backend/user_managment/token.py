from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from user_managment.models import User

class UserManagmentTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user:User):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        token['isAdmin'] = str(user.is_admin),
        token['profilePicture'] = str(user.avatar_image),
        token['registrationDate'] = 0 if user.registration_date is None else user.registration_date.timestamp(),
        token['lastLoginDate'] = 0 if user.last_login is None else user.last_login.timestamp()

        return token
    
class UserManagmentTokenObtainPairView(TokenObtainPairView):
    serializer_class=UserManagmentTokenObtainPairSerializer