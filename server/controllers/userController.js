const User = require('../models/user')
const userController = {}

// Sign in user
userController.SIGNIN = (req, res) => {
  res.status(200).json({
    message: 'Successfully signed in user.',
    user: req.body,
    session: req.session
  })
}

// Create a new user
userController.SIGNUP = (req, res) => {
  console.log("This is req.body", req.body)
  User.register(req.body)
    .then((user) => {
      res.status(200).send(user)
    })
}

userController.DELETE = (req, res) => {
  const userId = req.body.userId
  User.deleteUser(userId)
  .then(() => {
    res.status(200).json({
      message: 'Deleted User'
    })
  })
}

// logout user
userController.LOGOUT = (req, res) => {
  res.status(200).json({
    message: 'Successfully logged out user.'
  })
}

module.exports = userController
