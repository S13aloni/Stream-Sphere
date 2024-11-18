# core/admin.py
from django.contrib import admin
from .models import Customer,Movie,Video,WebSeries,Episode,SubscriptionPlan

class CustomerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'mobile', 'password')  # Use 'mobile', not 'mobile_number'

admin.site.register(Customer, CustomerAdmin)


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'rating', 'genre', 'quality','release_year','image','film_industry')
    search_fields = ('title', 'genre','film_industry')

class EpisodeInline(admin.TabularInline):
    model = Episode
    extra = 1

@admin.register(WebSeries)
class WebSeriesAdmin(admin.ModelAdmin):
    list_display = ('title', 'release_year', 'genre', 'rating')
    inlines = [EpisodeInline]

@admin.register(Episode)
class EpisodeAdmin(admin.ModelAdmin):
    list_display = ("season_number",'episode_title', 'web_series', 'episode_number', 'duration', 'release_date',"episode_image","episode_description")
    list_filter = ('web_series',)
    search_fields = ('episode_title', 'web_series__title')


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'video',"film_industry",'type')
    search_fields = ('title', 'description')

class SubscriptionPlanAdmin(admin.ModelAdmin):
    # Display these fields as columns in the list view
    list_display = ('name', 'price', 'resolution', 'supported_devices', 'screens', 'content', 'extras')
    
    # Allow filtering by these fields
    list_filter = ('resolution', 'supported_devices', 'screens')

    # Add a search bar that searches by name
    search_fields = ('name',)

# Register the model and the customized admin class
admin.site.register(SubscriptionPlan, SubscriptionPlanAdmin)