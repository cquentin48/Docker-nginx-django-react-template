from rest_framework.exceptions import NotAuthenticated
from rest_framework.filters import OrderingFilter
from rest_framework.renderers import BrowsableAPIRenderer, JSONOpenAPIRenderer
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from server.settings import LOCALE

from .models import User
from .serializers import UserSerializer

class UserViewSet(ModelViewSet):
    filter_backends = [OrderingFilter]
    http_method_names = ['get']
    ordering_fields = ['updated']
    ordering = ['-updated']
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    renderer_classes = [BrowsableAPIRenderer, JSONOpenAPIRenderer]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        raise NotAuthenticated(
            LOCALE
            .load_localised_text(
                "USER_VIEWSET_NOT_AUTHENTICATED"
            )
        )

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = User.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj
