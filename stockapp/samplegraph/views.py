from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import os
import pandas as pd
import matplotlib.pyplot as plt
import math
import json

# Create your views here.
def index(request):
    return render(request, "samplegraph/index.html")

def algoTrade(request):
    if request.method=="GET":
        #sharpe_ratio
        dates = 'Date'
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
        std_daily_ret = daily_returns.std()
        sharpe_ratio = ((daily_returns - daily_rf).mean()) / ((daily_returns - daily_rf).std())
        k = math.sqrt(252)
        #weekly k = math.sqrt(52)
        #monthly k = math.sqrt(12)
        sr_annual = round((k * sharpe_ratio),2)

        #csv_path = os.path.join(housing_path, "GLD.csv")
        #df = pd.read_csv(csv_path, usecols=['Adj Close'])
        df = pd.read_csv("https://sandbox.iexapis.com/stable/stock/googl/chart/6m?token=Tpk_1f76b2afcb3e466bb0ab9b034388e043&format=csv", usecols=['close'])
        #trying to convert it to an integer
        df1 = df[0:]
        #df2 = ''.join(df1)
        #df3 = int(df2)
        daily_returns = df1.copy()
        daily_returns[1:] = (df1[1:] / df1[:-1].values) - 1
        daily_returns.iloc[0, :] = 0
        std_daily_ret = round(daily_returns.std(),2)

        return JsonResponse({
                        "sharpe":sr_annual['close'],
                        "std":std_daily_ret['close']
        })
    else:
        return JsonResponse({"sharpe":"error"})