var express = require('express');
var path = require('path');
var pg = require('pg');

var connection = require('../modules/connection');
var router = express.Router();


router.post('/', function(req, res){

  console.log("In delete user, deleting:", req.body.contact_email);

  pg.connect(connection, function (err, client, done) {
    client.query('DELETE FROM users WHERE contact_email = ($1)', [req.body.contact_email]);
    res.sendStatus(200);
  });


});


module.exports = router;
