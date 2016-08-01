var express = require('express');
var path = require('path');
var pg = require('pg');

var connection = require('../modules/connection');
var router = express.Router();

router.post('/', function(req, res){

  console.log("In adminEditRoute with:");
  console.log(req.body);
  res.sendStatus(200);

  pg.connect(connection, function (err, client, done) {

    client.query('UPDATE users SET email = ($1), contact_email = ($2), primary_phone = ($3), alt_phone = ($4), contact_time = ($5), dept_add_street1 = ($6), dept_add_street2 = ($7), dept_add_city = ($8), dept_add_state = ($9), dept_add_zip = ($10) WHERE id = ($11)', [req.body.email, req.body.contact_email, req.body.primary_phone, req.body.alt_phone, req.body.contact_time, req.body.dept_add_street1, req.body.dept_add_street2, req.body.dept_add_city, req.body.dept_add_state, req.body.dept_add_zip, req.body.id]);

    done();
  });


});

module.exports = router;
