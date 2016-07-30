var express = require('express');
var path = require('path');
var pg = require('pg');

var connection = require('../modules/connection');
var router = express.Router();


router.post('/', function(req, res){

  console.log("In updateStatusRoute with ");
  console.log(req.body);

  var newStatus;

  switch (req.body.status.toLowerCase()) {
    case 'new inquiry':
      newStatus = 'Pending Inquiry';
      break;

    case 'pending inquiry':
      newStatus = 'Approved Inquiry';
      break;

    case 'approved inquiry':
      newStatus = 'New Application';
      break;

    case 'new applictaion':
      newStatus = 'Pending Application';
      break;

    case 'pending application':
      newStatus = 'Approved Application';
      break;

    default:
      "How the fuck did you get here?"
      break;
  }

  pg.connect(connection, function (err, client, done) {

    client.query('UPDATE users SET status = ($1) WHERE users.email = ($2)', [ newStatus, req.body.user ] );

  });

  console.log("New Status " + newStatus);

  res.send(newStatus);

});

module.exports = router;
