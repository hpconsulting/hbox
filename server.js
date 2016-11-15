// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var moment 	   = require('moment');
var _ 		   = require('lodash');
var unirest    = require('unirest');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port
var mongobase = 'mongodb://localhost/happit';

var mongoose   = require('mongoose');
mongoose.connect(mongobase); // connect to our database
var Customer     = require('./app/models/customer');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we\'re connected!')
});

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /customers
// ----------------------------------------------------
router.route('/customers')

	// create a customer (accessed at POST http://localhost:8080/customers)
	.post(function(req, res) {
		var collection = req.body;
		var customer = new Customer(collection);		// create a new instance of the customer model
	   console.log('customer');
	   console.log(customer);
		customer.save(function(err) {
			if (err) {
				res.send('POST: ' + req);
			}

			var pipe = '|';
			var codeMag = 'WEB';
			var gender = "MONSIEUR";
			var adresse1 = '';
			var adresse2 = '';
			var codepostal = '';
			var ville = '';
			var pays = '';
			var telephone = '';
			var portable = '';
			var cartedefidelite = '';
			var remise = '';
			var provenance = 'PRESTASHOP';
			var observations = '';
			var miseEnCompte = '';
			var famille = '';
			var urlTo = 'http://zahav.fastmag.fr/ediwebsrv.ips';



			var enseigne = "DEMO";
			var magasin = "CENTRAL";
			var compte = "TEST";
			var motpasse = "test123321";

			if(collection.gender > 0) {
				gender = "MADAME";
			}
			var fastmagRequestWS = 
				'CLIENT'+ 
				pipe + 
				codeMag + 
				pipe + 
				collection.email + 
				pipe + 
				collection.lastname + 
				pipe + 
				collection.firstname + 
				pipe + 
				gender +
				pipe +
				adresse1 +
				pipe +
				adresse2 +
				pipe +
				codepostal +
				pipe +
				ville +
				pipe +
				pays +
				pipe +
				telephone +
				pipe +
				portable +
				pipe +
				collection.days +
				pipe +
				collection.months +
				pipe + 
				cartedefidelite +
				pipe +
				remise +
				pipe +
				provenance +
				pipe +
				observations +
				pipe +
				collection.passwd +
				pipe +
				collection.company +
				pipe +
				collection.id +
				pipe +
				miseEnCompte +
				pipe +
				famille +
				pipe +
				collection.years

			res.json({ message: fastmagRequestWS, body:  collection });

			// unirest.post(urlTo)
			// 	.send({ "enseigne": enseigne, "magasin": magasin, "compte": compte, "motpasse": motpasse, "data" : fastmagRequestWS  })
			// 	.end(function (response) {
			// 	  console.log(response.body);
			// 	});
			
		});

		
	});

// on routes that end in /customers/:customer_id
// ----------------------------------------------------
router.route('/customers/:customer_id')

	// get the customer with that id
	.get(function(req, res) {
		Customer.findById(req.params.customer_id, function(err, customer) {
			if (err)
				res.send(err);
			res.json(customer);
		});
	})

	// update the customer with this id
	.put(function(req, res) {
		Customer.findById(req.params.customer_id, function(err, customer) {

			if (err)
				res.send(err);

			customer = req.body;
			customer.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Customer updated!' });
			});

		});
	})

	// delete the customer with this id
	.delete(function(req, res) {
		Customer.remove({
			_id: req.params.customer_id
		}, function(err, customer) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
