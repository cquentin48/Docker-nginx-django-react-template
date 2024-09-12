from django.test import TestCase
from django.urls import reverse
from rest_framework import serializers, status
from rest_framework.test import APIClient
from user_managment.models import User
from user_managment.api.register import RegisterSerializer

class RegisterSerializerTestCase(TestCase):
    """Unit test class for the serializer of
    the register route
    """

    def test_string_validation_fail(self):
        """Unit test case which raise the `ValidationError`
        when the value set is empty
        """
        # Given
        test_object = RegisterSerializer()
        value = ""
        label_error = "USER_REGISTER_PASSWORD_IS_EMPTY"

        # Acts & Asserts
        self.assertRaises(
            serializers.ValidationError,
            test_object.string_validation,
            value,
            label_error
        )

    def test_check_if_email_is_already_taken_success(self):
        """Unit test case which doesn't raise any exception
        since no user has this email
        """
        # Given
        test_object = RegisterSerializer()
        email = "test@test.com"

        # Acts
        test_object.check_if_email_is_already_taken(email)

    def test_check_if_email_is_already_taken_fails(self):
        """Unit test case which raise the `User.AlreadyExist`
        exception since one user has this email
        """
        # Given
        test_object = RegisterSerializer()
        email = "test@test.com"
        username = "testUser"
        password = "password"

        # Acts
        test_object.create({
            'username':username,
            'password':password,
            'email':email
        })

        # Asserts
        self.assertRaises(
            User.AlreadyExist,
            test_object.check_if_email_is_already_taken,
            email
        )

    def test_check_if_user_already_exist_fails(self):
        """Unit test case which raise the `User.AlreadyExist`
        exception since one user is already set
        """
        # Given
        test_object = RegisterSerializer()
        email = "test@test.com"
        username = "testUser"
        password = "password"

        # Acts
        test_object.create({
            'username':username,
            'password':password,
            'email':email
        })

        # Asserts
        self.assertRaises(
            User.AlreadyExist,
            test_object.check_if_user_already_exist,
            username
        )

    def test_check_if_user_already_exist_success(self):
        """Unit test case which raise no exception
        since no user is already set
        """
        # Given
        test_object = RegisterSerializer()
        username = "testUser"

        # Acts
        test_object.check_if_user_already_exist(username)

    def test_validate(self):
        """Unit test case which raise the `User.AlreadyExist`
        exception since one user is already set
        """
        # Given
        test_object = RegisterSerializer()
        attrs = {
            'email' : "test@test.com",
            'username' : "testUser",
            'password' : "password"
        }

        # Acts
        test_object.validate(attrs)

class RegisterTestCase(TestCase):
    """Post request test class for
    registration route
    """

    def setUp(self) -> None:
        self.factory = APIClient()
        return super().setUp()

    def test_post_request_success_reverse(self):
        """Unit test class for the post request
        This one results with a `200` success since
        every input is correct and no user has the
        user details set before.
        """
        # Given
        username = "user"
        password = "password"
        email = "email@mail.com"
        first_name = "first name"
        last_name = "last name"

        # Acts
        response = self.factory.post(
            reverse("register"),
            {
                "username":username,
                "password":password,
                "email":email,
                "first_name":first_name,
                "last_name":last_name
            },
            format="json"
        )
        json_response = response.json()

        # Asserts
        self.assertEqual(len(json_response['user']), 2)
        self.assertEqual(json_response['user']['username'], 'user')
        self.assertEqual(json_response['user']['email'], 'email@mail.com')
        self.assertEqual(json_response['message'],
                        'User Created Successfully. Please perform login.')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_request_success_reverse_user_set(self):
        """Unit test class for the post request
        This one should create a `User`
        """
        # Given
        username = "user"
        password = "password"
        email = "email@mail.com"
        first_name = "first name"
        last_name = "last name"

        # Acts
        response = self.factory.post(
            reverse("register"),
            {
                "username":username,
                "password":password,
                "email":email,
                "first_name":first_name,
                "last_name":last_name
            },
            format="json"
        )
        user:User = User.objects.get(username=username)

        # Asserts
        self.assertEqual(response.status_code, 201)
        self.assertEqual(user.username, username)
        self.assertEqual(user.email, email)
        self.assertEqual(user.get_full_name(), username)
        self.assertTrue(User.objects.filter(username=username).exists())

    def test_post_request_fails_bad_input_reverse(self):
        """Unit test class for the post request
        """
        # Given
        username = ""
        password = "password"
        email = "email@mail.com"
        first_name = "first name"
        last_name = "last name"

        # Acts
        response = self.factory.post(
            reverse("register"),
            {
                "username":username,
                "password":password,
                "email":email,
                "first_name":first_name,
                "last_name":last_name
            },
            format="json"
        )
        json_response = response.json()

        # Asserts
        self.assertEqual(json_response['message'], 'Invalid input.')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(User.objects.filter(username=username).exists())

    def test_post_request_fails_already_user_set_reverse(self):
        """Unit test class for the post request
        This one results with a `200` success since
        every input is correct and no user has the
        user details set before.
        """
        # Given
        username = "user"
        password = "password"
        email = "email@mail.com"
        first_name = "first name"
        last_name = "last name"
        test_object = RegisterSerializer()

        # Acts
        test_object.create({
            'username':username,
            'password':password,
            'email':email
        })
        response = self.factory.post(
            reverse("register"),
            {
                "username":username,
                "password":password,
                "email":email,
                "first_name":first_name,
                "last_name":last_name
            },
            format="json"
        )
        json_response = response.json()

        # Asserts
        self.assertEqual(json_response['message'], "Username already exist!")
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
