var express = require('express');
var path = require('path');
var pg = require('pg');

var connection = require('../modules/connection');
var router = express.Router();


router.get('/', function(req, res){

  console.log("In applicationTableRoute");

  pg.connect(connection, function (err, client, done) {

    var results = [];
    var query = client.query("SELECT * FROM users WHERE status = 'New Application' OR status = 'Pending Application' OR status = 'Approved Application'");

    query.on('row', function(row){
      results.push(row);
    });

    query.on('end', function(){
      res.send(results);
    });

  });

});

module.exports = router;
