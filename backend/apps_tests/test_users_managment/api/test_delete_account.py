import random
import string
from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from user_managment.api.delete_account import AccountDelete
from user_managment.models import User, Token
from server.settings import SECRET_KEY
from apps_tests.test_users_managment.api.utils.session import authenticate, register

class AccountDeleteTestCase(TestCase):
    """
    Unit test class for the logout
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

    def test_delete_every_tokens(self):
        """
        Test case for the method `delete_every_token`
        """
        # Before
        username = "username"
        password = "password"
        email = "email"

        user = User.create_user(username,email,password)

        issued_at = 0
        expires_at = 1
        jti = ''.join(random.choice(string.ascii_lowercase) for x in range(32))

        Token.create_token(user.id,jti,issued_at,expires_at)

        test_object = AccountDelete()
        expected_count = 0

        # Acts
        test_object.delete_every_tokens(user)
        token_object_count = len(Token.objects.filter(user=user))

        # Asserts
        self.assertEqual(token_object_count, expected_count)

    def test_delete_operation(self):
        """
        Test case for the DELETE operation method
        """
        # Before
        username = "username"
        password = "password"
        email = "email@email.com"

        register(username, password, email)

        access_token = authenticate(username, password)

        url = reverse("account_delete")

        expected_status_code = 200
        expected_message = "Account deleted!"

        # Acts

        self.factory.credentials(HTTP_AUTHORIZATION="Bearer "+str(access_token))
        response = self.factory.delete(
            url,
            {},
            format="json"
        )

        # After
        account_number = len(User.objects.all())

        # Asserts
        self.assertEqual(response.status_code, expected_status_code)
        self.assertEqual(response.json()['message'], expected_message)
        self.assertEqual(account_number, 0)
