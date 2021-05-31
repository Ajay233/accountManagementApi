require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": "accountManagement",
    "host": "127.0.0.1",
    "port": "32801",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": "accountManagementTests",
    "host": "127.0.0.1",
    "port": "32802",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.PROD_DB_USERNAME,
    "password": process.env.PROD_DB_PASSWORD,
    "database": process.env.PROD_DB_NAME,
    "host": process.env.PROD_DB_HOST,
    "port": process.env.PROD_DB_PORT,
    "dialect": "mysql"
  }
}
