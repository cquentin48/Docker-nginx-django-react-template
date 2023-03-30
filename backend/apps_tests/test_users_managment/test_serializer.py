from django.test import SimpleTestCase

from rest_framework import serializers

from users_managment.models import CustomUser

from users_managment.auth.serializers import RegisterSerializer

class TestTokenSerializer(SimpleTestCase):
    """User token serializer unit test
    class
    """


class TestRegisterSerializer(SimpleTestCase):
    """Register serializer unit test class
    """
    databases = '__all__'
    def test_validate_different_password_raise_exception(self):
        """When the two password entered (first and confirm) are
        differents, a ValidationError should be raised
        """
        # Given
        attributes = {
            "password":"My password",
            "confirm_password":"Another password"
        }
        serializer = RegisterSerializer()

        # Acts & Asserts
        self.assertRaises(serializers.ValidationError, serializer.validate,attributes)

    def test_create_user(self):
        """Check if the method create_user do creates a user
        and returns it
        """
        # Given
        validated_data = {
            'username' : "My username",
            'email' : "email@mail.com"
        }
        serializer = RegisterSerializer()

        # Acts
        user:CustomUser = serializer.create(validated_data=validated_data)

        # Asserts
        self.assertEqual(user.username,validated_data['username'])
        self.assertEqual(user.email,validated_data['email'])
