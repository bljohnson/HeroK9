var express = require('express');
var path = require('path');
var pg = require('pg');

var connection = require('../modules/connection');
var router = express.Router();


router.get('/', function(req, res){

  console.log("In inquiryTableRoute");

  pg.connect(connection, function (err, client, done) {

    var results = [];
    var query = client.query("SELECT * FROM users WHERE status_id = '1' OR status_id = '2' OR status_id = '3' ORDER BY status_id");

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
