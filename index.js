const http = require('./app.js')
const port = process.env.PORT || 8090;

http.listen(port, () => {
  console.log("App started on port 8090");
})
