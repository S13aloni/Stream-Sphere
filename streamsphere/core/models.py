# core/models.py
from django.db import models
from django.utils.text import slugify


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=10, unique=True)
    password = models.CharField(max_length=128)  # Ensure to hash passwords in practice

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    
class Movie(models.Model):
    title = models.CharField(max_length=255)
    genre = models.CharField(max_length=300)
    rating = models.CharField(max_length=50)
    duration = models.CharField(max_length=50)
    quality = models.CharField(max_length=50)
    release_year = models.PositiveIntegerField()
    image = models.ImageField(upload_to='movie_images/')  # Assuming you might use URLs for images
    film_industry=models.CharField(max_length=200)
    description=models.TextField()
    slug = models.SlugField(unique=True, null=True, blank=True) 
    def save(self, *args, **kwargs):
        if not self.slug:  # Generate slug only if it doesn't exist
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


    def __str__(self):
        return self.title

class Video(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    video = models.FileField(upload_to='videos/')  # Use FileField to handle file uploads
    film_industry=models.CharField(max_length=100)
    type=models.CharField(max_length=100)

    def __str__(self):
        return self.title
    
class WebSeries(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    release_year = models.IntegerField()
    genre = models.CharField(max_length=100)
    image = models.ImageField(upload_to='webseries_images/')
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    seasons = models.IntegerField(default=1)
    film_industry = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Episode(models.Model):
    web_series = models.ForeignKey(WebSeries, related_name='episodes', on_delete=models.CASCADE)
    episode_title = models.CharField(max_length=255)
    episode_number = models.IntegerField()
    duration = models.CharField(max_length=8)  # Or use DurationField
    release_date = models.DateField()
    season_number = models.IntegerField()  # New field to indicate season
    episode_image = models.ImageField(upload_to='episode_images/')
    episode_description = models.TextField()

    def __str__(self):
        return f'{self.episode_title} - Episode {self.episode_number}'
    
class SubscriptionPlan(models.Model):
    PLAN_CHOICES = [
        ('Basic', 'Basic'),
        ('Standard', 'Standard'),
        ('Premium', 'Premium'),
    ]

    name = models.CharField(max_length=100, choices=PLAN_CHOICES, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    resolution = models.CharField(max_length=50)
    supported_devices = models.CharField(max_length=255)
    screens = models.CharField(max_length=50)
    content = models.CharField(max_length=255)
    extras = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name