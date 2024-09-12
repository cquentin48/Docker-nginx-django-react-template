from drf_yasg.utils import swagger_auto_schema
from requests import Request

from rest_framework import generics, serializers
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from server.settings import LOCALE
from user_managment.api.register import User
from user_managment.models import Token

class AccountDeleteSerializer(serializers.ModelSerializer):
    """
    Serializer class for the account delete managment
    """
    class Meta:
        model = User
        fields = {}

class AccountDelete(generics.GenericAPIView):
    """
    API View Call Account delete operation
    """
    serializer_class = AccountDeleteSerializer
    permission_classes = [IsAuthenticated]

    def delete_every_tokens(self, user:User):
        """
        Removes every jwt token created by the user
        Args:
            user (User): currently deleted user
        """
        token_list = Token.objects.filter(user=user)
        for single_token in token_list:
            single_token.delete()

    @swagger_auto_schema(operation_description="Delete a user account")
    def delete(self, request:Request, *args, **kwargs) -> Response:
        """
        Delete method for the account delete operation

        Args:
            request (Request): Request sent by the client
        """
        self.delete_every_tokens(request.user)
        request.user.delete()
        return Response({
            "message":LOCALE.load_localised_text("DELETE_ACCOUNT_SUCCESS")
        })
