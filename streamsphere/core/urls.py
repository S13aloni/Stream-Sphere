# core/urls.py
from django.urls import path
from .views import signup,verify_user_email,verify_password,MovieListView,MovieDetailView,VideoListView,search,movie_details,CustomerDetailView,WebSeriesListView,WebSeriesDetailView,webseries_detail,SubscriptionPlanListCreateView,get_webseries_episodes,LatestMoviesView,update_customer_email,update_mobile,update_password,add_movie,add_webseries
from django.contrib import admin

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('signup/', signup, name='signup'),
    path('api/verify-email/', verify_user_email, name='verify-email'),
    path('api/verify-password/', verify_password, name='verify-password'),
    
    path('api/customer/detail/', CustomerDetailView.as_view(), name='customer-detail'),

    path('api/search/', search, name='search'),
    path('api/movies/', MovieListView.as_view(), name='movies'),
    path('api/movies/<int:pk>/', MovieDetailView.as_view(), name='movie-detail'),
    path('api/videos/', VideoListView.as_view(), name='video-list'),
    path('api/movies/<slug:slug>/', movie_details, name='movie_details'),
    path('api/webseries/', WebSeriesListView.as_view(), name='webseries-list'),
    path('api/webseries/<int:pk>/', WebSeriesDetailView.as_view(), name='webseries-detail'),    
    path('api/webseries/<slug:slug>/', webseries_detail, name='webseries_details'),
    path('api/subscription-plans/', SubscriptionPlanListCreateView.as_view(), name='subscription-plan-list'),
    path('api/webseries/<slug:slug>/episodes/', get_webseries_episodes, name='webseries-episodes'),
    path('api/latest-movies/', LatestMoviesView.as_view(), name='latest-movies'),

    path('api/customer/update/', update_customer_email),
    path('api/customer/update/mobile/', update_mobile, name='update_mobile'),
    path('api/customer/update/password/', update_password, name='update_password'),

    path('api/add-movie/', add_movie, name='add-movie'),
    path('api/add-webseries/', add_webseries, name='add-webseries'),



    # path('api/movies/<slug:slug>/', movie_details, name='movie-details'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
if settings.DEBUG:  # Only for development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)