const express = require('express');
const router = express.Router();
const model = require('./models/index.js')
const baseUrl = '/accountManagementApi'

// Get user details for a specified user
router.get(`${baseUrl}/getUserDetails`, (req, resp) => {
  const finishedRequest = (async () => {
    const user = await model.Users.findAll({
      where: {
        id: req.body.id
      }
    });
    return user
  })();

  finishedRequest.then((returnedUser) => {
    resp.status(200).send(returnedUser)
  }).catch((error) => {
    console.log(error)
    resp.status(400).send("Something went wrong, user not found")
  })

})

// Create a user account
router.post(`${baseUrl}/newAccount`, (req, resp) => {
  const finishedRequest = (async () => {
    const newUser = await model.Users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      avatarUrl: req.body.avatarUrl,
      email: req.body.email,
      permission: "user",
      verified: true
    })
    return newUser
  })();

  finishedRequest.then((returnedUser) => {
    resp.status(200).send(returnedUser.toJSON())
  }).catch((error) => {
    console.log(error)
    resp.status(400).send(error)
  })
})

// Update a user account

// Delete a user account

module.exports = router;
