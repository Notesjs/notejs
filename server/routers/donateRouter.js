require('dotenv').config()
const paypal = require('paypal-rest-sdk')
const donateRouter = require('express').Router()
const donateController = require('../controllers/donateController')

paypal.configure({
  'mode': 'sandbox',
  'client_id': process.env.paypal_clientId,
  'client_secret': process.env.paypal_secret
})

donateRouter.route('/create')
  .get(donateController.CREATE_PAYMENT)

donateRouter.route('/thankyou')
  .get(donateController.EXECUTE_PAYMENT)

module.exports = donateRouter
