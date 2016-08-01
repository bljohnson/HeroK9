var myApp = angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'ui.bootstrap',
  'ngMessages',
  'ngFileUpload'
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
    when('/handlerform', {
      templateUrl: '/views/handlerform.html',
      controller: 'HandlerController'
    }).
    when('/usersubmit', {
      templateUrl: '/views/usersubmit.html',
      controller: 'UserSubmitController'
    }).
    when('/userdash', {
      templateUrl: '/views/userdash.html',
      controller: 'UserDashController'
    }).
    when('/application', {
      templateUrl: '/views/application.html',
      controller: 'AppController'
    }).
    when('/submitted',{
      templateUrl: '/views/submitInquiry.html',
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
      console.log(data);
        if (data.status_id == 99) {$window.location.href = '/adminView';}
        else if (data.status_id == 1) {$window.location.href = 'views/#/user';}

    }).error(function(err){
      console.log(err);
        $window.location.href = 'views/failure.html';
    });
  };

  $scope.sendMail = function (){
    var mailObj = {
      to: "", //email to send to
      from : "",
      subject: "",
      text: ""
    };
    console.log(mailObj);
    $http({
      method: 'POST',
      url: '/sendMail',
      data: mailObj,
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    }).then(function(Response) {
  console.log("in sendMail post call success: ",Response);
  }).error(function(Response) {
  console.log(Response);
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

  $scope.times = ["Morning", "Afternoon", "Evening"];
     $scope.contactTime = '';
     $scope.getContactTime = function() {
       if ($scope.contactTime !== undefined) {
         return $scope.contactTime;
       } else {
         return "Please select a time";
       }
     };
  $scope.sendInquiry = function(){
    var testObject = {
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
	$scope.roles = ["K9 Handler", "K9 Unit Supervisor", "Department Admin", "Other Admin Staff", "Other Command Staff"];
	   $scope.role;
	   $scope.getRole = function() {
	     if ($scope.role !== undefined) {
		 return $scope.role;
	     } else {
		 return "Please select a role";
	     }
	   };

	   $scope.times = ["Morning", "Afternoon", "Evening"];
	      $scope.contactTime = '';
	      $scope.getContactTime = function() {
	        if ($scope.contactTime !== undefined) {
	          return $scope.contactTime;
	        } else {
	          return "Please select a time";
	        }
	      };
  // $scope.checkEmail = function(){
  //   if($scope.emailConfirm !== $scope.emailAddress){
  //     $scope.emailMatch = true;
  //     // document.getElementsByName("submit")[0].disabled = true;
  //     return false;
  //   }
  //   $scope.emailMatch = false;
    // document.getElementsByName("submit")[0].disabled = false;
  // };

  // $scope.alertEmail = function(){
  //   if($scope.emailConfirm !== $scope.emailAddress){
  //     alert('Your email does not match');
  //   }
  // };

  // $scope.checkCell = function(){
  //   if($scope.cellConfirm !== $scope.cell){
  //     $scope.cellMatch = true;
  //     // document.getElementsByName("submit")[0].disabled = true;
  //     return false;
  //   }
  //   $scope.cellMatch=false;
    // document.getElementsByName("submit")[0].disabled = false;
  // };

  // $scope.alertCell = function(){
  //   if($scope.cellConfirm !== $scope.cell){
  //     alert('your Cell phone # does not match');
  //   }
  // };

  // $scope.checkBadge = function(){
  //   if($scope.badgeConfirm !== $scope.badge){
  //     $scope.badgeMatch = true;
  //     // document.getElementsByName("submit")[0].disabled = true;
  //     return false;
  //   }
  //   $scope.badgeMatch=false;
    // document.getElementsByName("submit")[0].disabled = false;
  // };

  // $scope.alertBadge = function(){
  //   if($scope.badgeConfirm !== $scope.badge){
  //     alert('your badge # does not match');
  //   }
  // };

  $scope.wuttt = function(){
    if($scope.emailConfirm !== $scope.emailAddress){
      $scope.emailMatch = true;
      document.getElementsByName("submit")[0].disabled = true;
    } if($scope.cellConfirm !== $scope.cell){
      $scope.cellMatch = true;
      document.getElementsByName("submit")[0].disabled = true;
    } if($scope.badgeConfirm !== $scope.badge){
      $scope.badgeMatch = true;
      document.getElementsByName("submit")[0].disabled = true;
    } else {
      document.getElementsByName("submit")[0].disabled = false;
    }
    // if($scope.emailConfirm !== $scope.emailAddress || $scope.cellConfirm !== $scope.cell || $scope.badgeConfirm !== $scope.badge){
    //   document.getElementsByName("submit")[0].disabled = true;
    //   $scope.emailMatch = true;
    //   $scope.cellMatch = true;
    //   $scope.badgeMatch = true;
    // }
    // document.getElementsByName("submit")[0].disabled = false;
    // // $scope.emailMatch = false;
    // // $scope.cellMatch = false;
    // // $scope.badgeMatch = false;
  };



  $scope.breeds = ["German Shepherd", "Belgian Malinois", "Bloodhound", "Other"];
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
 };//end yesnoCheck

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
	   email: $scope.email,
	   password: $scope.password,
	   rank: $scope.rank,
	   role: $scope.role,
	   firstName: $scope.firstName,
	   lastName: $scope.lastName,
	   primaryPhone: $scope.primaryPhone,
	   altPhone: $scope.altPhone,
	   contactEmail: $scope.contactEmail,
	   contactTime: $scope.contactTime,
	   address1: $scope.address1,
	   address2: $scope.address2,
	   city: $scope.city,
	   state: $scope.state,
	   zip: $scope.zip,
	   numberOfDogs: $scope.numberOfDogs,
     k9name: $scope.name,
     breed: breedToSend,
     age: $scope.age,
     certified: $scope.certified,
     activeDuty: $scope.activeDuty,
     retirement: $scope.retirement,
     handlerTitle: $scope.title,
     handlerFirstName: $scope.first,
     handlerLastName: $scope.last,
     handlerBadge: $scope.badge,
     handlerCellPhone: $scope.cell,
     handlerSecondaryCell: $scope.secondaryCell,
     handlerEmail: $scope.emailAddress,
     equipment: [],
     additionalHandler: $scope.additionalHandler
   };//end objectToSend

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

	$http({
		method: 'POST',
		url: '/applicationForm',
		data: objectToSend
	});
 }; //end sendApplication
}]);
