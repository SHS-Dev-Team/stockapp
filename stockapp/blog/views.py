from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from datetime import datetime as dt
from .models import *

def createPost(request):
    newPost = Post(title=request.POST['title'], body=request.POST['body'], date=dt.now())
    newPost.save()
    return HttpResponse("saved")

def index(request):
    posts = {"posts":Post.objects.all()}
    return render(request,'blog/main.html',posts)

def blogHome(request):
    return HttpResponse("Have to edit this")
 

