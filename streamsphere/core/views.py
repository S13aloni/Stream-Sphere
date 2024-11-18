# core/views.py
from rest_framework.response import Response
from rest_framework import status,permissions
from rest_framework.decorators import api_view
from .models import Customer,Movie,Video,WebSeries,SubscriptionPlan,Episode
from .serializers import CustomerSerializer,MovieSerializer,VideoSerializer,WebSeriesSerializer,SubscriptionPlanSerializer,EpisodeSerializer
from django.views.decorators.csrf import csrf_exempt
from core.models import Customer
from django.http import JsonResponse
import json
from django.contrib.auth import authenticate
# from django.contrib.auth.models import User
from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
# from rest_framework import viewsets
# from django.http import HttpResponse
from django.db.models import Q
# from django.shortcuts import get_object_or_404
# from django.core.exceptions import ObjectDoesNotExist
# from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated

# from django.views.decorators.csrf import csrf_exempt



@api_view(['POST'])
def signup(request):
    serializer = CustomerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def verify_user_email(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')

            print(f"Received email: {email}")

            if email and Customer.objects.filter(email=email).exists():
                return JsonResponse({'message': 'Email exists', 'status': 'success'})
            else:
                return JsonResponse({'message': 'Email not found', 'status': 'fail'}, status=404)
        except Exception as e:
            return JsonResponse({'error': 'Something went wrong', 'details': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def verify_password(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            user = authenticate(username=email, password=password)

            if user is not None:
                return JsonResponse({'message': 'Authentication successful', 'status': 'success'})
            else:
                return JsonResponse({'message': 'Invalid email or password', 'status': 'fail'}, status=401)
        except Exception as e:
            return JsonResponse({'error': 'Something went wrong', 'details': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Customer
from .serializers import CustomerSerializer

class CustomerDetailView(APIView):
    def get(self, request):
        email = request.query_params.get('email')  # Get the email from query parameters
        try:
            customer = Customer.objects.filter(email=email).first()
            if customer:
                serializer = CustomerSerializer(customer)
                return Response(serializer.data)
            else:
                return Response({'error': 'Customer not found.'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)



        
# @api_view(['GET'])
# def get_user_by_email(request):
#     email = request.GET.get('email')
#     if not email:
#         return JsonResponse({'error': 'Email is required'}, status=400)

#     try:
#         customers = Customer.objects.filter(email=email)
#         if customers.exists():
#             customer = customers.first()
#             print(customer.__dict__)
#             serializer = CustomerSerializer(customer)
#             return JsonResponse(serializer.data, safe=False)
#         else:
#             return JsonResponse({'error': 'Customer not found'}, status=404)
#     except Exception as e:
#         print(f"Error in get_user_by_email: {e}")
#         return JsonResponse({'error': str(e)}, status=500)



class MovieDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


@csrf_exempt
def search(request):
    query = request.GET.get('query', '')
    if not query:
        return JsonResponse([], safe=False)

    # Check if the query is a year
    if query.isdigit() and len(query) == 4:  # Assuming a 4-digit year
        movies = Movie.objects.filter(release_year=query)
        web_series = WebSeries.objects.filter(release_year=query)
    elif query.lower() == 'bollywood':  # Special case for Bollywood
        movies = Movie.objects.filter(film_industry__iexact='Bollywood')
        web_series = WebSeries.objects.filter(film_industry__iexact='Bollywood')
    elif query.lower() == 'hollywood':  # Special case for Bollywood
        movies = Movie.objects.filter(film_industry__iexact='Hollywood')
        web_series = WebSeries.objects.filter(film_industry__iexact='Hollywood')
    else:
        # Search by title, genre, or film industry
        movies = Movie.objects.filter(Q(title__icontains=query) | Q(genre__icontains=query) | Q(film_industry__icontains=query))
        web_series = WebSeries.objects.filter(Q(title__icontains=query) | Q(genre__icontains=query) | Q(film_industry__icontains=query))

    # Combine movie and web series results into one list
    results = list(movies.values('id', 'title', 'rating', 'genre', 'image', 'release_year', 'film_industry')) + \
              list(web_series.values('id', 'title', 'rating', 'genre', 'image', 'release_year', 'film_industry'))

    return JsonResponse(results, safe=False)



def movie_details(request, slug):
    try:
        movie = Movie.objects.get(slug=slug)
        data = {
            "title": movie.title,
            "image": movie.image.url,
            "rating": movie.rating,
            "genre": movie.genre,
            "quality": movie.quality,
            "release_year": movie.release_year,
            "description":movie.description,
        }
        return JsonResponse(data)
    except Movie.DoesNotExist:
        return JsonResponse({"error": "Movie not found"}, status=404)
    
# @api_view(['GET'])
# def movie_details(request, slug):
#     # Fetch movie by slug
#     movie = get_object_or_404(Movie, slug=slug)
#     serializer = MovieSerializer(movie)
#     return Response(serializer.data)
    
class MovieListView(generics.ListCreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class VideoListView(APIView):
    def get(self, request, format=None):
        videos = Video.objects.all()
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)

# def get_user_by_email(request):
#     email = request.GET.get('email')
#     if not email:
#         return JsonResponse({'error': 'Email is required'}, status=400)

#     try:
#         user = User.objects.get(email=email)
#         serializer = UserSerializer(user)
#         return JsonResponse(serializer.data, safe=False)
#     except User.DoesNotExist:
#         return JsonResponse({'error': 'User not found'}, status=404)
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=500)

# class WebSeriesViewSet(viewsets.ModelViewSet):
#     queryset = WebSeries.objects.all()
#     serializer_class = WebSeriesSerializer

# class WebSeriesDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = WebSeries.objects.all()
#     serializer_class = WebSeriesSerializer

class WebSeriesListView(generics.ListCreateAPIView):
    queryset = WebSeries.objects.all()
    serializer_class = WebSeriesSerializer

class WebSeriesDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = WebSeries.objects.all()
    serializer_class = WebSeriesSerializer

# Example Django view that retrieves web series based on slug
def webseries_detail(request, slug):
    try:
        web_series = WebSeries.objects.get(slug=slug)
        data = {
            'title': web_series.title,
            'description': web_series.description,
            'genre': web_series.genre,
            'seasons': web_series.seasons,
            'image': web_series.image.url,  # Assuming `image` is an ImageField
        }
        return JsonResponse(data)
    except WebSeries.DoesNotExist:
        return JsonResponse({'error': 'Web series not found'}, status=404)

@api_view(['GET'])
def get_webseries_episodes(request, slug):
    try:
        webseries = WebSeries.objects.get(slug=slug)
        # Change webseries to web_series to match your Episode model's field
        episodes = Episode.objects.filter(web_series=webseries)
        serialized_episodes = EpisodeSerializer(episodes, many=True)
        return Response(serialized_episodes.data)
    except WebSeries.DoesNotExist:
        return Response({'error': 'Web series not found'}, status=404)
    
class SubscriptionPlanListCreateView(generics.ListCreateAPIView):
    queryset = SubscriptionPlan.objects.all()
    serializer_class = SubscriptionPlanSerializer

class LatestMoviesView(APIView):
    def get(self, request):
        # Fetch the latest three movies based on release_year
        latest_movies = Movie.objects.order_by('release_year')[:3]
        serializer = MovieSerializer(latest_movies, many=True)
        return Response(serializer.data)
    

from django.http import JsonResponse
from .models import Customer
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def update_customer_email(request):
    if request.method == 'PUT':
        data = json.loads(request.body)
        current_email = data.get('current_email')
        new_email = data.get('new_email')

        try:
            customer = Customer.objects.get(email=current_email)
            customer.email = new_email
            customer.save()
            return JsonResponse({'message': 'Email updated successfully'})
        except Customer.DoesNotExist:
            return JsonResponse({'error': 'Customer not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from .models import Customer  # Ensure to import your Customer model

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Customer

@api_view(['PUT'])
def update_mobile(request):
    if request.method == 'PUT':
        email = request.data.get('email')
        new_mobile = request.data.get('new_mobile')

        try:
            customer = Customer.objects.get(email=email)
            customer.mobile = new_mobile
            customer.save()
            return Response({'message': 'Mobile number updated successfully!'}, status=status.HTTP_200_OK)
        except Customer.DoesNotExist:
            return Response({'error': 'Customer not found!'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['PUT'])
def update_password(request):
    if request.method == 'PUT':
        email = request.data.get('email')
        new_password = request.data.get('new_password')

        try:
            customer = Customer.objects.get(email=email)
            customer.password = new_password
            customer.save()
            return Response({'message': 'Password updated successfully!'}, status=status.HTTP_200_OK)
        except Customer.DoesNotExist:
            return Response({'error': 'Customer not found!'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from core.models import Movie
from core.serializers import MovieSerializer

@api_view(['POST'])
def add_movie(request):
    if request.method == 'POST':
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save the movie data to the database
            return Response({'message': 'Movie added successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import WebSeries, Episode
from django.utils.text import slugify
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import WebSeries, Episode
from django.utils.text import slugify

@csrf_exempt
def add_webseries(request):
    if request.method == 'POST':
        series_title = request.POST.get('title')  # Updated key
        genre = request.POST.get('genre')
        rating = request.POST.get('rating')
        seasons = request.POST.get('seasons')
        release_year = request.POST.get('release_year')  # Updated key
        description = request.POST.get('description')
        image = request.FILES.get('image')

        try:
            # Create WebSeries object
            web_series = WebSeries.objects.create(
                title=series_title,
                genre=genre,
                rating=rating,
                seasons=int(seasons),  # Ensure this is an integer
                release_year=int(release_year),  # Ensure this is an integer
                description=description,
                image=image,
                slug=slugify(series_title)
            )

            # Save episodes
            for i in range(len(request.POST.getlist('episodes[0][episodeTitle]'))):
                episode_title = request.POST.get(f'episodes[{i}][episodeTitle]')
                episode_number = request.POST.get(f'episodes[{i}][episodeNumber]')
                duration = request.POST.get(f'episodes[{i}][duration]')
                season_number = request.POST.get(f'episodes[{i}][seasonNumber]')
                release_date = request.POST.get(f'episodes[{i}][releaseDate]')
                episode_description = request.POST.get(f'episodes[{i}][episodeDescription]')
                episode_image = request.FILES.get(f'episodes[{i}][episodeImage]')

                # Create Episode object and link to web_series
                Episode.objects.create(
                    web_series=web_series,
                    episode_title=episode_title,
                    episode_number=int(episode_number),  # Ensure this is an integer
                    duration=duration,
                    season_number=int(season_number),  # Ensure this is an integer
                    release_date=release_date,
                    episode_description=episode_description,
                    episode_image=episode_image,
                )

            return JsonResponse({'message': 'Web Series added successfully!'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)
