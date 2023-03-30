from rest_framework.routers import SimpleRouter

from .viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet
from .user.viewsets import UserViewSet

routes = SimpleRouter()

routes.register(r'auth/login',LoginViewSet, basename='auth-login')
routes.register(r'auth/register',RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh',RefreshViewSet, basename='auth-refresh')

routes.register(r'user', UserViewSet, basename='user')

urlpatterns = [
    *routes.urls
]
