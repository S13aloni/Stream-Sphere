# core/serializers.py
from rest_framework import serializers
from .models import Customer,Movie,Video,WebSeries,SubscriptionPlan,Episode

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['first_name', 'last_name', 'email', 'mobile', 'password']

        
class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'
        # fields = ['title','genre','rating','quality','image']


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'title', 'description', 'video','film_industry','type']

class WebSeriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebSeries
        fields = '__all__'

class EpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episode
        fields = '__all__'

class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = '__all__'