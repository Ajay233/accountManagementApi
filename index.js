const app = require('express')();
const http = require('http').Server(app);
const port = process.env.PORT || 8090;
const accountManagement = require('./accountManagement.js')

app.use(accountManagement)

http.listen(port, () => {
  console.log("App started on port 8090");
})
