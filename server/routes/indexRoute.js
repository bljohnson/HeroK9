var express = require('express');
var passport = require('passport');
var path = require('path');
var router = express.Router();

router.post('/',
  passport.authenticate('local'), function(req, res){
  res.send(req.user);
});


module.exports = router;
