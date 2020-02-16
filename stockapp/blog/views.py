from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from datetime import datetime as dt
from .models import *
import uuid

def createPost(request):
    newPost = Post(title=request.POST['title'], body=request.POST['body'], date=dt.now())
    newPost.save()
    return index(request)

def index(request):
    posts = {"posts":Post.objects.all()}
    return render(request,'blog/main.html',posts)

def blogHome(request):
    return HttpResponse("Have to edit this")
 
def listDel(request):
    posts = {"posts":Post.objects.all()}
    return render(request,'blog/delete.html',posts)


def delete(request,id):
    prod = Post.objects.get(title=id)
    prod.delete()
    return HttpResponseRedirect(reverse('home'))


