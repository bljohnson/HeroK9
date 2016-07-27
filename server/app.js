var express=require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var pg = require('pg');
var passport = require('../server/strategies/userStrategy.js');
var session = require('express-session');
var urlencodedParser=bodyParser.urlencoded( { extended: false } );

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

app.get( '/adminView', function( req, res ){
  console.log( 'at adminView' );
  res.sendFile( path.resolve( 'public/views/admin.html' ) );
});

// set up server
app.set('port', process.env.PORT || 4400);

app.listen(app.get('port'), function() {
  console.log('human, wake up:', app.get('port'));
});

//static folder
app.use( express.static( 'public' ) );

//body paser
app.use(bodyParser.json());


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

app.get( '/', function( req, res ){
  console.log( 'Home, sweet home' );
  res.sendFile( path.resolve( 'public/views/index.html' ) );
}); // end base url

app.post('/sendInquiry', function(req, res){
  console.log(req.body);
});

app.get( '/login', function( req, res ){
  console.log( 'at login' );
  res.sendFile( path.resolve( 'public/views/login.html' ) );
});

app.get( '/adminView', function( req, res ){
  console.log( 'at adminView' );
  res.sendFile( path.resolve( 'public/views/admin.html' ) );
}); // end base url


//Include Routes
var user = require ('../server/routes/userRoute');
var index = require('../server/routes/indexRoute');
var register = require('../server/routes/registerRoute');
var snippitInfo = require('../server/routes/snippitRoute');
var inquiryTable = require('../server/routes/inquiryTableRoute');
var applicationTable = require('../server/routes/applicationTableRoute');


// Routes
app.use('/user', user);
app.use('/register', register);
app.use('/index', index);
app.use('/snippitInfo', snippitInfo);
app.use('/inquiryTable', inquiryTable);
app.use('/applicationTable', applicationTable);
