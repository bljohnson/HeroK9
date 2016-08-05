var express = require('express');
var path = require('path');
var pg = require('pg');
var sha1 = require('sha-1');

// require module functions
var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');

var router = express.Router();

router.get('/', function(req, res) {
  res.sendFile(path.resolve('public/views/register.html'));
});

router.post('/', function(req, res) {
  console.log('we hit the register route ', req.body);
  console.log('req.body.username = ', req.body.email);
  console.log('req.body.password = ', req.body.password);

if (req.body.contact_email == undefined) {

  pg.connect(connection, function (err, client, done) {

      var userToSave = {
        email: req.body.email,
        password: encryptLib.encryptPassword(req.body.password)
      };

      //client.query takes the query, params, and optional callback
      client.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
        [userToSave.email, userToSave.password],
          function(err, result) {

            done();

            if(err){
              console.log(err);
              res.sendStatus(500);
            }else{
              //redirect to get on / route
              console.log('id of registered user = ', result.rows[0].id);
              res.redirect('/');
            }
      });
    });

} else if (req.body.contact_email !== undefined) {

  //test the db connection
  pg.connect(connection, function (err, client, done) {

    var userToSave = {
      email: req.body.email,
      password: encryptLib.encryptPassword(req.body.password),
      contact_email: req.body.contact_email
    };

    var contact_query = client.query("SELECT * FROM users");
    var contact_results = [];
    var correctHash;

    contact_query.on('row', function(row){
      contact_results.push(row.contact_email);
    });

    contact_query.on('end', function(){
      console.log(contact_results);
      for (var i=0; i<contact_results.length; i++){
        if (sha1(contact_results[i]) == userToSave.contact_email){
          correctHash = contact_results[i];
          console.log("contact_email matched:", correctHash, contact_results[i]);
        }
      }
      client.query("UPDATE users SET email=($1),password=($2) WHERE contact_email=($3) RETURNING id",
        [userToSave.email, userToSave.password, correctHash],
          function(err, result) {

            done();

            if(err){
              console.log(err);
              res.sendStatus(500);
            }else{
              //redirect to get on / route
              res.redirect('/');
            }
      });
    });


  });
}});

module.exports = router;
