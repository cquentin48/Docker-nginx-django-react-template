from django.test import TestCase
from user_managment.models import User

class AuthTestCase(TestCase):
    """Authentication unit test class
    """
    def setUp(self):
        """Set up for each test case
        """
        self.user = User.objects.create_user('root', 'root@root.com', 'root')
        self.user.save()

    def test_login(self):
        """Test a normal user login
        """
        self.client.login(username='root@root.com', password='root')
