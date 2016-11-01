const Router = require('express').Router()
const folders = require('./folderRouter')
const users = require('./userRouter')
const notes = require('./noteRouter')
const payments = require('./paymentRouter')

Router.use('/folders', folders)
Router.use('/users', users)
Router.use('/notes', notes)
Router.use('/payments', payments)

module.exports = Router
