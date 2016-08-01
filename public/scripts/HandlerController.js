angular.module('myApp').controller('HandlerController', [
  '$scope',
  '$http',
  '$window',
  '$location',
  'Upload',
  function($scope, $http, $window, $location, Upload) {

    // custom welcome message to the user
    $scope.username = "Officer Henry Hall";

    ////////////////////////////////////////////////////////////
    //                  FORM FUNCTIONALITY                    //
    ////////////////////////////////////////////////////////////

    // certification checkboxes
    $scope.certifications = ['Explosives', 'Narcotics', 'Patrol', 'Trailing/Tracking', 'Other'];
    $scope.selected = [1];

    $scope.toggle = function (cert, list) {
      var idx = list.indexOf(cert);
      if (idx > -1) {
        list.splice(idx, 1);
      }
      else {
        list.push(cert);
      }
    };
    $scope.exists = function (cert, list) {
      return list.indexOf(cert) > -1;
    };
    $scope.isIndeterminate = function() {
      return ($scope.selected.length !== 0 &&
          $scope.selected.length !== $scope.certifications.length);
    };
    $scope.isChecked = function() {
      return $scope.selected.length === $scope.certifications.length;
    };
    $scope.toggleAll = function() {
      if ($scope.selected.length === $scope.certifications.length) {
        $scope.selected = [];
      } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
        $scope.selected = $scope.certifications.slice(0);
      }
    };

    // select vest colors
    $scope.colors = ['Black', 'Multi-Cam', 'Ranger Green', 'Tan'];
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
        bio: $scope.k9Bio,
        back: $scope.k9Back,
        chest: $scope.k9Chest
      };
      $http({
        method: 'POST',
        url: '/userDash/submitK9App',
        data: k9AppToSend
      }).success(function() {
        console.log('in /submitK9App: ', k9AppToSend);
      });
    };


}]); // end HandlerController


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
      if ($scope.form.file.$valid && $scope.file) {
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
      if ($scope.form.file.$valid && $scope.file) {
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
}]);
