var myApp = angular.module('myApp', [
  'ngRoute', 'ngMaterial'
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: '/views/home.html',
    }).
    when('/inquiry', {
      templateUrl: '/views/inquiry.html',
      controller: 'MainController'
    }).
    otherwise({
    redirectTo: 'home'
  });
}]);

myApp.controller('MainController', ['$scope', '$http', function($scope, $http){
  $scope.validateForm = function(){
    var x = document.forms['inquiry'].value;
    if (x === null || x === ""){
      alert("Please fill out all fields");
      return false;
    }
  };
  $scope.sendInquiry = function(){
    var testObject = {
      authorized: $scope.authorized,
      rank: $scope.rank,
      role: $scope.role,
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      primaryPhone: $scope.primaryPhone,
      altPhone: $scope.altPhone,
      email: $scope.email,
      contactTime: $scope.contactTime,
      address1: $scope.address1,
      address2: $scope.address2,
      city: $scope.city,
      state: $scope.state,
      zip: $scope.zip,
      numberOfDogs: $scope.numberOfDogs,
      authorizedTitle: $scope.authorizedTitle,
      authorizedFirstName: $scope.authorizedFirstName,
      authorizedLastName: $scope.authorizedLastName,
      authorizedPhone: $scope.authorizedPhone,
      authorizedEmail: $scope.authorizedEmail
    };//end object
    $http({
      method: 'POST',
      url: '/sendInquiry',
      data: testObject
    });//end $http
    console.log(testObject);
  };//end sendInquiry
}]);//end controller
