from django.urls import reverse
from rest_framework.test import APIClient

def register(username:str, password:str, email: str):
    """
    Mocks a Register API Call
    Args:
        username (str): Currently created user login name
        password (str): Currently created user login password
        email (str): Currently created user login email
    """
    factory = APIClient()
    result = factory.post(
            reverse("register"),
            {
                "username":username,
                "password":password,
                "email":email,
                "first_name":"",
                "last_name":""
            },
            format="json"
    )

def authenticate(username:str, password:str) -> str:
    """
    Mocks an API Authentication call
    Args:
        username (str): user login name for the new session
        password (str): user password for the new session

    Returns:
        `str`: JWT Access token newly created for the session
    """
    factory = APIClient()

    result = factory.post(
    reverse("authentication"),
    {
        'username':username,
        'password':password
        },
        format="json"
    )
    return result.json()["access"]
