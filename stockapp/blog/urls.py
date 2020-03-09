from django.urls import path
from . import views
from blog.views import ViewAll, Delete
from django.views.generic import TemplateView

app_name='blog'
urlpatterns = [
    path('',ViewAll.as_view()),
    path('home/',ViewAll.as_view(), name='home'),
    path('home/new',TemplateView.as_view(template_name='input.html'), name ='newpost'),
    path('saved/',views.createPost,name="createPost"),
    path('delete/',Delete.listDel,name="deletepost"),
    path('123/',Delete.delete,name="delete"),
    path('stock/',views.stockpick, name="stockpage"),
    path('stock/<str:ticker>/',views.stockinfo, name="stockpick"),
]