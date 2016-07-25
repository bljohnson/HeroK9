var express=require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var pg = require('pg');
var passport = require('../server/strategies/userStrategy.js');
var session = require('express-session');
var urlencodedParser=bodyParser.urlencoded( { extended: false } );

app.use( express.static( 'public' ) );

app.get( '/', function( req, res ){
  console.log( 'at base url' );
  res.sendFile( path.resolve( 'public/views/index.html' ) );
}); // end base url

// set up server
app.set('port', process.env.PORT || 4300);

app.listen(app.get('port'), function() {
  console.log('human, wake up:', app.get('port'));
});

//body paser
app.use(bodyParser.json());
app.use(express.static('public'));

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

//Include Routes
var index = require('../server/routes/indexRoute');
var register = require('../server/routes/registerRoute');

// Routes
app.use('/register', register);
app.use('/index', index);
