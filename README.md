# TwitterSearchEngine
A simple search engine built on top of Twitter standard API build with Python Django + Django Rest Framework

# Installation
1. Open the project (root folder: TwitterSearchEngine) using PyCharm or VSCode
2. Open terminal and run `source venv/bin/activate`
3. Run `pip install -r requirements.txt`
4. create a file with name .env on the root of the project and replace its content with this: <br />
   SECRET_KEY=<secret_key>
   TWITTER_API_KEY=<twitter_api_key>
   TWITTER_API_SECRET=<twitter_api_secret>
   TWITTER_ACCESS_TOKEN=<twitter_access_token_key>
   TWITTER_ACCESS_TOKEN_SECRET=<twitter_access_token_secret>
5. Run `python manage.py runserver`
6. Run `cd frontend` and run `yarn start`

