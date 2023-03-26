from django.urls import path

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path('token/', views.CustomTokenGenerationView.as_view(), name="token_obtain_pair"),
    path('token/refresh', TokenRefreshView.as_view(), name="token_refresh"),
    path('register/', views.RegisterView.as_view(), name="register"),
    path('',views.get_all_routes, name="auth_routes")
]
