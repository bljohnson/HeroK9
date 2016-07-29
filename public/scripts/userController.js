angular.module('myApp').controller('UserController', [
  '$scope',
  '$http',
  '$window',
  '$location',
  'Upload',
  function($scope, $http, $window, $location, Upload) {

    // custom welcome message to the user
    $scope.username = "Officer Henry Hall";

    ////////////////////////////////////////////////////////////
    //                      FILE UPLOADS                      //
    ////////////////////////////////////////////////////////////

    // file variables
    $scope.file = '';
    $scope.uploads = [];
    $scope.comment = '';

    // validate and upload files on submit
    $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
          $scope.upload($scope.file);
          console.log('in submit function, file to upload:', $scope.file);
      }
    };

    // upload files to S3
    $scope.upload = function(file) {
      Upload.upload ({
        url: '/userDash/uploads',
        data: {
          file: file,
          'user': $scope.user,
          'comment': $scope.comment
        }
      }).then(function(resp) {
        console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
      }, function(resp) {
        console.log('Error status: ' + resp.status);
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    };











}]);
