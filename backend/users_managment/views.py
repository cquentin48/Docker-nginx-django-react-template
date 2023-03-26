from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .serializer import TokenSerializer, RegisterSerializer

from .models import CustomUser

# Create your views here.

class CustomTokenGenerationView(TokenObtainPairView):
    """
    View class for the JWT Token generation
    """
    serializer_class = TokenSerializer

class RegisterView(APIView):
    """
    View class for the User creation
    """
    queryset = CustomUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

@api_view(['GET'])
def get_all_routes(_):
    """Return every routes linked to the user managment app

    Returns:
        dict: every routes linked to the user managment app
    """
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/register',
    ]

    response = \
        Response(
            data=routes,
            status=status.HTTP_200_OK
        )

    return response
