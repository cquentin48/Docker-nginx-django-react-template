from rest_framework import serializers
from user_managment.models import User

class UserSerializer(serializers.ModelSerializer):
    """Serializer class for the user response
    """
    class Meta:
        """Meta subclass
        """
        model = User
        fields = ['username','email']

class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer class for the profile view
    """
    class Meta:
        """Meta subclass
        """
        model = User
        fields = [
            'username',
            'email',
            'registration_date',
            'last_login',
            'is_currently_logged_in'
        ]

class UserStaffProfileSerializer(serializers.ModelSerializer):
    """Serializer class for the profile view
    """
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'is_active',
            'staff',
            'admin',
            'registration_date',
            'last_login',
            'is_currently_logged_in'
        ]

#pylint: disable=abstract-method
class UserManagmentTokenObtainPairSerializer(serializers.Serializer):
    """Serializer class for login

    Args:
        serializers (_type_): _description_
    """
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
