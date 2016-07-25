var express = require('express');
var path = require('path');
var pg = require('pg');

var connection = require('../modules/connection');
var router = express.Router();


router.get('/', function(req, res){

  console.log("In snippitRoute");

  pg.connect(connection, function (err, client, done) {

    var results = [];

    var query = client.query("SELECT * FROM inquiries");

    query.on('row', function(row){
      results.push(row);
    });

    query.on('end', function(){

      var inquiriesNew = 0;
      var inquiriesPending = 0;
      var inquiriesApproved = 0;

      for (var i=0; i<results.length; i++){
        if(results[i].authorized === true){
          inquiriesApproved++;
        } else if (results[i].viewed === false){
          inquiriesNew++;
        } else {
          inquiriesPending++;
        }
      }

      var data = {
        inquiry: undefined,
        application: undefined
      };
      data.inquiry = {
        new: inquiriesNew,
        pending: inquiriesPending,
        approved: inquiriesApproved
      };

      res.send(data);

    });

  });

});




module.exports = router;
