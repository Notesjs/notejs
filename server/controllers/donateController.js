const paypal = require('paypal-rest-sdk')
const donateController = {}

donateController.CREATE_PAYMENT = (req, res) => {
  // build PayPal payment request
  const payReq = {
    'intent': 'sale',
    'redirect_urls': {
      'return_url': 'http://localhost:8000/api/donate/thankyou',
      'cancel_url': 'http://localhost:8000/donate'
    },
    'payer': {
      'payment_method': 'paypal'
    },
    'transactions': [{
      'amount': {
        'total': req.query.total,
        'currency': 'USD'
      },
      'description': 'This is the payment transaction description.'
    }]
  }

  paypal.payment.create(payReq, function (error, payment) {
    if (error) {
      console.error(error)
    } else {
      // capture HATEOAS links
      const links = {}
      payment.links.forEach(function (linkObj) {
        links[linkObj.rel] = {
          'href': linkObj.href,
          'method': linkObj.method
        }
      })
      // if redirect url present, redirect user
      // currently sending the link back to front-end
      if (links.hasOwnProperty('approval_url')) {
        res.json({approval_url: links['approval_url'].href})
        // res.redirect(links['approval_url'].href);
      } else {
        console.error('no redirect URI present')
      }
    }
  })
}

// Execute payment after approval
donateController.EXECUTE_PAYMENT = (req, res) => {
  const paymentId = req.query.paymentId
  const payerId = { 'payer_id': req.query.PayerID }

  paypal.payment.execute(paymentId, payerId, function (error, payment) {
    if (error) {
      console.error(error)
    } else {
      if (payment.state === 'approved') {
        console.log('payment completed successfully')
        res.redirect('/donate/thankyou')
      } else {
        res.send('payment not successful')
      }
    }
  })
}

module.exports = donateController
