# Generated by Django 5.1 on 2024-09-11 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_movie_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='film_industry',
            field=models.CharField(default=1, max_length=200),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='movie',
            name='genre',
            field=models.CharField(max_length=300),
        ),
    ]
