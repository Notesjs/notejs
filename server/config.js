const Users = require('./db/db').Users
const bcrypt = require('bcryptjs')

let verifyPassword = (req, res, next) => {
  Users.findOne({
    where: {'email': req.body.email}
  })
  .then((result) => {
    bcrypt.compare(req.body.password, result.password, (err, response) => {
      if (err) {
        res.status(500).send(err)
      } else if (response !== null) {
        next()
      } else {
        res.status(400).send('Invalid email or password')
      }
    })
  })
  .catch((err) => {
    res.status(500).send(err)
  })
}

let createToken = (req, res, next) => {
  // This function adds a token onto the user's session
  req.session.regenerate((err) => {
    if (err) {
      res.status(500).send(err)
    } else {
      req.session.user = {
        'email': req.body.email
      }
      next()
    }
  })
}

let verifyAuth = (req, res, next) => {
  // This function checks to see if a session exists
  if (req.session.user) {
    next()
  } else {
    res.status(400).send('You are not logged in')
  }
}

let destroyToken = (req, res, next) => {
  // This function destroys the user's session
  req.session.destroy(function (err) {
    if (err) {
      res.status(500).send(err)
    } else {
      next()
    }
  })
}

let hashPassword = (req, res, next) => {
  // This function accepts a password and hashes it
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.err(err)
    } else {
      req.body.password = hash
      next()
    }
  })
}

let verifyEmail = (req, res, next) => {
  // This function accepts an email and makes sure it's unique
  Users.findOne({
    where: {'email': req.body.email}
  })
  .then((result) => {
    if (result !== null) {
      res.status(400).send('That email has already been used')
    } else {
      next()
    }
  })
  .catch((err) => {
    res.status(500).send(err)
  })
}

let ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {return next()}
  res.redirect('/signin')
}

module.exports = {
  verifyPassword: verifyPassword,
  createToken: createToken,
  verifyAuth: verifyAuth,
  destroyToken: destroyToken,
  hashPassword: hashPassword,
  verifyEmail: verifyEmail,
  ensureAuthenticated: ensureAuthenticated
}
