from django.urls import path

from . import views

urlpatterns = [
    path('twitter/', views.SearchTweets.as_view(), name='twitter_search')
]
