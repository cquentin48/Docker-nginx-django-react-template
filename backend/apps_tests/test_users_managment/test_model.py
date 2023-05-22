from django.test import TestCase

from user_managment.models import User

class ModelTest(TestCase):

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
        """Check if a superuser can be created or not
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
        user.is_superuser = True
        user.save(update_fields=["admin"])

        # Asserts
        self.assertEqual(user.username,username)
        self.assertEqual(user.email,email)
        self.assertEqual(user.is_active,True)
        self.assertEqual(user.is_admin,True)
