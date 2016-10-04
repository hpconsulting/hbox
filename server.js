// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var moment 	   = require('moment');
var _ 		   = require('lodash');

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
		var customer = new Customer();		// create a new instance of the customer model
		var collection = _.reject(req.body, function(item){
			return item === null;
		});
		console.log(collection);

		_.forEach(collection, function(entry){
			customer[entry] = entry;
		});

	   // customer.max_payment_days = parseInt(req.body.max_payment_days);
	   // customer.passwd = (req.body.passwd? req.body.passwd.toString() : null);
	   
	   // customer.active = parseInt(req.body.active);
	   // customer.is_guest = Boolean(req.body.is_guest);
	   // customer.deleted = Boolean(req.body.deleted);
	   
	   
	   
	   
	   
	   // customer.geoloc_id_country = parseInt(req.body.geoloc_id_country);
	   // customer.geoloc_id_state = parseInt(req.body.geoloc_id_state);
	   // customer.geoloc_postcode = (req.body.geoloc_postcode? req.body.geoloc_postcode.toString() : null);
	   // customer.logged = parseInt(req.body.logged);
	   // customer.id_guest = parseInt(req.body.id_guest);
	   // customer.groupBox = (req.body.groupBox? req.body.groupBox.toString() : null);
	   // customer.id_shop_list = parseInt(req.body.id_shop_list);
	   // customer.force_id = Boolean(req.body.force_id);
	   console.log(customer);
		customer.save(function(err) {
			if (err)
				res.send('POST: ' + req);

			res.json({ message: 'Customer created!', body:  customer});
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
