var express = require('express');
var path = require('path');
var pg = require('pg');

var connection = require('../modules/connection');
var router = express.Router();

router.post('/part1', function(req, res){
	console.log("In applicationForm route");
  	console.log('req.body: ', req.body);
  	pg.connect(connection, function (err, client, done) {

		var insertUser = client.query( 'UPDATE users SET contact_email = $1, rank = $2, role = $3, first_name = $4, last_name = $5, primary_phone = $6, alt_phone = $7, contact_time = $8, dept_add_street1 = $9, dept_add_street2 = $10, dept_add_city = $11, dept_add_state = $12, dept_add_zip = $13, dept_k9s = $14 WHERE id = ' + req.user.id + '', [ req.body.contactEmail, req.body.rank, req.body.role, req.body.firstName, req.body.lastName, req.body.primaryPhone, req.body.altPhone, req.body.contactTime, req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zip, req.body.numberOfDogs ] );

		done();
		res.sendStatus(200);
	});
});

router.post('/part2', function(req, res){
	console.log("In applicationForm route");
  	console.log('req.body: ', req.body);
  	pg.connect(connection, function (err, client, done) {
		var addK9 = client.query( 'INSERT INTO K9s ( user_id, k9_name, breed, age, k9_certified, k9_active_duty, k9_retirement, handler_rank, handler_first_name, handler_last_name, handler_badge, handler_cell_phone, handler_secondary_phone, handler_email ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14 ) RETURNING id', [ req.user.id, req.body.k9name, req.body.breed, req.body.age, req.body.certified, req.body.activeDuty, req.body.retirement, req.body.handlerTitle, req.body.handlerFirstName, req.body.handlerLastName, req.body.handlerBadge, req.body.handlerCellPhone, req.body.handlerSecondaryCell, req.body.handlerEmail ],
		function(err, result) {
	              if(err){
				  console.log(err);
				  res.sendStatus(500);
	              }else{
				  //console.log('id of k9/handler: ', result.rows[0].id);
				  for (var i=0; i<req.body.equipment.length; i++){
					  client.query( 'INSERT INTO k9s_equipment ( k9_id, equipment_id ) VALUES ( $1, $2 )', [ result.rows[0].id, req.body.equipment[i] ] );
				  } // end for loop
				 done();
				 res.sendStatus(200);
		      } // end if else
		} // end function
		); // end client.query
	}); // end pg connect
}); // end router.post

router.post('/part3', function(req, res){
	console.log("In applicationForm route");
  	console.log('req.body: ', req.body);
  	pg.connect(connection, function (err, client, done) {
		var addLegalAgreement = client.query('UPDATE users SET signature = ($1), badge = ($2) WHERE id = ($3)', [req.body.signature, req.body.badgeSignature, req.user.id]);
	  done();
	  res.sendStatus(200);
	}); // end pg connect
}); // end router.post

router.get('/formData', function(req, res){
	console.log('in application GET');
	pg.connect(connection, function(err, client, done){
		var results = [];
		var query = client.query( 'SELECT * FROM equipment ');
		query.on('row', function(row){
			results.push(row);
		});
		query.on('end', function(){
			done();
			res.send(results);
		});
	});
});


  module.exports = router;
