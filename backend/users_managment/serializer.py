from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from server.settings import LOCALE

from .models import CustomUser

#pylint: disable=W0223
class TokenSerializer(TokenObtainPairSerializer):
    """Serializer class for the user token
    """
    @classmethod
    def get_token(cls, user):
        """Generate a simple JWT Token

        Args:
            user (_type_): _description_

        Returns:
            dict: JWT Token
        """
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email

        return token

class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for the user registration
    """
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    confirm_password = serializers.CharField(write_only=True,required=True)

    class Meta:
        model = CustomUser
        fields = ('users', 'password', 'confirm_password')

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError(
                LOCALE.load_localised_text("SERIALIZER_REGISTRATION_DIFFERENT_PASSWORDS")
            )

    def create(self, validated_data):
        user:CustomUser = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
