# Generated by Django 5.1 on 2024-09-07 05:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_user_delete_customuser'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='mobile_number',
            new_name='mobile',
        ),
    ]
