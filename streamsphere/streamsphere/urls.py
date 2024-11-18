# streamsphere/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),  # Include your app's URLs
    path('', include('core.urls')),
]
