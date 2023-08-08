from django.urls import reverse
from django.test import TestCase
from freezegun import freeze_time
from rest_framework.test import APIClient
from server.settings import LOCALE

from user_managment.api.profile import ProfileAPI, StaffProfileSerializer, UserProfileSerializer
from user_managment.models import User
from apps_tests.test_users_managment.api.utils.session import authenticate, register

class ProfileAPITest(TestCase):
    """
    Unit test class for the profile API class
    """

    def setUp(self) -> None:
        self.test_object = ProfileAPI()
        self.factory = APIClient()
        return super().setUp()

    def tearDown(self) -> None:
        self.test_object = None
        return super().tearDown()

    def check_if_staff_serializer_is_correctly_set(self, data:list[object]):
        """
        Check if the list entered is correctly set for a staff
        """
        self.assertTrue(isinstance(data, StaffProfileSerializer))
        dict_data = dict(data.__dict__['_data'])

        self.assertTrue('username' in dict_data)
        self.assertTrue('email' in dict_data)
        self.assertTrue('registration_date' in dict_data)
        self.assertTrue('last_login' in dict_data)
        self.assertTrue('is_currently_logged_in' in dict_data)
        self.assertTrue('is_active' in dict_data)
        self.assertTrue('staff' in dict_data)
        self.assertTrue('admin' in dict_data)

    def test_fetch_profile_is_admin_or_staff(self):
        """
        Test case for the method `fetch_profile`
        """
        # Before
        staff_username = "staff"
        staff_email = "staff@staff.com"
        admin_username = "admin"
        admin_email = "admin@admin.com"
        password = "password!"

        staff_user = User.create_user(staff_username,staff_email,password)
        staff_user.staff = True
        staff_user.save()

        admin_user = User.create_superuser(admin_username,password,admin_email)

        # Acts
        first_operation_result = self.test_object.\
            fetch_profile(staff_user,[]).__dict__['serializer']
        second_operation_result = self.test_object.\
            fetch_profile(admin_user, []).__dict__['serializer']

        # Asserts
        self.check_if_staff_serializer_is_correctly_set(first_operation_result)
        self.check_if_staff_serializer_is_correctly_set(second_operation_result)

    def test_fetch_profile_is_simple_user(self):
        """
        Test case for the method `fetch_profile`
        """
        # Before
        username = "staff"
        email = "staff@staff.com"
        password = "password!"

        user = User.create_user(username,email,password)
        user.save()

        # Acts
        operation_result = self.test_object.fetch_profile(user,[]).__dict__['serializer']
        operation_result_data = dict(operation_result.__dict__['_data'])

        # Asserts
        self.assertTrue(isinstance(operation_result, UserProfileSerializer))
        self.assertTrue('username' in operation_result_data)
        self.assertTrue('email' in operation_result_data)
        self.assertTrue('registration_date' in operation_result_data)
        self.assertTrue('last_login' in operation_result_data)
        self.assertTrue('is_currently_logged_in' in operation_result_data)

    def test_generate_profile_index_array(self):
        """
        Test case for the method `fetch_profile`
        """
        # Before
        username = "staff"
        email = "staff@staff.com"
        password = "password!"
        host = "localhost"
        is_secured = False

        user = User.create_user(username,email,password)
        user.save()
        profile_fetched = self.test_object.fetch_profile(user,[])

        # Acts
        operation_result = self.test_object.generate_profile_index_array(
            host,
            is_secured,
            username,
            profile_fetched
        )

        # Asserts
        self.assertEqual(operation_result['user'],profile_fetched)
        self.assertEqual(
            operation_result['url_managment_list']['delete'],
            "http://"+host+"/api/v1/user/staff/delete"
        )
        self.assertEqual(
            operation_result['url_managment_list']['update'],
            "http://"+host+"/api/v1/user/staff/update"
        )
        self.assertEqual(
            operation_result['url_managment_list']['profile'],
            "http://"+host+"/api/v1/user/staff/profile"
        )

    @freeze_time("1971-01-01 00:00:00")
    def test_get_success(self):
        """
        Test method for the `GET` request
        with a success profile fetch
        """
        # Before
        username = "username"
        password = "password"
        email = "email@email.com"
        register(username, password, email)

        access_token = authenticate(username, password)

        url = reverse("profile_view", kwargs={"username":username})

        expected_status_code = 200
        expected_body = {
            'user': {
                'username': username,
                'email': email,
                'registration_date': '1971-01-01T00:00:00Z',
                'last_login': '1971-01-01T00:00:00Z',
                'is_currently_logged_in': True
            },
            'url_managment_list': {
                'delete': f'http://testserver/api/v1/user/{username}/delete',
                'update': f'http://testserver/api/v1/user/{username}/update',
                'profile': f'http://testserver/api/v1/user/{username}/profile'
            }
        }

        # Acts
        self.factory.credentials(HTTP_AUTHORIZATION="Bearer "+access_token)
        response = self.factory.get(
            url,
            {},
            format="json"
        )

        # Asserts
        self.assertEqual(response.status_code, expected_status_code)
        self.assertEqual(response.json(), expected_body)

    @freeze_time("1971-01-01 00:00:00")
    def test_get_fail(self):
        """
        Test method for the `GET` request
        """
        # Before
        username = "username"
        password = "password"
        email = "email@email.com"
        other_profile = "My other profile!"

        register(username, password, email)

        access_token = authenticate(username, password)

        url = reverse("profile_view", kwargs={"username":other_profile})

        expected_status_code = 404
        expected_body = {
            'message':LOCALE.load_localised_text("PROFILE_UNKOWN_USER")
        }

        # Acts
        self.factory.credentials(HTTP_AUTHORIZATION="Bearer "+access_token)
        response = self.factory.get(
            url,
            {},
            format="json"
        )

        # Asserts
        self.assertEqual(response.status_code, expected_status_code)
        self.assertEqual(response.json(), expected_body)
