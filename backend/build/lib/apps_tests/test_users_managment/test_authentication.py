
from django.test import TestCase
from rest_framework import exceptions

from user_managment.authentication import UserAuthentication
from user_managment.models import Token, User


class UserAuthenticationTestCase(TestCase):
    """
    Unit test class for the user authentication
    """

    def test_fetch_user_success(self):
        """
        Unit test method for the method `fetch_user`

        Expected result : correct user fetch
        """
        # Before
        username = "username"
        password = "password"
        email = "mail@mail.com"

        test_object = UserAuthentication()

        # Before Acts
        user:User = User.objects.create_user(
            username,email,password
        )

        # Acts
        operation_result:User = test_object.fetch_user(username)

        # Asserts
        self.assertEqual(operation_result,user)

    def test_fetch_user_failure(self):
        """
        Unit test method for the method `fetch_user`

        Expected outcome : exception `User.DoesNotExist` raised
        """
        # Before
        username = "username"

        test_object = UserAuthentication()

        # Acts & Asserts
        self.assertRaises(
            exceptions.AuthenticationFailed,
            test_object.fetch_user,
            username
        )

    def test_check_jwt_token_success(self):
        """
        Unit test method for the method `fetch_user`

        Expected result : correct user fetch
        """
        # Before
        username = "username"
        password = "password"
        email = "mail@mail.com"

        test_object = UserAuthentication()

        # Before Acts
        user:User = User.objects.create_user(
            username,email,password
        )
        Token.create_token(
            user.id,
            "1",
            1,
            1
        )

        # Acts & Asserts
        try:
            test_object.check_jwt_token(user,"1")
        except Token.DoesNotExist:
            self.fail("Exception DoesNotExist of Token class raised unexceptedly!")

    def test_check_jwt_token_failure(self):
        """
        Unit test method for the method `fetch_user`

        Expected outcome : exception `User.DoesNotExist` raised
        """
        # Before
        username = "username"
        password = "password"
        email = "mail@mail.com"

        test_object = UserAuthentication()

        user:User = User.objects.create_user(
            username,email,password
        )

        # Acts & Asserts
        self.assertRaises(
            exceptions.AuthenticationFailed,
            test_object.check_jwt_token,
            user, "1"
        )
