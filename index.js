const http = require('./app.js')
const port = process.env.PORT || 8090;
const migrationRunner = require('./utils/migrationRunner.js')

migrationRunner.migrate().then(() => {
  http.listen(port, () => {
    console.log("App started on port 8090");
  })
})
