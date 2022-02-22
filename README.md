# Placemark V2.0

Placemark v2.0 represents the "good" implementation of the Placemark application requirements. These include:

1. Cookie authentication + user settings
1. Places now hold description and lat/lng values
1. Unit tests for users/places models as well as all API endpoints
1. JSON (and MongoDB) database implemented, including flow control for testing against each environment
1. (Skipped) Glitch deployment, already on Heroku
1. Updated README with setup instructions

To run locally, simply clone the repo and install as follows:

```
git clone https://github.com/Huckcity/placemark.git
cd placemark
npm i
```

You will then need to set up the environment variables to set port number and database config.

**_.env_**

```
ENVIRONMENT= development_json || development_mongo || production
PORT= e.g. 3000
MONGO_LOCAL_URL= e.g. mongodb://localhost:27017/placemark
MONGO_LIVE_URL= <you can ignore this unless deploying>
SEED= true || false
```

**`development_json`** will use LowDB, **`development_mongo`** will use your local install of MongoDB which must be running. **`production`** will force the app to use the **`MONGO_LIVE_URL`** value, so this can be ignored locally.

Setting the **`SEED`** var to true will seed the database with the data in the _./models/mongo/seed-data.js_ file.

If left true, this will occur on each restart, so it is recommended to set this to false after initial run, unless a data reset is needed. Running the test suite will use a separate set of data, so you will need to reseed after testing.
