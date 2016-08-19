var express = require('express');
var path = require('path');
var pg = require('pg');

var connection = require('../modules/connection');
var router = express.Router();


router.get('/inquiryTable', function(req, res){

  console.log("In inquiryTable");

  pg.connect(connection, function (err, client, done) {

    var results = [];
    var query = client.query("SELECT * FROM users WHERE status_id = '1' OR status_id = '2' OR status_id = '3' ORDER BY status_id");

    query.on('row', function(row){
      results.push(row);
    });

    query.on('end', function(){

      var statusQuery = client.query("SELECT * FROM status");
      var statusTable = [];

      statusQuery.on('row', function(row){
        statusTable.push(row);
      });

      statusQuery.on('end', function(){

        console.log("status table", statusTable);
        //Status_id key
        for( var i=0; i<results.length; i++){
          //Loop through each user row
          for(var j=0; j<statusTable.length; j++){
            //Loop through the statusTable and match
            if(results[i].status_id == statusTable[j].id){
              //The id's were matched
              console.log("id's matched");
              results[i].status_type = statusTable[j].status_type;
              results[i].status_desc = statusTable[j].description;
            }
          }
        }
        console.log(results[0]);

        done();
        res.send(results);
      });
    });

  });

});


router.get('/applicationTable', function(req, res){

  console.log("In applicationTable");

  pg.connect(connection, function (err, client, done) {

    var results = [];
    var query = client.query("SELECT * FROM users WHERE status_id = '4' OR status_id = '5' OR status_id = '6' OR status_id = '7'");

    query.on('row', function(row){
      results.push(row);
    });

    query.on('end', function(){

      var statusQuery = client.query("SELECT * FROM status");
      var statusTable = [];

      statusQuery.on('row', function(row){
        statusTable.push(row);
      });

      statusQuery.on('end', function(){

        console.log("status table", statusTable);
        //Status_id key
        for( var i=0; i<results.length; i++){
          //Loop through each user row
          for(var j=0; j<statusTable.length; j++){
            //Loop through the statusTable and match
            if(results[i].status_id == statusTable[j].id){
              //The id's were matched
              console.log("id's matched");
              results[i].status_type = statusTable[j].status_type;
              results[i].status_desc = statusTable[j].description;
            }
          }
        }
        console.log(results[0]);
        done();
        res.send(results);
      });

    });

  });

});


router.post('/dogTable', function(req, res){
  console.log("In dogTable with,", req.body.user_id);

  pg.connect(connection, function (err, client, done) {
    results = [];

    var query = client.query('SELECT * FROM k9s WHERE user_id = ($1)', [req.body.user_id]);

    query.on('row', function(row){
      results.push(row);
    });

    query.on('end', function(){
      done();
      res.send(results);
    });
  });
});


router.post('/dogTableInfo', function(req, res){
  console.log("In dogTableInfo with,", req.body.user_id);

  pg.connect(connection, function (err, client, done) {
    results = [];

    var query = client.query('SELECT * FROM k9s WHERE id = ($1)', [req.body.dog_id]);

    // var k9PhotoQuery = client.query('SELECT K9_photos.url FROM K9s INNER JOIN K9_photos ON K9s.id = K9_photos.K9_id WHERE K9s.id=' + req.body.dog_id);

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
