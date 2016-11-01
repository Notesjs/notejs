var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "5y7ghqjfj89tz6tr",
  publicKey: "gfkktsgm7ymwghkt",
  privateKey: "3e41a48407b49d27024ac1a81e25a52d"
});

const clientTokenGET = function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
};

const transactionPost = function (req, res) {
  var nonceFromTheClient = req.body.payload.nonce;
  var amount = req.body.amount;
  console.log(amount,"this is amount on the backend")
  gateway.transaction.sale({
  amount: amount,
  paymentMethodNonce: `${nonceFromTheClient}`,
  options: {
    submitForSettlement: true
  }
}, function (err, result) {
	if (result) res.send(result);
	if (err) console.log("error eith the transaction post");
});
};

module.exports = {
	clientTokenGET: clientTokenGET,
	transactionPost: transactionPost,
}