# Generated by Django 5.1 on 2024-09-14 04:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_alter_webseries_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='webseries',
            name='duration_per_episode',
            field=models.CharField(max_length=50),
        ),
    ]
