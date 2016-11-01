const Router = require('express').Router()
const folders = require('./folderRouter')
const users = require('./userRouter')
const notes = require('./noteRouter')
const github = require('./githubRouter')
const donate = require('./donateRouter')

Router.use('/folders', folders)
Router.use('/users', users)
Router.use('/notes', notes)
Router.use('/github', github)
Router.use('/donate', donate)

module.exports = Router
