const express = require('express');
const router = express.Router();
const model = require('./models/index.js')
const baseUrl = '/accountManagementApi'

// Get user details for a specified user
router.get(`${baseUrl}/getUserDetails`, (req, resp) => {
  (async () => {
    try{
      const user = await model.Users.findAll({
        where: {
          id: req.body.id
        }
      });
      if(user.length > 0){
        resp.status(200).send(user[0])
      } else{
        throw new Error("User not found")
      }
    }catch(error){
      resp.status(400).send(error.message)
    }
  })()
})

// Create a user account
router.post(`${baseUrl}/newAccount`, (req, resp) => {
  (async () => {
    try {
      // Will need to create a function to cycle through the request and validate
      // the fields are filled out correctly and none are null or empty strings otherwise throw an error
      const newUser = await model.Users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        avatarUrl: req.body.avatarUrl,
        email: req.body.email,
        permission: req.body.permission ? req.body.permission : "user",
        verified: req.body.verified ? req.body.verified : true
      })
      resp.status(200).send(newUser.toJSON())
    } catch(error){
      if(error.name === "SequelizeUniqueConstraintError"){
        resp.status(400).send("An account with that email already exists")
      } else {
        resp.status(400).send("Something went wrong, please check the fields you provided and try again")
      }
    }
  })()
})

// Update a user account
router.put(`${baseUrl}/updateAccountDetails`, (req, resp) => {
  (async () => {
    try {
      const user = await model.Users.findAll({
        where: {
          id: req.body.id
        }
      });

      if(user.length > 0){
        await model.Users.update({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          avatarUrl: req.body.avatarUrl,
          email: req.body.email
        }, {
          where: {
            id: req.body.id
          }
        })
        const updatedUser = await model.Users.findAll({
          where: {
            id: req.body.id
          }
        });
        resp.status(200).send(updatedUser[0])
      } else {
        throw new Error("Can not update account, account not found")
      }
    } catch (error) {
      resp.status(400).send(error.message)
    }
  })()

})

// Delete a user account
router.delete(`${baseUrl}/deleteAccount`, (req, resp) => {
  const finishedRequest = (async () => {
    try{
      const user = await model.Users.findAll({
        where: {
          id: req.body.id
        }
      });
      if(user.length > 0){
        const result = await model.Users.destroy({
          where: {
            id: req.body.id
          }
        })
        resp.status(200).send("Account deleted")
      } else {
        throw new Error("Can not delete account, account not found")
      }
    }catch(error){
      console.log(error.message)
      resp.status(400).send(error.message)
    }
  })()
})

// Change password

// Update permission

// Update verified

module.exports = router;
