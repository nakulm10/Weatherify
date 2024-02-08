# urls.py
# from .views import process_form_data
from django.contrib import admin
from django.urls import path
from loginapp import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path('register/', views.Register, name='Register'),
    path('login/', views.login, name='Login'),
    path('forecast/', views.forecast, name='Forecast'),
    path('NEWS/', views.NEWSListView.as_view()),
    path('FAQ/', views.FAQListView.as_view())
    # path('profilepage/', views.profilepage),
    # Add other URL patterns as needed
]
