from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.views.generic import ListView
from datetime import datetime as dt
from .models import *
import uuid

def createPost(request):
    newPost = Post(title=request.POST['title'], body=request.POST['mytextarea'], date=dt.now())
    newPost.save()
    return HttpResponseRedirect(reverse('blog:home'))


class Delete():
    def listDel(request):
        posts = {"posts":Post.objects.all()}
        return render(request,'blog/delete.html',posts)
    def delete(request):
        for id in request.POST:
            if id!="csrfmiddlewaretoken":
                Post.objects.get(pk=id).delete()
        return HttpResponseRedirect(reverse('blog:home'))
        


class ViewAll(ListView):
    model = Post
    template_name = "blog/main.html"
