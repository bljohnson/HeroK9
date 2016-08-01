angular.module('myApp').controller('UserSubmitController', [
  '$scope',
  '$http',
  '$window',
  '$location',
  function($scope, $http, $window, $location) {

    // custom welcome message to the user
    $scope.username = "Officer Henry Hall";


}]);
