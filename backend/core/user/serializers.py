from rest_framework.serializers import ModelSerializer

from .models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','is_active','created','updated']
        read_only_fields = ['is_active','created','updated']
