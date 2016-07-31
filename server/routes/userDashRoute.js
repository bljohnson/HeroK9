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
//                   UPLOAD FILE ROUTES                   //
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

// get route to retrieve file names to display
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
//         POST ROUTE TO SEND HANDLER APP TO DB           //
////////////////////////////////////////////////////////////

router.post('/submitFile', function (req, res){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      var sendFile = client.query('INSERT INTO k9s_certifications (id, k9_id, certification_id, url, notes) VALUES ($1, $2, $3, $4, $5)',
        [req.body.id, req.body.k9_id, req.body.certification_id, req.body.url, req.body.notes]);
        console.log('in submitFile post route, adding:', req.body.url);
      sendFile.on('end', function(){
        return res.end();
      });
    }
    done();
  });
});




module.exports = router;
