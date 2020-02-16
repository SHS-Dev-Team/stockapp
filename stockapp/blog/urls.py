from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('home/',views.index, name='home'),
    path('home/new',TemplateView.as_view(template_name='input.html'), name ='newpost'),
    path('saved/',views.createPost,name="createPost"),
    path('delete/',views.listDel),
    path('delete/<str:id>/',views.delete,name="delete")
]