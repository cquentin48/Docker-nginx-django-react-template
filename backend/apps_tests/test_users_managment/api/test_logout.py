import datetime
from django.test import TestCase
from django.urls import reverse

from rest_framework.exceptions import ValidationError
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from user_managment.api.authenticate import UserManagmentTokenObtainPairSerializer
from user_managment.api.register import RegisterSerializer
from user_managment.api.logout import LogoutSerializer
from user_managment.models import Token, User

class LogoutSerializerTestCase(TestCase):
    """Unit test class for the logout serializer
    """

    def test_fetch_token_data(self):
        """
        Test method for the method `fetch_token_data`
        """
        # Given
        username = "username"
        password = "password"
        email = "email@mail.com"

        test_serializer = LogoutSerializer()
        register_serializer = RegisterSerializer()

        # Acts
        user: User = register_serializer.create({
            'username':username,
            'password':password,
            'email':email
        })
        token:RefreshToken = UserManagmentTokenObtainPairSerializer.get_token(user)
        access_token = str(token.access_token).encode('utf-8')
        operation_result = test_serializer.fetch_token_data(access_token)

        # Asserts
        self.assertEqual(operation_result['user_id'], 1)

    def test_fetch_user_success(self):
        """
        Test method for the method `fetch_user`.
        Correct result is expected
        """
        # Given
        username = "username"
        password = "password"
        email = "email@mail.com"
        raise_exception = True

        test_serializer = LogoutSerializer()
        register_serializer = RegisterSerializer()

        # Acts
        register_serializer.create({
            'username':username,
            'password':password,
            'email':email
        })
        user:User = test_serializer.fetch_user(username,raise_exception)

        # Asserts
        self.assertEqual(user.username, username)

    def test_fetch_user_fails_exception(self):
        """
        Test method for the method `fetch_user`.
        ValidationException should be raised
        """
        # Given
        username = "username"
        raise_exception = True
        test_serializer = LogoutSerializer()

        # Acts & Asserts
        self.assertRaises(ValidationError, test_serializer.fetch_user,username,raise_exception)

    def test_fetch_user_fails_no_exception(self):
        """
        Test method for the method `fetch_user`.
        None return object is expected
        """
        # Given
        username = "username"
        raise_exception = False
        test_serializer = LogoutSerializer()

        # Acts
        result = test_serializer.fetch_user(username,raise_exception)

        # Asserts
        self.assertEqual(result, None)

    def test_fetch_token_success(self):
        """
        Test method for the method `fetch_token`.
        Correct result is expected
        """
        # Given
        username = "username"
        password = "password"
        email = "email@mail.com"
        raise_exception = True

        test_serializer = LogoutSerializer()
        register_serializer = RegisterSerializer()

        # Acts
        user = register_serializer.create({
            'username':username,
            'password':password,
            'email':email
        })
        user.save()
        token_object:Token = Token.create_token(
            user.id,
            "1",
            1,
            1
        )
        token_object.save()
        operation_result: Token = test_serializer.fetch_token(
            user,
            token_object.jti,
            raise_exception
        )

        # Asserts
        self.assertEqual(operation_result.user, user)
        self.assertEqual(operation_result.jti, "1")
        self.assertEqual(operation_result.is_valid, True)
        self.assertEqual(operation_result.issued_at,datetime.date(1970,1,1))
        self.assertEqual(operation_result.expires_at,datetime.date(1970,1,1))

    def test_fetch_token_fails_exception(self):
        """
        Test method for the method `fetch_token` with failure and
        `raise_exception` as `True`. `ValidationError` exception should be raised
        """

        # Given
        username = "username"
        password = "password"
        email = "email@mail.com"
        raise_exception = True

        test_serializer = LogoutSerializer()
        register_serializer = RegisterSerializer()

        # Acts
        user = register_serializer.create({
            'username':username,
            'password':password,
            'email':email
        })
        user.save()

        # Asserts
        self.assertRaises(
            ValidationError,
            test_serializer.fetch_token,
            user,
            "1",
            raise_exception
        )

    def test_fetch_token_fails_no_exception(self):
        """
        Test method for the method `fetch_token` with failure and
        `raise_exception` as `False`. `None` result should be returned
        """

        # Given
        username = "username"
        password = "password"
        email = "email@mail.com"
        raise_exception = False

        test_serializer = LogoutSerializer()
        register_serializer = RegisterSerializer()

        # Acts
        user = register_serializer.create({
            'username':username,
            'password':password,
            'email':email
        })
        user.save()
        operation_result: Token = test_serializer.fetch_token(
            user,
            "1",
            raise_exception
        )

        # Asserts
        self.assertEqual(operation_result, None)

    def test_is_valid(self):
        """
        Test method for the method `is_valid`
        """

        # Given
        username = "username"
        password = "password"
        email = "email@mail.com"

        register_serializer = RegisterSerializer()
        logout_serializer = LogoutSerializer()

        # Acts
        user: User = register_serializer.create({
            'username':username,
            'password':password,
            'email':email
        })
        token:RefreshToken = UserManagmentTokenObtainPairSerializer.get_token(user)
        token_data = logout_serializer.fetch_token_data(str(token))
        token_object = Token.create_token(
            user.id,
            token_data['jti'],
            1,
            1
        )

        access_token = str(token).encode('utf-8')

        test_serializer = LogoutSerializer(instance={
            'token':access_token,
            'user':user
        })

        operation_result = test_serializer.is_valid()

        # Asserts
        self.assertEqual(operation_result['user'], user)
        self.assertEqual(operation_result['token'], token_object)

class LogoutTestCase(TestCase):
    """Unit test class for the logout
    `POST` method
    """

    def setUp(self) -> None:
        """
        Set up the factory for
        the reverse method
        """
        self.factory:APIClient = APIClient()
        return super().setUp()

    def tearDown(self) -> None:
        """
        Reset the factory authentication requests
        """
        self.factory.credentials()

    def test_post_request_success(self):
        """
        Unit test method with success
        """

        # Given
        username = "username"
        password = "password"
        email = "email@mail.com"
        url = reverse("logout")

        register_serializer = RegisterSerializer()
        logout_serializer = LogoutSerializer()

        # Before Acts
        user: User = register_serializer.create({
            'username':username,
            'password':password,
            'email':email
        })
        token:RefreshToken = UserManagmentTokenObtainPairSerializer.get_token(user)
        token_data = logout_serializer.fetch_token_data(str(token))
        token_object = Token.create_token(
            user.id,
            token_data['jti'],
            1,
            1
        )
        token_object.save()

        # Acts
        self.factory.credentials(HTTP_AUTHORIZATION="Bearer "+str(token))
        response = self.factory.post(
            url,
            {},
            format="json"
        )

        # Asserts
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message":"Successful logout!"})
        self.assertEqual(user.is_currently_logged_in, False)
        self.assertFalse(Token.objects.filter(jti=token_data["jti"]).exists(),False)
