from django.test import TestCase
from django.urls import reverse

from freezegun import freeze_time

import jwt

from rest_framework.exceptions import ValidationError
from rest_framework.test import APIClient

from user_managment.api.authenticate import UserManagmentTokenObtainPairSerializer
from user_managment.models import Token, User
from user_managment.api.register import RegisterSerializer
from server.settings import SECRET_KEY

class UserManagmentTokenObtainPairSerializerTestCase(TestCase):
    """
    Test class for the token serializer
    """
    def test_is_input_filled_success(self):
        """
        Test method for the method `fetch_user`.
        Nothing should happen
        """
        # Given
        value = "value"
        error_label = "USER_REGISTER_USERNAME_ALREADY_TAKEN"
        test_object = UserManagmentTokenObtainPairSerializer()

        # Acts & Asserts
        try:
            test_object.is_input_filled(value,error_label)
        except ValidationError as _:
            self.fail("Unexpected ValidationError raised:")

    def test_is_input_filled_fail(self):
        """
        Test method for the method `fetch_user`.
        ValidationException should be raised
        """
        # Given
        value = ""
        error_label = "USER_REGISTER_USERNAME_ALREADY_TAKEN"
        test_object = UserManagmentTokenObtainPairSerializer()

        # Acts & Asserts
        self.assertRaises(ValidationError, test_object.is_input_filled, value, error_label)

    def test_validate_user_fails(self):
        """
        Test method for the method `validate_user`.
        `ValidationException` should be raised
        """
        # Given
        username = "username"
        password = "password"
        email = "email@mail.com"

        register_serializer = RegisterSerializer()
        test_object = UserManagmentTokenObtainPairSerializer()

        # Before Acts
        user = register_serializer.create({
            'username':username,
            'password':password,
            'email':email
        })

        # Acts
        self.assertRaises(User.DoesNotExist,
                          test_object.validate_user,
                          user,
                          username,
                          "",
                          None)

    def test_validate_user_success(self):
        """
        Test method for the method `validate_user`.
        Expected output : data
        """
        # Given
        username = "username"
        password = "password"
        email = "email@mail.com"

        register_serializer = RegisterSerializer()
        test_object = UserManagmentTokenObtainPairSerializer()

        # Before Acts
        user = register_serializer.create({
            'username':username,
            'password':password,
            'email':email
        })
        access_token = UserManagmentTokenObtainPairSerializer.get_token(user)

        # Acts
        try:
            test_object.validate_user(user,username,password,access_token)
        except User.DoesNotExist:
            self.fail("Unexpected User.DoesNotExist exception raised!")

    def test_validate_fails(self):
        """
        Test method for the method `validate`.
        `ValidationException` should be raised
        """
        # Given
        attrs = {
            'username':'username2',
            'password':"password"
        }

        test_object = UserManagmentTokenObtainPairSerializer()

        # Acts
        self.assertRaises(User.DoesNotExist,
                          test_object.validate,
                          attrs)

    def test_validate_success(self):
        """
        Test method for the method `validate_user`.
        Expected output : data
        """
        # Given
        username = "username"
        password = "password"
        email = "email@mail.com"

        register_serializer = RegisterSerializer()
        test_object = UserManagmentTokenObtainPairSerializer()

        attrs = {
            'username':username,
            'password':password
        }

        # Before Acts
        register_serializer.create({
            'username':username,
            'password':password,
            'email':email
        })

        # Acts
        try:
            test_object.validate(attrs)
        except User.DoesNotExist:
            self.fail("Unexpected User.DoesNotExist exception raised!")

class UserManagmentTokenObtainPairViewTestCase(TestCase):
    """
    Test case for the `POST` request of authentication
    """

    def setUp(self) -> None:
        """
        Set up the factory for
        the reverse method
        """
        self.factory:APIClient = APIClient()
        return super().setUp()

    @freeze_time("1971-01-01 00:00:00")
    def test_post_request_success(self):
        """
        Unit test method for the `POST` request
        Expected outcome : 200 success with access tokens
        """

        # Given
        username = "username"
        password = "password"
        email = "email@mail.com"
        url = reverse("authentication")

        register_serializer = RegisterSerializer()

        # Before Acts
        register_serializer.create({
            'username':username,
            'password':password,
            'email':email
        })

        # Acts
        response = self.factory.post(
            url,
            {
                'username':username,
                'password':password
            },
            format="json"
        )
        user = User.objects.filter(username=username).first()
        token:Token = Token.objects.get(user=user)

        # After Acts
        data = jwt.decode(response.json()['access'], SECRET_KEY)

        # Asserts
        self.assertEqual(response.status_code,200)
        self.assertEqual(data['jti'],token.jti)
        self.assertEqual(data['exp'],token.expires_at.timestamp())
        self.assertEqual(data['user_id'],token.user.id)
        self.assertEqual(data['username'],username)
        self.assertEqual(data['email'],user.email)
        self.assertEqual(data['isAdmin'], str(user.is_admin))
        self.assertEqual(data['profilePicture'], str(user.avatar_image))
        self.assertEqual(data['registrationDate'], user.registration_date.timestamp())
        self.assertEqual(data['lastLoginDate'], user.last_login.timestamp())

    def test_post_request_fails_no_input(self):
        """
        Unit test method for the `POST` request with
        the username input not filled
        Expected outcome : 401 error
        """

        # Given
        username = ""
        password = "password"
        email = "email@mail.com"
        url = reverse("authentication")

        register_serializer = RegisterSerializer()

        # Before Acts
        register_serializer.create({
            'username':username,
            'password':password,
            'email':email
        })

        # Acts
        response = self.factory.post(
            url,
            {
                'username':username,
                'password':password
            },
            format="json"
        )

        # After Acts
        json_body = response.json()

        # Asserts
        self.assertEqual(response.status_code,400)
        self.assertEqual(json_body, {'message': 'Invalid input.'})

    def test_post_request_fails_no_user(self):
        """
        Unit test method for the `POST` request with
        no user set before
        Expected outcome : 401 error
        """

        # Given
        username = "username"
        password = "password"
        url = reverse("authentication")

        # Acts
        response = self.factory.post(
            url,
            {
                'username':username,
                'password':password
            },
            format="json"
        )

        # After Acts
        json_body = response.json()

        # Asserts
        self.assertEqual(response.status_code,404)
        self.assertEqual(json_body,
                         {
                            'message': 'The user and password don\'t match!'}
                        )
