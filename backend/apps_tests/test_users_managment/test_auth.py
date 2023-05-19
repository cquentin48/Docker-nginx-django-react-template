from user_managment.models import User
from django.test import TestCase

class AuthTestCase(TestCase):
    def setUp(self):
        self.u = User.objects.create_user('root', 'root@root.com', 'root')
        self.u.is_staff = True
        self.u.is_superuser = True
        self.u.is_active = True
        self.u.save()

    def testLogin(self):
        self.client.login(username='root@root.com', password='root')
