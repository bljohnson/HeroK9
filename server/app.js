// for file uploads, loads environment variables before everything else
require('dotenv').load();

var express=require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var pg = require('pg');
var passport = require('../server/strategies/userStrategy.js');
var session = require('express-session');
var urlencodedParser=bodyParser.urlencoded( { extended: false } );


// middleware
app.use( bodyParser.json() );
app.use( express.static( 'public' ) );

app.post('/sendInquiry', function(req, res){
  console.log(req.body);
});

app.get( '/', function( req, res ){
  console.log( 'Home, sweet home' );
  res.sendFile( path.resolve( 'public/views/index.html' ) );
}); // end base url

app.get( '/login', function( req, res ){
  console.log( 'at login' );
  res.sendFile( path.resolve( 'public/views/login.html' ) );
});



// set up server
app.set('port', process.env.PORT || 4200);

app.listen(app.get('port'), function() {
  console.log('human, wake up:', app.get('port'));
});


// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
}));

// init passport
app.use(passport.initialize());
app.use(passport.session());

app.get( '/adminView', function( req, res ){
  console.log( 'at adminView', req.user );
  if (req.user === undefined) {res.sendFile(path.resolve('public/views/login.html'));}
  else if (req.user.status_id == 99) {res.sendFile(path.resolve('public/views/admin.html'));}
  else {res.sendFile(path.resolve('public/views/login.html'));}
});


// include routes
var user = require ('../server/routes/userRoute');
var index = require('../server/routes/indexRoute');
var register = require('../server/routes/registerRoute');
var snippitInfo = require('../server/routes/snippitRoute');
var mailer = require('../server/routes/mailerRoute');
var inquiryTable = require('../server/routes/inquiryTableRoute');
var applicationTable = require('../server/routes/applicationTableRoute');
var saveUser = require('../server/routes/adminEditRoute');
var inquiryForm = require('../server/routes/inquiryForm');
var applicationForm = require('../server/routes/applicationForm');
var updateStatus = require('../server/routes/updateStatusRoute');
var userDash = require ('../server/routes/userDashRoute');

// routes
app.use('/user', user);
app.use('/register', register);
app.use('/index', index);
app.use('/snippitInfo', snippitInfo);
app.use('/sendMail', mailer);
app.use('/inquiryTable', inquiryTable);
app.use('/applicationTable', applicationTable);
app.use('/saveUser', saveUser);
app.use('/inquiryForm', inquiryForm);
app.use('/applicationForm', applicationForm);
app.use('/updateStatus', updateStatus);
app.use('/userDash', userDash);
