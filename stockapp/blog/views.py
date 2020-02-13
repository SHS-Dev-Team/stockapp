from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect


def createPost(request):
    return HttpResponse("Use Template View")

    
def index(request):
    return HttpResponse("All stakes in now")

def blogHome(request):
    return HttpResponse("Have to edit this")
 
# Create your views here.
