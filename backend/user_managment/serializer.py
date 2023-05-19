from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied

from server.settings import LOCALE


User = get_user_model() # To check later for custom auth : https://stackoverflow.com/questions/28613102/last-login-field-is-not-updated-when-authenticating-using-tokenauthentication-in

class RegisterSerializer(serializers.ModelSerializer):
    """Serializer class for registration
    """

    email = serializers.EmailField(
        required = True,
        label = LOCALE.load_localised_text("USER_OBJECT_EMAIL")
    )
    username = serializers.CharField(
        required = True,
        label = LOCALE.load_localised_text("USER_OBJECT_USERNAME")
    )
    password = serializers.CharField(
        write_only = True,
        required=True,
        label = LOCALE.load_localised_text("USER_OBJECT_PASSWORD")
    )

    class Meta:
        """Meta class for the registration act
        """
        model = User
        fields = ('id','username','password','email')
        extra_kwargs = {
            'password':{'write_only':True}
        }

    def string_validation(self, input_value:str, label_error:str) -> str:
        """Check a string input validation

        Args:
            input_value (str): input entered by the user
            label_error (str): key label error in the locale file

        Raises:
            serializers.ValidationError: The value is empty
        """
        if not input_value:
            raise serializers.ValidationError(
                LOCALE.load_localised_text(label_error)
            )

    def check_if_email_is_already_taken(self, email:str):
        """Check if an email is already used or not in a user account

        Args:
            email (str): email entered

        Raises:
            User.AlreadyExist: If the email is already taken
        """
        user = User.objects.filter(email=email)
        try:
            if len(user) != 0:
                raise User.AlreadyExist(
                    LOCALE.load_localised_text("USER_REGISTER_EMAIL_ALREADY_TAKEN")
                )
        except User.DoesNotExist:
            pass

    def check_if_user_already_exist(self, username):
        """Check if a user is already using or not the username entered

        Args:
            username (str): username entered

        Raises:
            User.AlreadyExist: If the username is already taken
        """
        user = User.objects.filter(username=username)
        try:
            if len(user) != 0:
                raise User.AlreadyExist(
                    LOCALE.load_localised_text("USER_REGISTER_USERNAME_ALREADY_TAKEN")
                )
        except User.DoesNotExist:
            pass

    def validate(self, attrs):
        """Check if the input are ok
        and the registration won't create conflicts

        Args:
            attrs (['str',Any]): input attributes to validate

        Raises:
            User.AlreadyExist: If the username or email is already taken
            User.AlreadyExist: If the username is already taken

        Returns:
            data (['str',Any]): data to validate
        """
        username = attrs['username']
        email = attrs['email']
        password = attrs['password']
        self.string_validation(username,"USER_REGISTER_USERNAME_IS_EMPTY")
        self.string_validation(email,"USER_REGISTER_EMAIL_IS_EMPTY")
        self.string_validation(password,"USER_REGISTER_PASSWORD_IS_EMPTY")
        self.check_if_user_already_exist(username)

        return attrs

    def create(self, validated_data):
        """Creates a user in the database

        Args:
            validated_data (_type_): _description_

        Returns:
            _type_: _description_
        """
        self.check_if_user_already_exist(validated_data["username"])
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.is_active = True
        user.set_password(validated_data['password'])
        user.save()
        return user

class ProfileSerializer(serializers.ModelSerializer):
    @classmethod
    def get(self,username: str,user:User):
        if username != user.username:
                raise PermissionDenied(
                    LOCALE.load_localised_text("USER_REGISTER_EMAIL_ALREADY_TAKEN")
                )
        else:
            return user

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
