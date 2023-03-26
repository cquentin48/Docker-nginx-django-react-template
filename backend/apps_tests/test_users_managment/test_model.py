from django.test import SimpleTestCase
from users_managment.models import CustomUser

class TestCustomUser(SimpleTestCase):
    """Unit test class for the custom user
    """
    databases = '__all__'
    def test_str_correct_output(self):
        """The __str__ function should display the correct output
        """
        # Given
        username="My username"
        email="mail2@mail.com"

        expected_output="1-"+username+"-"+email

        # Acts
        user:CustomUser = CustomUser.objects.create_user(
            username=username,
            email=email
        )

        # Asserts
        self.assertEqual(str(user),expected_output)
