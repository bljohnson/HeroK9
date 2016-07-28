var express = require('express');
var path = require('path');
var pg = require('pg');

var connection = require('../modules/connection');
var router = express.Router();


router.post('/', function(req, res){

  console.log("In inquiryForm route");
  console.log('req.body: ', req.body);
  pg.connect(connection, function (err, client, done) {

    var query = client.query( 'INSERT INTO users ( contact_email, rank, role, first_name, last_name, primary_phone, alt_phone, contact_time, dept_add_street1, dept_add_street2, dept_add_city, dept_add_state, dept_add_zip, dept_k9s, auth_title, auth_first_name, auth_last_name, auth_phone, auth_email ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19 )', [ req.body.email, req.body.rank, req.body.role, req.body.firstName, req.body.lastName, req.body.primaryPhone, req.body.altPhone, req.body.contactTime, req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zip, req.body.numberOfDogs, req.body.authorizedTitle, req.body.authorizedFirstName, req.body.authorizedLastName, req.body.authorizedPhone, req.body.authorizedEmail ] );

  });

});

  module.exports = router;
