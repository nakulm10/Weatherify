# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import HttpResponseRedirect
from django.http import JsonResponse
from django.views import View
from .models import *
import json

from statsmodels.tsa.stattools import adfuller
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error
from pmdarima import auto_arima
from math import sqrt
import pandas as pd
import requests
import datetime

Today = datetime.date.today()
One_Days_Ago = Today - datetime.timedelta(days=1)
TF_days_ago = Today - datetime.timedelta(days=35)
Four_Days_Before = Today + datetime.timedelta(days=4)

Today_Str = Today.strftime("%Y-%m-%d")
One_Str = One_Days_Ago.strftime("%Y-%m-%d")
TF_Str = TF_days_ago.strftime("%Y-%m-%d")
Four_Str = Four_Days_Before.strftime("%Y-%m-%d")

@csrf_exempt
def Register(request):
    if request.method == 'POST':
        Context = json.loads(request.body)

        print(Context)

        Ok=1
        L = []
        if YourModel.objects.filter(username=Context['username']).exists():
            print("User Already Exist !!!")
            L.append("User Already Exist !!!")
            Ok=0

        Dot_Count = 0
        for i in Context['email']:
            if i == '.':
                Dot_Count += 1

        if Dot_Count < 1:
            print('Email Is Not Valid !!!')
            L.append("Email Is Not Valid !!!")
            Ok=0

        if len(Context['phoneNumber']) != 10 or (not Context['phoneNumber'].isdigit()):
            print('Phone Number Is Not Valid !!!')
            L.append("Phone Number Is Not Valid !!!")
            Ok=0

        if len(Context['password']) < 8:
            print("Password Must Be An 8-Digit Character !!!")
            L.append("Password Must Be An 8-Digit Character !!!")
            Ok=0

        if Context['password'] != Context['confirmPassword']:
            print("Password And Confirm Password Does Not Match !!!")
            L.append("Password And Confirm Password Does Not Match !!!")
            Ok=0

        Data = YourModel(fullname=Context['fullName'],username=Context['username'],email=Context['email'],phone_number=Context['phoneNumber'],passward=Context['password'],confirmpassward=Context['confirmPassword'])
        
        if Ok:
            Data.save()
            return JsonResponse({'message': 'Account Created Successfully !!!','ok': Ok})
        else:
            return JsonResponse({'message': L[0]})
    else:
        return JsonResponse({'message': 'Invalid Request Method'}, status=400)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        Context = json.loads(request.body)
        print(Context)

        Ok=1
        L = []
        if not YourModel.objects.filter(username=Context['username']).exists():
            print("User Not Exist !!!")
            L.append("User Not Exist !!!")
            Ok=0
        else:
            Password = YourModel.objects.get(username=Context['username']).passward
            if Password != Context['password']:
                print("Password Does Not Match !!!")
                L.append("Password Does Not Match !!!")
                Ok=0

        if Ok:
            return JsonResponse({'message' : 'Login Successfully','ok': Ok,'username' : Context['username']})
        else:
            return JsonResponse({'message': L[0]})

    return JsonResponse({'message': 'Invalid Request Method'}, status=400)

def GetData(city):
    url = "http://api.worldweatheronline.com/premium/v1/past-weather.ashx"

    params = {
        'key': '77a026e30e174484bbf183345232410',
        'q': str(city),
        'format': 'json',
        'date': TF_Str,
        'enddate': One_Str
    }

    response = requests.get(url, params=params)
    data = response.json()
    Weather_Data = data['data']['weather']

    Extracted_Data = []

    for day in Weather_Data:
        for hour in day['hourly']:
            Time = hour['time']
            TempC = hour['tempC']
            WindSpeedKmph = hour['windspeedKmph']
            Humidity = hour['humidity']
            Pressure = hour['pressure']

            Extracted_Data.append([Time, TempC, WindSpeedKmph, Humidity, Pressure])

    global DF
    DF = pd.DataFrame(Extracted_Data, columns=['Time', 'TempC', 'WindSpeedKmph', 'Humidity', 'Pressure'])

def GetT():
    DF['TempC'] = pd.to_numeric(DF['TempC'], errors='coerce')

    Stepwise_Fit_TempC = auto_arima(DF['TempC'], trace=True, suppress_warnings=True)

    Order_TempC = Stepwise_Fit_TempC.order

    Train_TempC=DF.iloc[:-20]
    Test_TempC=DF.iloc[-20:]

    Model_TempC1 = ARIMA(Train_TempC['TempC'], order=Order_TempC)
    Model_TempC1 = Model_TempC1.fit()

    Start_TempC=len(Train_TempC)
    End_TempC=len(Train_TempC)+len(Test_TempC)-1
    Pred_TempC=Model_TempC1.predict(start=Start_TempC,end=End_TempC,typ='levels').rename('ARIMA TempC_Predictions')

    Model_TempC2 = ARIMA(DF['TempC'], order=Order_TempC)
    Model_TempC2 = Model_TempC2.fit()

    Pred_TempC=Model_TempC2.predict(start=len(DF),end=len(DF)+7,typ='levels').rename('ARIMA TempC_Predictions')
    
    return Pred_TempC

def GetW():
    DF['WindSpeedKmph'] = pd.to_numeric(DF['WindSpeedKmph'], errors='coerce')

    Stepwise_Fit_WindSpeedKmph = auto_arima(DF['WindSpeedKmph'], trace=True, suppress_warnings=True)

    Order_WindSpeedKmph = Stepwise_Fit_WindSpeedKmph.order

    Train_WindSpeedKmph=DF.iloc[:-20]
    test_WindSpeedKmph=DF.iloc[-20:]

    Model_WindSpeedKmph1 = ARIMA(Train_WindSpeedKmph['WindSpeedKmph'], order=Order_WindSpeedKmph)
    Model_WindSpeedKmph1 = Model_WindSpeedKmph1.fit()

    Start_WindSpeedKmph=len(Train_WindSpeedKmph)
    End_WindSpeedKmph=len(Train_WindSpeedKmph)+len(test_WindSpeedKmph)-1
    Pred_WindSpeedKmph=Model_WindSpeedKmph1.predict(start=Start_WindSpeedKmph,end=End_WindSpeedKmph,typ='levels').rename('ARIA Predictions')

    Model_WindSpeedKmph2 = ARIMA(DF['WindSpeedKmph'], order=Order_WindSpeedKmph)
    Model_WindSpeedKmph2 = Model_WindSpeedKmph2.fit()

    Pred_WindSpeedKmph=Model_WindSpeedKmph2.predict(start=len(DF),end=len(DF)+7,typ='levels').rename('ARIMA Predictions')

    return Pred_WindSpeedKmph

def GetH():
    DF['Humidity'] = pd.to_numeric(DF['Humidity'], errors='coerce')

    Stepwise_Fit_Humidity = auto_arima(DF['Humidity'], trace=True, suppress_warnings=True)

    Order_Humidity = Stepwise_Fit_Humidity.order

    Train_Humidity=DF.iloc[:-20]
    Test_Humidity=DF.iloc[-20:]

    Model_Humudity1 = ARIMA(Train_Humidity['Humidity'], order=Order_Humidity)
    Model_Humudity1 = Model_Humudity1.fit()

    Start_Humidity=len(Train_Humidity)
    End_Humidity=len(Train_Humidity)+len(Test_Humidity)-1
    Pred_Humidity=Model_Humudity1.predict(start=Start_Humidity,end=End_Humidity,typ='levels').rename('ARIMA Predictions')

    Model_Humidity2 = ARIMA(DF['Humidity'], order=Order_Humidity)
    Model_Humidity2 = Model_Humidity2.fit()

    Pred_Humidity=Model_Humidity2.predict(start=len(DF),end=len(DF)+7,typ='levels').rename('ARIMA Predictions')

    return Pred_Humidity

def GetP():
    DF['Pressure'] = pd.to_numeric(DF['Pressure'], errors='coerce')

    Stepwise_Fit_Pressure = auto_arima(DF['Pressure'], trace=True, suppress_warnings=True)

    Order_Pressure = Stepwise_Fit_Pressure.order

    Train_Pressure=DF.iloc[:-20]
    Test_Pressure=DF.iloc[-20:]

    Model_Pressure1 = ARIMA(Train_Pressure['Pressure'], order=Order_Pressure)
    Model_Pressure1 = Model_Pressure1.fit()

    Start_Pressure=len(Train_Pressure)
    End_Pressure=len(Train_Pressure)+len(Test_Pressure)-1
    Pred_Pressure=Model_Pressure1.predict(start=Start_Pressure,end=End_Pressure,typ='levels').rename('ARIMA Predictions')

    Model_Pressure2 = ARIMA(DF['Pressure'], order=Order_Pressure)
    Model_Pressure2 = Model_Pressure2.fit()

    Pred_Pressure=Model_Pressure2.predict(start=len(DF),end=len(DF)+7,typ='levels').rename('ARIMA Predictions')

    return Pred_Pressure

@csrf_exempt
def forecast(request):
    if request.method == 'POST':
        Context = json.loads(request.body)
        
        GetData(Context['city'])

        DF_Temp = DF['TempC'].tolist()
        P_Temp = GetT().tolist()

        DF_Wind = DF['WindSpeedKmph'].tolist()
        P_Wind = GetW().tolist()

        DF_Humi = DF['Humidity'].tolist()
        P_Humi = GetH().tolist()

        DF_Pres = DF['Pressure'].tolist()
        P_Pres = GetP().tolist()
                 
        return JsonResponse({'DF_Temp' : DF_Temp, 'P_Temp' : P_Temp,
                             'DF_Wind' : DF_Wind, 'P_Wind' : P_Wind,
                             'DF_Humi' : DF_Humi, 'P_Humi' : P_Humi,
                             'DF_Pres' : DF_Pres, 'P_Pres' : P_Pres
                             })

    return JsonResponse({'message': 'Invalid Request Method'}, status=400)

class NEWSListView(View):
    def get(self, request, *args, **kwargs):
        data = list(NEWS.objects.values())
        return JsonResponse(data, safe=False)
    
class FAQListView(View):
    def get(self, request, *args, **kwargs):
        data = list(FAQ.objects.values())
        return JsonResponse(data, safe=False)
    
@csrf_exempt
def profilepage(request):
    if request.method == 'POST':
        Context = json.loads(request.body)
        print(Context)

    return JsonResponse({'message': 'Invalid Request Method'}, status=400)