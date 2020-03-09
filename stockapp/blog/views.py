from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.views.generic import ListView
from datetime import datetime as dt
from .models import *
from finnhub import client as Finnhub
import uuid
import json 

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
    template_name = "blog/home.html"
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['object_list'] = reversed(Post.objects.all())
        return context

def stockpick(request):
    key="bphdaenrh5rablt4vrkg"
    client = Finnhub.Client(api_key=key)
    allstocks = [x['displaySymbol'] for x in client.stock_symbol(exchange="US")]
    results=[]
    placeholder = ""
    if request.GET.get('tic'):
        placeholder= request.GET.get('tic')
        thetic = placeholder.strip().upper()
        results = [x for x in allstocks if x.startswith(thetic)][:12]
    cont = {"stocklist":results,"placeholder":placeholder}
    return render(request, 'blog/stock.html',context=cont)
        
def stockinfo(request, ticker):
    key="bphdaenrh5rablt4vrkg"
    client = Finnhub.Client(api_key=key)
    name = client.company_profile(symbol=ticker)['name']
    description = client.company_profile(symbol=ticker)['description']
    marketcap= int(client.company_profile(symbol=ticker)['marketCapitalization']*1000000)
    context = {"name":name,"description":description,"marketcap":marketcap}
    return render(request, 'blog/stockindividual.html',context=context)