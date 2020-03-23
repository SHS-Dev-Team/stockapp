from django.urls import path
from . import views
from blog.views import ViewAll, Delete, LeadListCreate
from django.views.generic import TemplateView

app_name='blog'
urlpatterns = [
    path('',ViewAll.as_view()),
    path('home/',ViewAll.as_view(), name='home'),
    path('new/',TemplateView.as_view(template_name='input.html'), name ='newpost'),
    path('post/<str:tag>/',views.viewPost,name="blogpost"),
    path('saved/',views.createPost,name="createPost"),
    path('delete/',Delete.listDel,name="deletepost"),
    path('123/',Delete.delete,name="delete"),
    path('stock/',views.stockpick, name="stockpage"),
    path('stock/<str:ticker>/',views.stockinfo, name="stockpick"),
    path('stockpage/',views.graph,name="graph"),
    path('djangoapi/',LeadListCreate.as_view()),
]