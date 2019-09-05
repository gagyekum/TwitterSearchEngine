import logging
import uuid

import twitter
from django.core.cache import cache
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from rest_framework import exceptions, status

api = twitter.Api(consumer_key=settings.TWITTER_CONSUMER_KEY,
                  consumer_secret=settings.TWITTER_CONSUMER_SECRET,
                  access_token_key=settings.TWITTER_ACCESS_TOKEN_KEY,
                  access_token_secret=settings.TWITTER_ACCESS_TOKEN_SECRET)


log = logging.getLogger(__name__)


def transform_search_results(search_results):
    search_metadata = search_results.get('search_metadata', {})
    results = {
        'tweets': [],
        'hashtags': [],
        'count': search_metadata.get('count', 0),
        'completed_in': search_metadata.get('completed_in', '0.000'),
        'next': search_metadata.get('next_results', ''),
    }

    statuses = search_results.get('statuses')

    tweets = []
    hashtags = {}

    for tweet_status in statuses:
        user = tweet_status.get('user', {})
        entities = tweet_status.get('entities', {})

        tweets.append({
            'id': uuid.uuid4().hex,
            'text': tweet_status.get('text', 'No text available for this tweet'),
            'name': user.get('name', 'Default User'),
            'avatar': user.get('profile_image_url', ''),
            'retweets': tweet_status.get('retweet_count', 0),
            'favorites': tweet_status.get('favorite_count', 0),
        })

        trends = entities.get('hashtags', [])

        for trend in trends:
            key = trend.get('text', 'default')
            hashtags[key] = hashtags.get(key, 0) + 1

    results['tweets'] = tweets
    results['count'] = len(tweets)
    results['hashtags'] = list(map(lambda x: {'id': uuid.uuid4().hex, 'name': x[0], 'count': x[1]},
                                   sorted(hashtags.items(), key=lambda x: x[1], reverse=True)))[:10]

    return results


class SearchTweets(APIView):

    def get(self, request):
        search_term = request.query_params.get('search', '').lower().strip()

        if search_term == '':
            raise exceptions.ValidationError(detail='Invalid search term', code=status.HTTP_400_BAD_REQUEST)

        cache_key = search_term.replace(' ', '_')
        payload = cache.get(cache_key, None)

        if not payload:
            try:
                results = api.GetSearch(term=search_term, count=settings.TWITTER_SEARCH_RESULTS_COUNT,
                                        return_json=True)
                if results:
                    payload = transform_search_results(results)
            except Exception as e:
                log.exception('Something went wrong while collecting data from twitter')
                raise exceptions.APIException(detail=str(e), code=status.HTTP_500_INTERNAL_SERVER_ERROR)

            if payload:
                cache.set(cache_key, payload)

        return Response(data=payload, content_type='json')
