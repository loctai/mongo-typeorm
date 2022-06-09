This application was created for learning purposes.

This is a simple NodeJS API to store some information about patients and their medical conditions.

Built with: ExpressJS(https://expressjs.com/), typeORM(https://typeorm.io/) and MongoDB(https://www.mongodb.com/)

To use this API run the app: https://github.com/rianperassoli/medical-history-app

## Get started

Firstly duplicate the file .env.example and rename the copy for .env on the root project. 
At .env change the MONGO_DB_URL for your MongoDB database or keep the same value for use the public database.

To run the api at localhost go to app folder and install the dependencies with...

```bash
yarn

or

npm install
```

...and start the api using

```bash
yarn start

or

npm run start
```

To make requests from API use: http://localhost:3000 

To run the unit tests execute

```bash
yarn test

or

npm run test
```