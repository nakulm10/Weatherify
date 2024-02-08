# your_app_name/models.py
from django.db import models

class YourModel(models.Model):
    fullname = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=10)
    passward = models.CharField(max_length=20)
    confirmpassward = models.CharField(max_length=20)

    def __str__(self):
        return self.fullname

class NEWS(models.Model):
    description = models.TextField()

    def __str__(self):
        return self.description
    
class FAQ(models.Model):
    question = models.TextField()
    answer = models.TextField()

    def __str__(self):
        return self.question