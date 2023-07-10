from django.test import TestCase

from user_managment.models import Token, User

class ModelTest(TestCase):
    """Model unit test class
    """

    def test_create_user(self):
        """Check if a user can be created or not
        """
        # Given
        username = "username"
        email="mail@mail.com"
        password="mypassword!"

        # Acts
        user:User = User.objects.create(
            username=username,
            email=email,
            password=password
        )

        # Asserts
        self.assertEqual(user.username,username)
        self.assertEqual(user.email,email)
        self.assertEqual(user.is_active,True)

    def test_create_superuser(self):
        """
        Check if a superuser can be created or not
        """
        # Given
        username = "username"
        email="mail@mail.com"
        password="mypassword!"

        # Acts
        user:User = User.create_superuser(
            username=username,
            email=email,
            password=password
        )

        # Asserts
        self.assertEqual(user.username,username)
        self.assertEqual(user.email,email)
        self.assertEqual(user.is_active,True)
        self.assertEqual(user.is_admin,True)

    def test_get_short_name(self):
        """
        Unit test method for the method `get_short_name`
        """
        # Given
        username = "username"
        email="mail@mail.com"
        password="mypassword!"

        # Acts
        user:User = User.create_superuser(
            username=username,
            email=email,
            password=password
        )

        operation_result = user.get_short_name()

        # Asserts
        self.assertEqual(operation_result, username)

    def test_has_perm_failure(self):
        """
        Unit test method for the method `has_perm`
        Expected result : `False`
        """
        # Given
        username = "username"
        email="mail@mail.com"
        password="mypassword!"

        user:User = User.objects.create(
            username=username,
            email=email,
            password=password
        )

        first_perm = "view_"
        second_perm = "auth"

        expected_outcome = False

        # Acts
        first_operation_result = user.has_perm(first_perm)
        second_operation_result = user.has_perm(second_perm)

        # Asserts
        self.assertEqual(first_operation_result, expected_outcome)
        self.assertEqual(second_operation_result, expected_outcome)

    def test_has_perm_success(self):
        """
        Unit test method for the method `has_perm`
        Expected result : `False`
        """
        # Given
        first_username = "username"
        second_username = "username2"
        first_email="mail@mail.com"
        second_email = "mail2@mail.com"
        password="mypassword!"

        first_user:User = User.objects.create(
            username=first_username,
            email=first_email,
            password=password
        )
        second_user:User = User.create_superuser(
            second_username,password,second_email
        )

        first_perm = "mydata"
        second_perm = "view_"

        expected_outcome = True

        # Acts
        first_operation_result = first_user.has_perm(first_perm)
        second_operation_result = second_user.has_perm(second_perm)

        # Asserts
        self.assertEqual(first_operation_result, expected_outcome)
        self.assertEqual(second_operation_result, expected_outcome)

    def test_is_staff(self):
        """
        Unit test method for the method `is_staff`
        Expected result : `is_staff` property of User class instance object
        """

        # Given
        username = "username"
        email="mail@mail.com"
        password="mypassword!"

        user:User = User.objects.create(
            username=username,
            email=email,
            password=password
        )

        expected_result = False

        # Acts
        operation_result = user.is_staff

        # Asserts
        self.assertEqual(operation_result, expected_result)

    def test_is_user_active(self):
        """
        Unit test method for the method `user_active`
        Expected result : `user_active` property of User class instance object
        """

        # Given
        username = "username"
        email="mail@mail.com"
        password="mypassword!"

        user:User = User.objects.create(
            username=username,
            email=email,
            password=password
        )

        expected_result = True

        # Acts
        operation_result = user.is_user_active

        # Asserts
        self.assertEqual(operation_result, expected_result)

class TokenTestCase(TestCase):
    """
    Test class for the class `Token`
    """

    def test___str__(self):
        """
        Test method for the method `__str__`
        Expected result : `user:jti:issued_at:expires_at`
        """

        # Given
        username = "username"
        email="mail@mail.com"
        password="mypassword!"

        user:User = User.objects.create(
            username=username,
            email=email,
            password=password
        )

        jti = "1"
        issued_at = 1
        expires_at = 1

        token:Token = Token.create_token(
            user.id,
            jti,
            issued_at,
            expires_at
        )
        expected_result = str(user)+":"+str(jti)+":"+str(token.issued_at)+"-"+str(token.expires_at)

        # Acts
        operation_result = str(token)

        # Asserts
        self.assertEqual(expected_result,operation_result)
