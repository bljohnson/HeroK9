var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var connection = require('../modules/connection');
var pg = require('pg');
var localStrategy = require('passport-local').Strategy;
var flash = require('express-flash');
var sha1 = require('sha-1');


router.use(flash());

require('dotenv').config();

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "primeherok9@gmail.com",
        pass: process.env.MAIL_PASS
    }
});

router.post('/',function(req,res){
  console.log("in nodemailer request: ",req.body);
    if (req.body.admin){
      var mailOptions={
          to : req.body.to,
          subject : req.body.subject,
          text : "Welcome to Hero K9! \n\nWe are pleased to inform you that your request for application has been approved. \nPlease click the link below to create an account. This account will allow you to complete your agency/department's appication and track the status of your equipment grant request.\n\nhttp://localhost:4200/register?from=" + sha1(req.body.admin) + "\n\nOnce you have created your account, you will have access to the application form. You may save and come back to the application, as needed, by clicking on the ‘Account Login’ at www.herok9.org.\nIf you have any questions, please feel free to contact us at apply@herok9.org Hero K9 Ensuring the Provision, Preparation and Protection of Public Safety K9s\n\n---\n\nP.O. Box 390479\nMinneapolis, MN 55439\n681.4HEROK9 (437659)\nwww.herok9.org\n\nHero K9 is a national 501(c)(3) organization dedicated to protecting our nation by providing funding to the Public Safety community for the purchase of K9s, training, and necessary equipment. Donations are tax-deductible. Tax ID: 81-3051300"
      };
    } else {
      var mailOptions={
          to : req.body.to,
          subject : req.body.subject,
          text : req.body.text
      };
    }

    // console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    }
  });
});

// router.post('/forgot', function(req, res, next) {
//   var userEmail = req.body.email;
//   async.waterfall([
//     function(done) {
//       crypto.randomBytes(20, function(err, buf) {
//         var token = buf.toString('hex');
//         done(err, token);
//       });
//     },
//     function(token, done) {
//       //query to find the user in db
//       pg.connect(connection, function (err, client) {
// 	    	console.log('called local - pg');
// 	    	var user = {};
//         var query = client.query("SELECT * FROM users WHERE email = $1", [userEmail]);
//
//         query.on('row', function (row) {
//         	console.log('User obj', row);
//         	user = row;
//           if (user == {}) {
//             req.flash('error', 'No account with that email address exists.');
//             return res.redirect('/forgot');
//           } else {
//             client.query("UPDATE users SET resetPasswordToken = $1 AND SET resetPasswordExpires = $2 WHERE email = $3", [token,Date.now() + 3600000,userEmail]);
//             console.log("closing connection");
//             client.end();
//             }
//           });
//         });
//       }]);
//     }),
//     function(token, user, done) {
//       var smtpTransport = nodemailer.createTransport('SMTP', {
//         service: 'SendGrid',
//         auth: {
//           user: '',
//           pass: ''
//         }
//       });
//       var mailOptions = {
//         to: user.email,
//         from: 'passwordreset@demo.com',
//         subject: 'Node.js Password Reset',
//         text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//           'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//           'http://' + req.headers.host + '/reset/' + token + '\n\n' +
//           'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//       };
//       smtpTransport.sendMail(mailOptions, function(err) {
//         req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
//         done(err, 'done');
//       });
//     }
//   ], function(err) {
//     if (err) return next(err);
//     res.redirect('/forgot');
//   });
// });
//
//
// app.post('/reset/:token', function(req, res) {
//   async.waterfall([
//     function(done) {
//       User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
//         if (!user) {
//           req.flash('error', 'Password reset token is invalid or has expired.');
//           return res.redirect('back');
//         }
//
//         user.password = req.body.password;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;
//
//         user.save(function(err) {
//           req.logIn(user, function(err) {
//             done(err, user);
//           });
//         });
//       });
//     },
//     function(user, done) {
//       var smtpTransport = nodemailer.createTransport('SMTP', {
//         service: 'SendGrid',
//         auth: {
//           user: '',
//           pass: ''
//         }
//       });
//       var mailOptions = {
//         to: user.email,
//         from: 'passwordreset@demo.com',
//         subject: 'Your password has been changed',
//         text: 'Hello,\n\n' +
//           'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
//       };
//       smtpTransport.sendMail(mailOptions, function(err) {
//         req.flash('success', 'Success! Your password has been changed.');
//         done(err);
//       });
//     }
//   ], function(err) {
//     res.redirect('/');
//   });
// });

module.exports = router;
