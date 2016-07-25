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
  $scope.roles = ["K9 Handler", "K9 Unit Supervisor", "Department Admin", "Other Admin Staff", "Other Command Staff"];
     $scope.role;
     $scope.getRole = function() {
       if ($scope.role !== undefined) {
         return $scope.role;
       } else {
         return "Please select a role";
       }
     };
  //  $scope.options = ["Morning", "Afternoon", "Evening"];
  //       $scope.selectedItem3;
  //       $scope.getSelectedText3 = function() {
  //         if ($scope.selectedItem3 !== undefined) {
  //           return $scope.selectedItem3;
  //         } else {
  //           return "Please select a time";
  //         }
  //       };
  $scope.times = ["Morning", "Afternoon", "Evening"];
     $scope.contactTime;
     $scope.getContactTime = function() {
       if ($scope.contactTime !== undefined) {
         return $scope.contactTime;
       } else {
         return "Please select a time";
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
