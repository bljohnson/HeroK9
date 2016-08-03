var myApp = angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'ui.bootstrap',
  'ngMessages',
  'ngFileUpload'
]
// ,function($locationProvider){
//     $locationProvider.html5Mode({
//   enabled: true,
//   requireBase: true});
// }
);

myApp.config(['$routeProvider', '$locationProvider', '$provide', function($routeProvider, $locationProvider, $provide) {

  $provide.decorator('$sniffer', function($delegate) {
    $delegate.history = false;
    return $delegate;
  });

  $locationProvider.html5Mode(true).hashPrefix('');

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
    when('/part2', {
      templateUrl: '/views/k9application.html',
      controller: 'AppController'
    }).
    when('/part3', {
      templateUrl: '/views/k9application.html',
      controller: 'AppController'
    }).
    when('/submitted',{

      templateUrl: '/views/submitInquiry.html'
    }).
    otherwise({
      redirectTo: 'home'
    });
}]);

myApp.controller('loginController', ['$scope', '$http', '$window', '$location', function( $scope , $http, $window, $location){


  $scope.register = function(){
    // console.log($location.search());
    var regObject = {
      email: $scope.email,
      password: $scope.password,
      contact_email: $location.search().from
    };

    $http({
      method: 'POST',
      url: '/register',
      data: regObject
    }).success(function(data){
      $window.location.href = '/#/application';
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
          else if (data.status_id == 3) {$window.location.href = '/#/application';}
          else {$window.location.href = "/#/userdash";}


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

myApp.controller('MainController', ['$scope', '$http', '$location', function($scope, $http, $location){
  $scope.roles = ["K9 Handler", "K9 Unit Supervisor", "Department Admin", "Other Admin Staff", "Other Command Staff"];
     $scope.role = '';
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
    $scope.go();
  };//end sendInquiry
  $scope.go = function(){
    $location.path('/submitted');
  };
}]);//end controller


myApp.controller('AppController', ['$scope', '$http', '$location', function($scope, $http, $location){

  $http({
    method: 'GET',
    url: '/applicationForm'
  }).then(function(data){
    data = data.data;
    console.log(data);
    $scope.equipmentList = data;
  });


	$scope.roles = ["K9 Handler", "K9 Unit Supervisor", "Department Admin", "Other Admin Staff", "Other Command Staff"];
	$scope.role = '';
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

  $scope.checkEmail = function(){
    if($scope.emailConfirm !== $scope.emailAddress){
      $scope.emailMatch = true;
      // document.getElementsByName("submit")[0].disabled = true;
      console.log('checkEmail no');
      return false;
    }
    $scope.emailMatch = false;
    // document.getElementsByName("submit")[0].disabled = false;
    console.log('checkEmail yes');
  };

  $scope.checkCell = function(){
    if($scope.cellConfirm !== $scope.cell){
      $scope.cellMatch = true;
      // document.getElementsByName("submit")[0].disabled = true;
      console.log('checkCell no');
      return false;
    }
    $scope.cellMatch=false;
    // document.getElementsByName("submit")[0].disabled = false;
    console.log('checkCell yes');
  };

  $scope.checkBadge = function(){
    if($scope.badgeConfirm !== $scope.badge){
      $scope.badgeMatch = true;
      // document.getElementsByName("submit")[0].disabled = true;
      console.log('checkBadge no');
      return false;
    }
    $scope.badgeMatch=false;
    // document.getElementsByName("submit")[0].disabled = false;
    console.log('checkBadge yes');
  };

  $scope.checkAll = function(){
    // $scope.checkEmail();
    // $scope.checkCell();
    // $scope.checkBadge();
    if($scope.badgeConfirm !== $scope.badge){
      $scope.badgeMatch = true;
      console.log('checkBadge no');
      return false;
    } else {
      $scope.badgeMatch = false;
      console.log('checkBadge yes');
    }
    if($scope.cellConfirm !== $scope.cell){
      $scope.cellMatch = true;
      console.log('checkCell no');
      return false;
    } else {
      $scope.cellMatch = false;
      console.log('cellMatch yes');
    }
    if($scope.emailConfirm !== $scope.emailAddress){
      $scope.emailMatch = true;
      console.log('checkEmail no');
      return false;
    } else {
      $scope.emailMatch = false;
      console.log('checkEmail yes');
    }
    if ($scope.emailConfirm !== $scope.emailAddress || $scope.cellConfirm !== $scope.cell || $scope.badgeConfirm !== $scope.badge){
      document.getElementsByName("submit")[0].disabled = true;
    }
    if ($scope.emailConfirm === $scope.emailAddress && $scope.cellConfirm === $scope.cell && $scope.badgeConfirm === $scope.badge){
      document.getElementsByName("submit")[0].disabled = false;
    }
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
   console.log(this.breed);
 };//end yesnoCheck

 $scope.sendApplication = function(){

   var objectToSend = {
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
   };//end objectToSend

   console.log(objectToSend);

	$http({
		method: 'POST',
		url: '/applicationForm/part1',
		data: objectToSend
	});

 }; //end sendApplication

$scope.sendk9 = function(){

  var breedToSend;
  if ($scope.otherBreed !== undefined){
    breedToSend = $scope.otherBreed;
  } else {
    breedToSend = $scope.breed;
  }




  var objectToSend = {
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
  };

  if($scope.kennel !== undefined){
    objectToSend.equipment.push($scope.kennel);
  } if($scope.ballistic !== undefined){
    objectToSend.equipment.push($scope.ballistic);
  } if($scope.multiThreat !== undefined){
    objectToSend.equipment.push($scope.multiThreat);
  } if($scope.doorPop !== undefined){
    objectToSend.equipment.push($scope.doorPop);
  }


  for (var i =0; i<$scope.equipmentList.length; i++){
    if (document.getElementById('equipment' + i).className.indexOf('md-checked') >= 0){
      objectToSend.equipment.push($scope.equipmentList[i].id);
    }
    console.log(objectToSend.equipment);
  }

  $http({
		method: 'POST',
		url: '/applicationForm/part2',
		data: objectToSend
	});

  // $scope.name = '';
  // breedToSend = '';
  // $scope.age = '';
  // $scope.certified = false;
  // $scope.activeDuty = false;
  // $scope.retirement = false;
  // $scope.title = '';
  // $scope.first = '';
  // $scope.last = '';
  // $scope.badge = '';
  // $scope.badgeConfirm = '';
  // $scope.cell = '';
  // $scope.cellConfirm = '';
  // $scope.secondaryCell = '';
  // $scope.emailAddress = '';
  // $scope.emailConfirm = '';
  // $scope.kennel = false;
  // $scope.ballistic = false;
  // $scope.multiThreat = false;
  // $scope.doorPop = false;
};

 $scope.go = function(path){
   $location.path(path);
 };
}]);
