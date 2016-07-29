var myApp = angular.module('myApp', [
  'ngRoute', 'ngMaterial', 'ui.bootstrap'
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
    when('/user', {
      templateUrl: '/views/user.html',
      controller: 'UserController'
    }).
    when('/application', {
      templateUrl: '/views/application.html',
      controller: 'AppController'
    }).
    otherwise({
    redirectTo: 'home'
  });
}]);

myApp.controller('loginController', ['$scope', '$http', '$window', function( $scope , $http, $window){

  $scope.register = function(){
    var regObject = {
      email: $scope.email,
      password: $scope.password
    };

    $http({
      method: 'POST',
      url: '/register',
      data: regObject
    });
  };

  $scope.login = function (){
    var loginObject = {
    username: $scope.email,
    password: $scope.password
  };
  $http({
    method: "POST",
    url: '/index',
    data: loginObject
  }).success(function(data){
        $window.location.href = 'views/success.html';
    }).error(function(err){
      console.log(err);
        $window.location.href = 'views/failure.html';
    });
  };

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
      url: '/inquiryForm',
      data: testObject
    });//end $http
    console.log(testObject);
  };//end sendInquiry
}]);//end controller

myApp.controller('AppController', ['$scope', '$http', function($scope, $http){
  $scope.breeds = ["German Shepherd", "Belgian Malinois", "Bloodhound", "Other"];
  // $scope.breed;
  $scope.getBreed = function() {
    if ($scope.breed !== undefined) {
      return $scope.breed;
    } else {
      return "Please select a breed";
    }
  };//end getBreed
  //this function appends an input field when the "other" option is selected
  $scope.yesnoCheck = function() {
   if (this.breed == "Other") {
     document.getElementById("ifYes").style.display = "block";
   } else {
     document.getElementById("ifYes").style.display = "none";
   }
 };
 // var ok = document.getElementById('checkk');
 // $scope.check = function() {
 //        if (ok.value != document.getElementById('check').value) {
 //            ok.setCustomValidity('Password Must be Matching.');
 //        } else {
 //            // input is valid -- reset the error message
 //            ok.setCustomValidity('');
 //        }
 //    };
 $scope.sendApplication = function(){
  console.log($scope.kennel);
  console.log($scope.bulletResistant);
  console.log($scope.stabResistant);
  console.log($scope.doorPop);
   console.log($scope.otherBreed);
   var breedToSend;
   if ($scope.otherBreed !== undefined){
     breedToSend = $scope.otherBreed;
   } else {
     breedToSend = $scope.breed;
   }

   var objectToSend = {
     name: $scope.name,
     breed: breedToSend,
     age: $scope.age,
     certified: $scope.certified,
     activeDuty: $scope.activeDuty,
     retirement: $scope.retirement,
     title: $scope.title,
     firstName: $scope.first,
     lastName: $scope.last,
     cellPhone: $scope.cell,
     secondaryCell: $scope.secondaryCell,
     email: $scope.emailAddress,
     equipment: [],
     additionalHandler: $scope.additionalHandler
   };

   if($scope.kennel !== undefined){
     objectToSend.equipment.push($scope.kennel);
   } if($scope.bulletResistant !== undefined){
     objectToSend.equipment.push($scope.bulletResistant);
   } if($scope.stabResistant !== undefined){
     objectToSend.equipment.push($scope.stabResistant);
   } if($scope.doorPop !== undefined){
     objectToSend.equipment.push($scope.doorPop);
   }
   console.log(objectToSend);
 };
}]);
