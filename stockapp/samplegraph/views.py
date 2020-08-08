from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import os
import pandas as pd
import matplotlib.pyplot as plt
import math
import json
from .models import BlogPost
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from .forms import LoginForm
from rest_framework import generics
from .api.serializers import LeadSerializer, BlogSerializer
from django.urls import reverse

# Create your views here.
@login_required
def index(request):
    return render(request, "samplegraph/index.html")

def userInfo(request):
    if request.user.is_authenticated:
        return JsonResponse({"username":request.user.username,"email":request.user.email})
    else:
        return JsonResponse({"username":"Sign Up","email":""})

def algoTrade(request):
    if request.method=="GET":
        #sharpe_ratio
        daily_rf = 0
        #csv_path = os.path.join(housing_path, "GLD.csv")
        #df = pd.read_csv(csv_path, usecols=['Adj Close'])
        df = pd.read_csv("https://sandbox.iexapis.com/stable/stock/"+request.GET['tic']+"/chart/6m?token=Tpk_1f76b2afcb3e466bb0ab9b034388e043&format=csv", usecols=['close'])
        #trying to convert it to an integer
        df1 = df[0:]
        #df2 = ''.join(df1)
        #df3 = int(df2)
        daily_returns = df1.copy()
        daily_returns[1:] = (df1[1:] / df1[:-1].values) - 1
        daily_returns.iloc[0, :] = 0
        sharpe_ratio = ((daily_returns - daily_rf).mean()) / ((daily_returns - daily_rf).std())
        k = math.sqrt(12)
        #weekly k = math.sqrt(52)
        #monthly k = math.sqrt(12)
        sr_annual = round((k * sharpe_ratio),2)

        
        std_final = round(daily_returns.std(),2)

        return JsonResponse({
                        "sharpe":sr_annual['close'],
                        "std":std_final['close']
        })
    else:
        return JsonResponse({"sharpe":"error"})

def register(request):
    if request.method=="POST":
        user = User.objects.create_user(request.POST['username'],request.POST['email'],request.POST['password'])
        user.save()
        return HttpResponseRedirect(reverse('login'))        


class LeadListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = LeadSerializer

class BlogAPI(generics.ListAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogSerializer


def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            user = authenticate(request,
                                username=cd['username'],
                                password=cd['password'])
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return HttpResponse('Authenticated '\
                                        'successfully')
                else:
                    return HttpResponse('Disabled account')
            else:
                return HttpResponse('Invalid login')
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})