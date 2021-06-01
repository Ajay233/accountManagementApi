# Account Management API

This API has been created to provide a way to reuse a single account across multiple apps.  Account management and login features are common among all of my apps; however, by having these implemented individually for each app, users will have to create a new account for each app they want to try out.  To simplify this and to speed up development of future apps I have created this API to provide the functionality to create and manage accounts as well as login and retrieve user details via this API.

## Prerequisites Running the API

You need to have the following installed:
- Node
- Docker

## Running the API

1. Clone the repo
2. Run `npm install` to install all required dependencies
3. Open the app in a code editor and create the following file in the root of the project `.env`
4. Open the `.env` file and add the following environment variables:
      - `ROOT = 'YOUR ROOT PASSWORD HERE'`
      - `USERNAME = 'YOUR DB USERNAME HERE'`
      - `PASSWORD = 'YOUR DB PASSWORD HERE'`

These should be the credentials you want to use once the DB is created.

5. Run `docker-compose up -d` to start up the DB
6. Run `npm run dev` to run the database migrations and start development the server. 

When you want to close the app down:
- Press `ctrl` + `c` to stop the server
- Run `docker-compose down` to stop the mysql DB container
