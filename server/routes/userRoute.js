var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require('../modules/connection');

router.get('/', function(req, res) {
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in ', req.user);
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    // res.send(false);
    console.log('not logged in');
    // res.redirect(301, '/');
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.redirect('/');
});

module.exports = router;
