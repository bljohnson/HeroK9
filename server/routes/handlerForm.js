var express = require('express');
var path = require('path');
var pg = require('pg');

var connection = require('../modules/connection');
var router = express.Router();

router.post('/', function(req, res){
	console.log('In handlerForm route');
	pg.connect(connection, function (err, client, done) {

		var addCertifications = client.query( 'INSERT INTO k9s_certifications ( k9_id, certification_id, url, notes ) VALUES ($1, $2, $3, $4)', [  ] );

		var addK9Photos = client.query( 'INSERT INTO k9s_photos ( url, k9_id ) VALUES ($1, $2)', [  ] );

		var addSquadPhotos = client.query( 'INSERT INTO squad_photos ( url, k9_id ) VALUES ($1, $2)', [  ] );

		var updateK9 = client.query( 'UPDATE K9s SET k9_bio = ($1), k9_back = ($2), k9_chest = ($3), k9_girth = ($4), k9_undercarriage = ($5), k9_vest_color = ($6), k9_vest_imprint = ($7), k9_vest_imprint_color = ($8), squad_make = ($8), squad_model = ($9), squad_year = ($10), squad_retirement = ($11) WHERE K9s.id = SOMETHINGSOMETHINGSOMETHING', [ req.body.placeholder ] );

	});
});

module.exports = router;
