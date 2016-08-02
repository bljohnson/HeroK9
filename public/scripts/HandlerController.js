////////////////////////////////////////////////////////////
//     HandlerController for Form Functionality           //
////////////////////////////////////////////////////////////
angular.module('myApp').controller('HandlerController', [
  '$scope',
  '$http',
  '$window',
  '$location',
  'Upload',
  '$mdDialog',
  function($scope, $http, $window, $location, Upload, $mdDialog) {

    $http({
      method: 'GET',
      url: '/userDash/getCerts'
    }).success(function(data) {
      console.log('after /getCerts: ', data);
      $scope.certList = data;
    });


    // k9 breeds
    $scope.breeds = ['German Shepherd', 'Belgian Malinois', 'Bloodhound', 'Other'];
    $scope.getBreed = function() {
      if ($scope.breed !== undefined) {
        return $scope.breed;
      } else {
        return 'Please select a breed';
      }
    };

    // if 'Other' breed
    $scope.yesnoCheck = function() {
      if (this.breed == 'Other') {
        document.getElementById('ifYes').style.display = 'block';
      } else {
        document.getElementById('ifYes').style.display = 'none';
     }
    };

    // certification checkboxes


    // select vest colors
    $scope.colors = ['Black', 'Multi-Cam®', 'Ranger Green', 'Tan'];
    $scope.vestColor = '';
    $scope.getVestColor = function() {
      if ($scope.vestColor !== undefined) {
        return $scope.vestColor;
      } else {
        return "Please select a color";
      }
    };

    // select vest imprint
    $scope.imprints = ['Fire', 'Fire K9', 'Police', 'Police K9', 'Search & Rescue', 'Sheriff', 'Sheriff K9'];
    $scope.vestImprint = '';
    $scope.getVestImprint = function() {
      if ($scope.vestImprint !== undefined) {
        return $scope.vestImprint;
      } else {
        return "Please select a vest imprint";
      }
    };

    // select vest imprint color
    $scope.imprintColors = ['Dark Gray', 'Reflective Silver', 'White', 'Yellow'];
    $scope.vestImprintColor = '';
    $scope.getImprintColor = function() {
      if ($scope.vestImprintColor !== undefined) {
        return $scope.vestImprintColor;
      } else {
        return "Please select a vest imprint color";
      }
    };

    // collect input to send to server
    $scope.sendK9App = function() {
      var k9AppToSend = {
        certs: [],
        url: 'dummyURL'
      };

      for (var i =0; i<$scope.certList.length; i++){
        if (document.getElementById('cert' + i).className.indexOf('md-checked') >= 0){
          k9AppToSend.certs.push($scope.certList[i].id);
        }
      }

      $http({
        method: 'POST',
        url: '/userDash/submitK9App',
        data: k9AppToSend
      }).success(function() {
        console.log('in /submitK9App: ', k9AppToSend);
      });
    };

  // save button alert modal
  $scope.saveForm = function() {
    $mdDialog.show(
      $mdDialog.alert({
        title: 'Saved!',
        textContent: 'Your application has been successfully saved.',
        ok: 'Okay'
      })
    );
  };

  // submit button alert modal
  $scope.submitForm = function() {
    $mdDialog.show(
      $mdDialog.alert({
        title: 'Submitted!',
        textContent: 'Your application has been successfully submitted.',
        ok: 'Okay'
      })
    );
  };
}]); // end HandlerController

////////////////////////////////////////////////////////////
//                     PdfController                      //
////////////////////////////////////////////////////////////
angular.module('myApp').controller('PDFController', [
  '$scope',
  '$http',
  '$window',
  '$location',
  'Upload',
  function($scope, $http, $window, $location, Upload) {

    // file variables
    $scope.file = '';
    $scope.uploads = [];
    $scope.comment = '';

    // validate and upload files on submit
    $scope.submitPdf = function() {
      if ($scope.k9form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
        console.log('in submitPdf function, file to upload:', $scope.file);
      }
    };

    // upload files to S3 and to the database
    $scope.upload = function(file) {
      Upload.upload ({
        url: '/userDash/uploads',
        data: {
          file: file,
          'user': $scope.user,
          'comment': $scope.comment
        }
      }).then(function(resp) {
        console.log('success: ' + resp.config.data.file.name + ' uploaded and file at ' + resp.data.location);

        // then, if success, also collect input & send data and file location to database
        var pdfToServer = {
          id: '1',
          k9_id: '2',
          certification_id: '5',
          url: resp.data.location,
          notes: 'pdf notes'
        };
        console.log('send to server: ', pdfToServer);

        // post method to send object to database
        $http({
          method: 'POST',
          url: '/userDash/submitPdf',
          data: pdfToServer
        }).then(function() {
          console.log('submitPdf post success');
        });
      }, function(resp) {
        console.log('Error status: ' + resp.status);
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    };
}]); // end PDFController

////////////////////////////////////////////////////////////
//             ImgController for K9 photos                //
////////////////////////////////////////////////////////////
angular.module('myApp').controller('ImgController', [
  '$scope',
  '$http',
  '$window',
  '$location',
  'Upload',
  function($scope, $http, $window, $location, Upload) {

    // file variables
    $scope.file = '';
    $scope.uploads = [];
    $scope.comment = '';

    // validate and upload files on submit
    $scope.submitImg = function() {
      if ($scope.k9form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
        console.log('in submitIMG function, file to upload:', $scope.file);
      }
    };

    // upload files to S3 and to the database
    $scope.upload = function(file) {
      Upload.upload ({
        url: '/userDash/uploads',
        data: {
          file: file,
          'user': $scope.user,
          'comment': $scope.comment
        }
      }).then(function(resp) {
        console.log('success: ' + resp.config.data.file.name + ' uploaded and file at ' + resp.data.location);

        // then, if success, also collect input & send data and file location to database
        var imgToServer = {
          url: resp.data.location
        };
        console.log('send img to server: ', imgToServer);

        // post method to send object to database
        $http({
          method: 'POST',
          url: '/userDash/submitImg',
          data: imgToServer
        }).then(function() {
          console.log('submitImg post success');
        });
      }, function(resp) {
        console.log('Error status: ' + resp.status);
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    };
}]); // end ImgController

////////////////////////////////////////////////////////////
//         SquadImgController for Squad Photos            //
////////////////////////////////////////////////////////////
angular.module('myApp').controller('SquadImgController', [
  '$scope',
  '$http',
  '$window',
  '$location',
  'Upload',
  function($scope, $http, $window, $location, Upload) {

    // file variables
    $scope.file = '';
    $scope.uploads = [];
    $scope.comment = '';

    // validate and upload files on submit
    $scope.submitSquadImg = function() {
      if ($scope.k9form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
        console.log('in submitSquadImg function, file to upload:', $scope.file);
      }
    };

    // upload files to S3 and to the database
    $scope.upload = function(file) {
      Upload.upload ({
        url: '/userDash/uploads',
        data: {
          file: file,
          'user': $scope.user,
          'comment': $scope.comment
        }
      }).then(function(resp) {
        console.log('success: ' + resp.config.data.file.name + ' uploaded and file at ' + resp.data.location);

        // then, if success, also collect input & send data and file location to database
        var imgToServer = {
          url: resp.data.location
        };
        console.log('send img to server: ', imgToServer);

        // post method to send object to database
        $http({
          method: 'POST',
          url: '/userDash/submitImg',
          data: imgToServer
        }).then(function() {
          console.log('submitImg post success');
        });
      }, function(resp) {
        console.log('Error status: ' + resp.status);
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    };
}]); // end SquadImgController
