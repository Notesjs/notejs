const githubRouter = require('express').Router()
const passport = require('passport')
const Middleware = require('../config')

githubRouter.route('/auth/github')
  .get(passport.authenticate('github', { scope: 'email'}), function(req, res) {})

module.exports = githubRouter
