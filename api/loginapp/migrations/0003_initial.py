# Generated by Django 4.2.4 on 2023-11-14 19:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("loginapp", "0002_delete_yourmodel"),
    ]

    operations = [
        migrations.CreateModel(
            name="YourModel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("fullname", models.CharField(max_length=100)),
                ("username", models.CharField(max_length=100)),
                ("email", models.EmailField(max_length=254)),
                ("phone_number", models.CharField(max_length=10)),
                ("passward", models.CharField(max_length=20)),
                ("confirmpassward", models.CharField(max_length=20)),
            ],
        ),
    ]
