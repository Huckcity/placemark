# Placemark V4.0

Placemark v4.0 represents the "outstanding" implementation of the Placemark application requirements. These include:

1. Admin dashboard with analytics
1. User uploadable profile images
1. JWT API authentication
1. Heroku deployment with Digital Ocean image storage
1. Master/dev/feature branches used for development process streamlining

---

To run locally, simply clone the repo and install as follows:

```
git clone https://github.com/Huckcity/placemark.git
cd placemark
npm i
```

You will then need to set up the environment variables to set port number and database config.

**_.env_**

```
ENVIRONMENT = development_json || development_mongo || production
PORT = e.g. 3000
MONGO_LOCAL_URL = e.g. mongodb://localhost:27017/placemark
MONGO_LIVE_URL = <you can ignore this unless deploying>
SEED= true || false
JWT_SECRET = <somesecretseed>
DO_ACCESS_KEY_ID = <Digital Ocean Space Key>
DO_SECRET_ACCESS_KEY = <Digital Ocean Space Access Secret>
```

**`development_json`** will use LowDB, **`development_mongo`** will use your local install of MongoDB which must be running. **`production`** will force the app to use the **`MONGO_LIVE_URL`** value, so this can be ignored locally.

Setting the **`SEED`** var to true will seed the database with the data in the _./models/mongo/seed-data.js_ file.

If left true, this will occur on each restart, so it is recommended to set this to false after initial run, unless a data reset is needed. Running the test suite will use a separate set of data, so you will need to reseed after testing.

---

## Test Users

For testing purposes, the seeded data contains several users as follows:

| Username | Password | Role  |
| -------- | :------: | :---- |
| adamg    |   test   | Admin |
| janedoe  |   test   | User  |
| johndoe  |   test   | User  |
