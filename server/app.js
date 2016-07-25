var express=require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded( { extended: false } );
app.use( bodyParser.json() );



app.use( express.static( 'public' ) );

app.post('/sendInquiry', function(req, res){
  console.log(req.body);
});

app.get( '/', function( req, res ){
  console.log( 'at base url' );
  res.sendFile( path.resolve( 'public/views/index.html' ) );
}); // end base url

// set up server
app.set('port', process.env.PORT || 4200);

app.listen(app.get('port'), function() {
  console.log('human, wake up:', app.get('port'));
});
