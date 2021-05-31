const express = require('express')
const app = express();
const http = require('http').Server(app);
const accountManagement = require('./accountManagement.js')

app.use(express.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use(accountManagement)

module.exports = http
