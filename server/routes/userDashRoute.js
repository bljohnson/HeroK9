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
        return res.end();
      });
    }
    done();
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
        return res.end();
      });
    }
    done();
  });
});

// send handler application data to k9s table
router.post('/submitK9App', function (req, res){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      var results = [];
      var k9id = client.query('SELECT id FROM k9s WHERE user_id=($1)', [req.user.id]);

      k9id.on('row', function(row){
        results.push(parseInt(row.id));
        console.log('Row:', row);
      });

      k9id.on('end', function(){

        for (var i=0; i<results.length; i++){
          var sendFile = client.query('INSERT INTO k9s_certifications (k9_id, certification_id, url) VALUES ($1, $2, $3)', [results[i], req.body.certs[i], req.body.url]);
        }

        res.sendStatus(200);

      });
    }
  });
});

router.get('/getFormInfo', function (req, res){
  pg.connect(connectionString, function(err, client, done){

    var results = {
      certs: [],
      dogs: [],
      form_info: {
        breeds: [],
        vest_colors: [],
        vest_imprints: [],
        vest_imprint_colors: []
      }
    };


    //Get Certs
    var queryCerts = client.query('SELECT * from certifications');
    queryCerts.on('row', function(row){
      results.certs.push(row);
    });
    queryCerts.on('end', function(){

      //Get Dogs
      var queryDogs = client.query('SELECT * from k9s WHERE user_id=($1)', [req.user.id]);
      queryDogs.on('row', function(row){
        results.dogs.push(row);
      });
      queryDogs.on('end', function(){

        //Get Form Information
        results.form_info.vest_colors = client.query('SELECT enum_range(NULL::vest_color)');
        results.form_info.vest_imprints = client.query('SELECT enum_range(NULL::vest_imprint)');
        results.form_info.vest_imprint_colors = client.query('SELECT enum_range(NULL::vest_imprint_color)');


        //All done!
        res.send(results);

      });

    });
  });
});




module.exports = router;
