var express = require('express');
var path = require('path');
var pg = require('pg');

var connection = require('../modules/connection');
var router = express.Router();


router.post('/', function(req, res){

  console.log("In updateStatusRoute with ");
  console.log(req.body);

  var newStatus;

  switch (parseInt(req.body.status_id)) {
    case 1:
      newStatus = 2;
      break;

    case 2:
      newStatus = 3;
      break;

    case 3:
      newStatus = 4;
      break;

    case 4:
      newStatus = 5;
      break;

    case 5:
      newStatus = 6;
      break;

    default:
      "How the fuck did you get here?"
      break;
  }

  pg.connect(connection, function (err, client, done) {

    console.log("The new status will be " + newStatus);
    client.query('UPDATE users SET status_id = ($1) WHERE users.contact_email = ($2)', [ newStatus, req.body.contact_email ] );

  });

  console.log("New Status " + newStatus);

  res.send(newStatus.toString());

});

module.exports = router;
