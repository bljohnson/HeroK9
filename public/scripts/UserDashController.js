angular.module('myApp').controller('UserDashController', [
  '$scope',
  '$http',
  '$window',
  '$location',
  function($scope, $http, $window, $location) {

    // custom welcome message to the user
    $scope.username = "Officer Henry Hall";


}]);
