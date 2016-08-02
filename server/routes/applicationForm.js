var express = require('express');
var path = require('path');
var pg = require('pg');

var connection = require('../modules/connection');
var router = express.Router();


router.post('/part1', function(req, res){
	console.log("In applicationForm route");
  	console.log('req.body: ', req.body);
  	pg.connect(connection, function (err, client, done) {

		////// admin emails link --> auth signer needs to fill out ENTIRE form top to bottom
		var insertUser = client.query( 'INSERT INTO users ( contact_email, rank, role, first_name, last_name, primary_phone, alt_phone, contact_time, dept_add_street1, dept_add_street2, dept_add_city, dept_add_state, dept_add_zip, dept_k9s ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14 )', [ req.body.contactEmail, req.body.rank, req.body.role, req.body.firstName, req.body.lastName, req.body.primaryPhone, req.body.altPhone, req.body.contactTime, req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zip, req.body.numberOfDogs ] );
		console.log('something');

		res.sendStatus(200);
	});
});

router.post('/part2', function(req, res){
	console.log("In applicationForm route");
  	console.log('req.body: ', req.body);
  	pg.connect(connection, function (err, client, done) {

		var addK9 = client.query( 'INSERT INTO K9s ( user_id, k9_name, breed, age, k9_certified, k9_active_duty, k9_retirement, handler_rank, handler_first_name, handler_last_name, handler_badge, handler_cell_phone, handler_secondary_phone, handler_email ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14 ) RETURNING id', [ req.user.id, req.body.k9name, req.body.breed, req.body.age, req.body.certified, req.body.activeDuty, req.body.retirement, req.body.handlerTitle, req.body.handlerFirstName, req.body.handlerLastName, req.body.handlerBadge, req.body.handlerCellPhone, req.body.handlerSecondaryCell, req.body.handlerEmail ],

		function(err, result) {

	              done();

	              if(err){
	                console.log(err);
	                res.sendStatus(500);
	              }else{
	        	//console.log('id of k9/handler: ', result.rows[0].id);
			for (var i=0; i<req.body.equipment.length; i++){
				client.query( 'INSERT INTO k9s_equipment ( k9_id, equipment_id ) VALUES ( $1, $2 )', [ result.rows[0].id, req.body.equipment[i] ] );
			}

		      } // end if else
		} // end function
		); // end query


		// var updateK9 = client.query( 'UPDATE K9s SET k9_bio = ($1), k9_back = ($2), k9_chest = ($3), k9_girth = ($4), k9_undercarriage = ($5), k9_vest_color = ($6), k9_vest_imprint = ($7), squad_make = ($8), squad_model = ($9), squad_year = ($10), squad_retirement = ($11) WHERE K9s.id = SOMETHINGSOMETHINGSOMETHING', [ req.body.placeholder ] );


	}); // end pg connect
}); // end router.post

router.get('/', function(req, res){
	console.log('in application GET');
	pg.connect(connection, function(err, client, done){
		var results = [];
		var query = client.query( 'SELECT * FROM equipment ');
		query.on('row', function(row){
			results.push(row);
		});
		query.on('end', function(){
			res.send(results);
		});
	});
});

  module.exports = router;
