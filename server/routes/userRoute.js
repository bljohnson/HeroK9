var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require('../modules/connection');


// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.redirect('/');
});

module.exports = router;
