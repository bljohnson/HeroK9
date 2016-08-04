var express = require('express');
var path = require('path');
var pg = require('pg');

var connection = require('../modules/connection');
var router = express.Router();

router.post('/saveUser', function(req, res){

  console.log("In adminEditRoute with:");
  console.log(req.body);

  pg.connect(connection, function (err, client, done) {

    client.query('UPDATE users SET email = ($1), contact_email = ($2), primary_phone = ($3), alt_phone = ($4), contact_time = ($5), dept_add_street1 = ($6), dept_add_street2 = ($7), dept_add_city = ($8), dept_add_state = ($9), dept_add_zip = ($10) WHERE id = ($11)', [req.body.email, req.body.contact_email, req.body.primary_phone, req.body.alt_phone, req.body.contact_time, req.body.dept_add_street1, req.body.dept_add_street2, req.body.dept_add_city, req.body.dept_add_state, req.body.dept_add_zip, req.body.id]);

    done();
    res.sendStatus(200);
  });


});


router.post('/saveDog', function(req, res){

  console.log("In adminEditRoute with:");
  console.log(req.body);

  pg.connect(connection, function (err, client, done) {

    client.query('UPDATE k9s SET breed = ($1), age = ($2), k9_active_duty = ($3), k9_retirement = ($4), handler_rank = ($5), handler_first_name = ($6), handler_last_name = ($7), handler_badge = ($8), handler_cell_phone = ($9), handler_secondary_phone = ($10), handler_email = ($11), k9_chest = ($12), k9_back = ($13), k9_girth = ($14), k9_undercarriage = ($15), k9_vest_color = ($16), k9_vest_imprint = ($17), squad_make = ($18), squad_model = ($19), squad_year = ($20), squad_retirement = ($21) WHERE id = ($22)', [req.body.breed, req.body.age, req.body.k9_active_duty, req.body.k9_retirement, req.body.handler_rank, req.body.handler_first_name, req.body.handler_last_name, req.body.handler_badge, req.body.handler_cell_phone, req.body.handler_secondary_phone, req.body.handler_email, req.body.k9_back, req.body.k9_chest, req.body.k9_girth, req.body.k9_undercarriage, req.body.k9_vest_color, req.body.k9_vest_imprint, req.body.squad_make, req.body.squad_model, req.body.squad_year, req.body.squad_retirement, req.body.id]);


//     var dog = {
//       id: $scope.dogData[index].id,
//       breed: $scope.dogData[index].breed,
//       age: $scope.dogData[index].age,
//       k9_active_duty: $scope.dogData[index].k9_active_duty,
//       k9_retirement: $scope.dogData[index].k9_retirement,
//       handler_rank: $scope.dogData[index].handler_rank,
//       handler_first_name: $scope.dogData[index].handler_first_name,
//       handler_last_name: $scope.dogData[index].handler_last_name,
//       handler_badge: $scope.dogData[index].handler_badge,
//       handler_cell_phone: $scope.dogData[index].handler_cell_phone,
//       handler_secondary_phone: $scope.dogData[index].handler_secondary_phone,
//       handler_email: $scope.dogData[index].handler_email,
//       k9_back: $scope.dogData[index].k9_back,
//       k9_chest: $scope.dogData[index].k9_chest,
//       k9_girth: $scope.dogData[index].k9_girth,
//       k9_undercarriage: $scope.dogData[index].k9_undercarriage,
//       k9_vest_color: $scope.dogData[index].k9_vest_color,
//       k9_vest_imprint: $scope.dogData[index].k9_vest_imprint,
//       squad_make: $scope.dogData[index].squad_make,
//       squad_model: $scope.dogData[index].squad_model,
//       squad_year: $scope.dogData[index].squad_year,
//       squad_retirement: $scope.dogData[index].squad_retirement
// };

    done();
    res.sendStatus(200);
  });
});

module.exports = router;
