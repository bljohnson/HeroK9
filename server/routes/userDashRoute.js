var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var pg = require('pg');

// require to upload images
var multer = require('multer');
var fs = require('fs');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
var s3 = new aws.S3();

var connectionString = require('../modules/connection');

////////////////////////////////////////////////////////////
//                   UPLOAD FILES TO S3                   //
////////////////////////////////////////////////////////////

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'prime-digital-academy-herok9',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      // file name generation
      cb(null, Date.now().toString());
    }
  })
});

// upload post route to S3
router.post('/uploads', upload.single('file'), function(req, res) {
  console.log('in S3 post uploads:', req.file);
  res.send(req.file);
});

// get route to retrieve file names to display and then potentially allow users to delete too?
// router.get('/getFileNames', function(req, res) {
//   var results = [];
//   pg.connect(connectionString, function(err, client, done) {
//     var callDatabase = client.query('SELECT file name from k9s_certifications where k9_id equals x;');
//     // push each row in query into our results array
//     callDatabase.on('row', function(row) {
//       results.push(row);
//     }); // end query push
//     callDatabase.on('end', function(){
//       console.log('user files: ', results);
//       return res.json(results);
//     });
//     if(err) {
//       console.log(err);
//     }
//     done();
//   }); // end pg connect
// });


////////////////////////////////////////////////////////////
//                     POST ROUTES                        //
////////////////////////////////////////////////////////////

// send PDF URLs to k9s_certifications table
router.post('/submitPdf', function (req, res){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      var sendFile = client.query('INSERT INTO k9s_certifications (id, k9_id, certification_id, url, notes) VALUES ($1, $2, $3, $4, $5)',
        [req.body.id, req.body.k9_id, req.body.certification_id, req.body.url, req.body.notes]);
        console.log('in submitPdf post route, adding:', req.body.url);
      sendFile.on('end', function(){
        done();
        return res.end();
      });
    }
  });
});

// send IMG URLs to k9_photos table
router.post('/submitImg', function (req, res){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      var sendFile = client.query('INSERT INTO test (url) VALUES ($1)',
        [req.body.url]);
        console.log('in submitImg post route, adding:', req.body.url);
      sendFile.on('end', function(){
        done();
        return res.end();
      });
    }
  });
});

// send handler application data to k9s table
router.post('/submitK9App', function (req, res){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      var sendFile = client.query('INSERT INTO test (k9_bio, k9_back, k9_chest) VALUES ($1, $2, $3)',
        [req.body.bio, req.body.back, req.body.chest]);
        console.log('in submitK9App post route, adding:', req.body.back);
      sendFile.on('end', function(){
        done();
        return res.end();
      });
    }
  });
});


router.get('/', function(req, res){
	console.log('in router.get user dash');
	pg.connect(connectionString, function (err, client, done) {

	  var results = [];
	  var query = client.query("SELECT * FROM K9s");
	  console.log('results: ', results);
	  console.log('query: ', query);

	  query.on('row', function(row){
	    results.push(row);
	  });

	  query.on('end', function(){
      done();
	    res.send(results);
	  });

	});

    });





module.exports = router;
