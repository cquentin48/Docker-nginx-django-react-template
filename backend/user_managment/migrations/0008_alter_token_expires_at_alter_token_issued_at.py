# Generated by Django 4.1.7 on 2023-07-14 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_managment', '0007_rename_user_id_token_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='token',
            name='expires_at',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='token',
            name='issued_at',
            field=models.DateTimeField(),
        ),
    ]
