var express = require('express');
var path = require('path');
var pg = require('pg');

var connection = require('../modules/connection');
var router = express.Router();


router.post('/', function(req, res){
	console.log("In applicationForm route");
  	console.log('req.body: ', req.body);
  	pg.connect(connection, function (err, client, done) {

		////// admin emails link --> auth signer needs to fill out ENTIRE form top to bottom
		var insertUser = client.query( 'INSERT INTO users ( email, password, contact_email, rank, role, first_name, last_name, primary_phone, alt_phone, contact_time, dept_add_street1, dept_add_street2, dept_add_city, dept_add_state, dept_add_zip, dept_k9s ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16 )', [ req.body.email, req.body.password, req.body.contactEmail, req.body.rank, req.body.role, req.body.firstName, req.body.lastName, req.body.primaryPhone, req.body.altPhone, req.body.contactTime, req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zip, req.body.numberOfDogs ] );

		var insertK9 = client.query( 'INSERT INTO K9s ( k9_name, breed, age, k9_active_duty, k9_retirement, handler_rank, handler_first_name, handler_last_name, handler_badge, handler_cell_phone, handler_secondary_phone, handler_email ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 )', [ req.body.k9name, req.body.breed, req.body.age, req.body.certified, req.body.activeDuty, req.body.retirement, req.body.handlerTitle, req.body.handlerFirstName, req.body.handlerLastName, req.body.handlerCellPhone, req.body.handlerSecondaryCell, req.body.handlerEmail ] );

			// this comes after part 1 of application form is approved by admin:  data about dog/equipment auth signer can save and come back to before submitting - fields are NULLABLE

		// var updateK9 = client.query( 'UPDATE K9s SET k9_bio = ($1), k9_back = ($2), k9_chest = ($3), k9_girth = ($4), k9_undercarriage = ($5), k9_vest_color = ($6), k9_vest_imprint = ($7), squad_make = ($8), squad_model = ($9), squad_year = ($10), squad_retirement = ($11) WHERE id = SOMETHINGSOMETHINGSOMETHING', [ req.body.somethingsomethingsomething ] );

			// need to insert equipment selected, certifications selected, k9 photos, squad photos
			// need junction tables for equipment and certifications
			// HOW???? -- email confirmation field on application form (phone and badge # are populated via ng-bind)
			// HOW???? -- prepopulate fields from inquiry form if already filled out by auth signer


		////// if auth signer already filled out full inquiry form, and now just registering for account/adding handlers
			// prepopulate first part of form
		// var getUser = client.query ( 'SELECT contact_email, rank, role, first_name, last_name, primary_phone, alt_phone, contact_time, dept_add_street1, dept_add_street2, dept_add_city, dept_add_state, dept_add_zip, dept_k9s FROM users WHERE id = SOMETHINGSOMETHINGSOMETHING ' );
			// add handler/k9 basic info
		var addK9 = client.query( 'INSERT INTO K9s ( k9_name, breed, age, k9_active_duty, k9_retirement, handler_rank, handler_first_name, handler_last_name, handler_badge, handler_cell_phone, handler_secondary_phone, handler_email ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 )', [ req.body.k9name, req.body.breed, req.body.age, req.body.certified, req.body.activeDuty, req.body.retirement, req.body.handlerTitle, req.body.handlerFirstName, req.body.handlerLastName, req.body.handlerCellPhone, req.body.handlerSecondaryCell, req.body.handlerEmail ] );

	});
});

  module.exports = router;