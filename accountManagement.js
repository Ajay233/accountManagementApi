const express = require('express');
const router = express.Router();
const model = require('./models/index.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const baseUrl = '/accountManagementApi'
const validators = require('./validations.js')

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
        user[0].password = ""
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
  let validationResult = validators.userAccountValidation(req);
  if(validationResult === true){
    bcrypt.hash(req.body.password, saltRounds).then((hashedPassword) => {
      (async () => {
        try {
          const newUser = await model.Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword,
            avatarUrl: req.body.avatarUrl,
            email: req.body.email,
            permission: req.body.permission ? req.body.permission : "user",
            verified: req.body.verified ? req.body.verified : true
          })
          newUser.password = ""
          resp.status(200).send(newUser)
        } catch(error){
          if(error.name === "SequelizeUniqueConstraintError"){
            resp.status(400).send("An account with that email already exists")
          } else {
            console.log(error)
            resp.status(400).send("Something went wrong, please check the fields you provided and try again")
          }
        }
      })()
    })
  } else {
    resp.status(400).send(validationResult)
  }
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
        updatedUser[0].password = ""
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

// Sign In
router.post(`${baseUrl}/signIn`, (req, resp) => {
  let validationResult = validators.signUpValidation(req)
  if(validationResult === true){
    (async () => {
      const user = await model.Users.findAll({
        where: {
          email: req.body.email
        }
      });

      if(user.length > 0){
        bcrypt.compare(req.body.password, user[0].password).then((result) => {
          if(result === true){
            user[0].password = ""
            resp.status(200).send(user[0])
          } else {
            resp.status(400).send("Password does not match")
          }
        })
      } else {
        resp.status(400).send("No account found matching the supplied email")
      }
    })()
  } else {
    resp.status(400).send(validationResult)
  }
})

// Change password
router.put(`${baseUrl}/changePassword`, (req, resp) => {
  // validate fields
  let validationResult = validators.changePassword(req);
  if(validationResult === true){
    (async () => {
      // find user by id, send bad resposne if not found
      const user = await model.Users.findAll({
        where: {
          id: req.body.id
        }
      })

      if(user.length > 0){
        // compare current password to password in db, send bad resposne if no match
        bcrypt.compare(req.body.currentPassword, user[0].password).then((result) => {
          if(result === true){
            // bcrypt the new password
            bcrypt.hash(req.body.newPassword, saltRounds).then((hashedPassword) => {
              user[0].password = hashedPassword;
              (async () => {
                await user[0].save({ fields: ['password'] })
                await user[0].reload();
              })().then(() => {
                resp.status(200).send("Password changed")
              }).catch((error) => {
                console.log(error)
              })
            });
          } else {
            resp.status(400).send("Invalid current password provided")
          }
        })
      } else {
        resp.status(400).send("Can not update password, account not found")
      }
    })()
  } else {
    resp.status(400).send(validationResult)
  }
})

// Update permission
router.put(`${baseUrl}/setPermission`, (req, resp) => {
  let validationResult = validators.setPermission(req)
  if(validationResult === true){
    (async () => {
      const user = await model.Users.findAll({
        where: {
          id: req.body.id
        }
      })

      if(user.length > 0){
        user[0].permission = req.body.permission;
        (async () => {
          await user[0].save({ fields: ['permission'] })
          await user[0].reload();
          user[0].password = ""
        })().then(() => {
          resp.status(200).send(user[0])
        }).catch((error) => {
          resp.status(400).send(error)
        })
      } else {
        resp.status(400).send("Can not update permission, account not found")
      }
    })()
  } else {
    resp.status(400).send(validationResult)
  }
})

// Update verified
router.put(`${baseUrl}/setVerified`, (req, resp) => {
  let validationResult = validators.setVerified(req)
  if(validationResult === true){
    (async () => {
      const user = await model.Users.findAll({
        where: {
          id: req.body.id
        }
      })

      if(user.length > 0){
        user[0].verified = req.body.verified;
        (async () => {
          await user[0].save({ fields: ['verified'] })
          await user[0].reload()
          user[0].password = ""
        })().then(() => {
          resp.status(200).send(user[0])
        }).catch((error) => {
          resp.status(400).send(error)
        })
      } else {
        resp.status(400).send("Can not update verified status, account not found")
      }
    })()
  } else {
    resp.status(400).send(validationResult)
  }
})

module.exports = router;
