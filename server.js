// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var moment 	   = require('moment');

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

		customer.id = parseInt(req.body.id);
	   customer.id_shop = parseInt(req.body.id_shop);
	   customer.id_shop_group = parseInt(req.body.id_shop_group);
	   customer.secure_key = (req.body.secure_key ? req.body.secure_key.toString() : null)
	   customer.note = (req.body.note? req.body.note.toString() : null);
	   customer.id_gender = parseInt(req.body.id_gender);
	   customer.id_default_group = parseInt(req.body.id_default_group);
	   customer.id_lang = parseInt(req.body.id_lang);
	   customer.lastname = (req.body.lastname? req.body.lastname.toString() : null);
	   customer.firstname = (req.body.firstname? req.body.firstname.toString() : null);
	   customer.birthday = moment(req.body.birthday);
	   customer.email = (req.body.email? req.body.email.toString() : null);
	   customer.newsletter = Boolean(req.body.newsletter);
	   customer.ip_registration_newsletter = (req.body.ip_registration_newsletter? req.body.ip_registration_newsletter.toString() : null);
	   customer.newsletter_date_add = moment(req.body.newsletter_date_add);
	   customer.optin = Boolean(req.body.optin);
	   customer.website = (req.body.website? req.body.website.toString() : null);
	   customer.company = (req.body.company? req.body.company.toString() : null);
	   customer.siret = (req.body.siret? req.body.siret.toString() : null);
	   customer.ape = (req.body.ape? req.body.ape.toString() : null);
	   customer.outstanding_allow_amount = parseInt(req.body.outstanding_allow_amount);
	   customer.show_public_prices = parseInt(req.body.show_public_prices);
	   customer.id_risk = parseInt(req.body.id_risk);
	   customer.max_payment_days = parseInt(req.body.max_payment_days);
	   customer.passwd = (req.body.passwd? req.body.passwd.toString() : null);
	   customer.last_passwd_gen = moment(req.body.last_passwd_gen);
	   customer.active = parseInt(req.body.active);
	   customer.is_guest = Boolean(req.body.is_guest);
	   customer.deleted = Boolean(req.body.deleted);
	   customer.date_add = moment(req.body.date_add);
	   customer.date_upd = moment(req.body.date_upd);
	   customer.years = moment(req.body.years);
	   customer.days = moment(req.body.days);
	   customer.months = moment(req.body.months);
	   customer.geoloc_id_country = parseInt(req.body.geoloc_id_country);
	   customer.geoloc_id_state = parseInt(req.body.geoloc_id_state);
	   customer.geoloc_postcode = (req.body.geoloc_postcode? req.body.geoloc_postcode.toString() : null);
	   customer.logged = parseInt(req.body.logged);
	   customer.id_guest = parseInt(req.body.id_guest);
	   customer.groupBox = (req.body.groupBox? req.body.groupBox.toString() : null);
	   customer.id_shop_list = parseInt(req.body.id_shop_list);
	   customer.force_id = Boolean(req.body.force_id);
		console.log(customer);
		customer.save(function(err) {
			if (err)
				res.send(req);

			res.json({ message: 'Customer created!', body:  customer});
		});

		
	})

	// get all the customers (accessed at GET http://localhost:8080/api/customers)
	.get(function(req, res) {
		Customer.find(function(err, customer) {
			if (err)
				res.send(err);

			res.json(customer);
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
