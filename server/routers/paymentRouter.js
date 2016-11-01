const paymentRouter = require('express').Router()
const clientTokenGET = require('../controllers/paymentController').clientTokenGET
const transactionPost = require('../controllers/paymentController').transactionPost

paymentRouter.get("/client_token", clientTokenGET);
paymentRouter.post("/nonce", transactionPost);

module.exports = paymentRouter
