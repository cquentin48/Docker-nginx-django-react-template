from rest_framework import serializers
from rest_framework import generics, status
from rest_framework.response import Response

from .models import User
from .serializer import RegisterSerializer, UserSerializer

class RegisterAPI(generics.GenericAPIView):
    """API View for registering a user
    """
    serializer_class = RegisterSerializer

    def post(self, request, *_, **__)->Response:
        """Post route managment

        Args:
            request (_type_): request sent by the user

        Returns:
            Response: Response sent by the server to the user
            201 : User created
            400 : Bad inputs entered
            409 : Conflict in username and/or email
        """
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.create(serializer.validated_data)

            return Response(
            {
                "user": UserSerializer(
                    user,
                    context=self.get_serializer_context()).data,
                    "message":"User Created Successfully. Please perform "+
                    "login."
            },
            status=status.HTTP_201_CREATED,
            headers={
                "Location":"http://0.0.0.0:8000/api/v1/user/"+user.username+"/profile"
            }
            )
        except serializers.ValidationError as error:
            return Response(
                {
                    "message":str(error)
                },
                status=error.status_code
            )
        except User.AlreadyExist as error:
            return Response(
                {
                    "message":str(error)
                },
                status=error.status_code,
            )
