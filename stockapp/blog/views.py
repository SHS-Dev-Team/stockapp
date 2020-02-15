from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from datetime import datetime as dt

def createPost(request):
    newPost = Post(title=request.POST['title'], text=request.POST['text'], date=dt.now())
    newPost.save()
    return HttpResponse("saved")

def index(request):
    return HttpResponse("All stakes in now")

def blogHome(request):
    return HttpResponse("Have to edit this")
 

