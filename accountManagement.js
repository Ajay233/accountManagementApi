const express = require('express');
const router = express.Router();

const baseUrl = '/accountManagementApi'

router.get(`${baseUrl}/getUserDetails`, (req, resp) => {
  console.log('GET request recieved');
  resp.status(200).send({
    test: "API up and running"
  })
})

module.exports = router;
