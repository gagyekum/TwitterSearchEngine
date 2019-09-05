import os
import json

import pytest
import twitter
from unittest import mock
from django.conf import settings
from django.urls import reverse
from django.core.cache import cache
from rest_framework import status
from rest_framework.test import APIClient
from engine.views import transform_search_results

TWITTER_TEMPLATE_FILENAME = os.path.join(settings.BASE_DIR, 'tests/tweets.json')
SEARCH_URL = reverse('twitter_search')


class TestSearchTweets(object):

    @pytest.fixture(autouse=True)
    def setup_method(self):
        self.client = APIClient()

        with open(TWITTER_TEMPLATE_FILENAME) as data:
            self.tweets = json.loads(data.read())

    def _get_response(self, search_term='some_term'):
        return self.client.get(SEARCH_URL, {'search': search_term})

    @mock.patch.object(twitter.Api, 'GetSearch')
    def test_search_term(self, mock_get_search):
        mock_get_search.return_value = self.tweets
        response = self._get_response()
        assert response.status_code == status.HTTP_200_OK

    def test_empty_search_term(self):
        response = self._get_response('')
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    @mock.patch.object(twitter.Api, 'GetSearch')
    def test_search_engine_cache(self, mock_get_search):
        mock_get_search.return_value = self.tweets

        search_term = 'anita'
        response = self._get_response(search_term)

        assert response.status_code == status.HTTP_200_OK
        assert cache.get(search_term)

    @mock.patch.object(twitter.Api, 'GetSearch')
    def test_search_engine_throttle(self, mock_get_search):
        mock_get_search.return_value = self.tweets

        response = None

        for _ in range(31):
            response = self._get_response()

        assert response.status_code == status.HTTP_429_TOO_MANY_REQUESTS

    def test_search_results_tranformation(self):
        transformed_results = transform_search_results(self.tweets)

        assert transformed_results
        assert transformed_results.get('tweets')
        assert transformed_results.get('hashtags')
        assert len(transformed_results.get('hashtags')) <= 10
        assert transformed_results.get('count')
        assert transformed_results.get('completed_in')
        assert transformed_results.get('next')
