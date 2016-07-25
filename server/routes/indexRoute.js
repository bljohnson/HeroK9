var express = require('express');
var passport = require('passport');
var path = require('path');
var router = express.Router();

router.post('/',
  passport.authenticate('local',

  {
    successRedirect: '/user',
    failureRedirect: '/user'
  }
));

router.get('/', function(req, res) {
  console.log("hitting index get");
  res.sendFile(path.resolve('public/views/index.html'));
});

module.exports = router;
