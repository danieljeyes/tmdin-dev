/**
 * PaymentController
 *
 * @description :: Server-side logic for managing payments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var braintree = require("braintree");

 var gateway = braintree.connect({
 	environment: braintree.Environment.Sandbox,
 	merchantId: "8czy99w4xgc556jj",
 	publicKey: "4gqkfjd2gnbnn7p2",
 	privateKey: "aa6020e62e47807daba445e7158542f3"
 });

module.exports = {

	clientToken: function (req, res) {

		gateway.clientToken.generate({}, function (err, response) {
    res.json({clientToken: response.clientToken});

  });
},

	checkout: function (req, res) {

		var nonce = req.body.payment_method_nonce;
		console.log(req.body);

		gateway.transaction.sale({
			amount: '10.00',
			paymentMethodNonce: nonce,
		}, function (err, result) {
			// sucess lets redirect the customer to the purchase page
			// to do later
			console.log(result);
			res.view('/');

		});

	},

	paymentGatewayTransaction: function (req, res) {


	},


};
