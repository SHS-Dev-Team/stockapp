from django.urls import path
from . import views
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', TemplateView.as_view(template_name="landing.html"),name="landing"),
    path('app/', views.index, name="dashboard"),
    path('app/api/stats/',views.algoTrade),
    path('app/api/user/',views.userInfo),
    path('app/api/posts',views.BlogAPI.as_view(),name="posts"),
    path('register/',TemplateView.as_view(template_name="registration/register.html")),
    path('info/', views.register,name="register"),
    path('api/users/', views.LeadListCreate.as_view(),name="users"),
    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout')
]