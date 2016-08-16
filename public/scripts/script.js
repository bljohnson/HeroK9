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
    when('/agreement',{
      templateUrl: '/views/agreement.html'
    }).
    otherwise({
      redirectTo: '/home'
    });
}]);



myApp.controller('loginController', ['$scope', '$rootScope' , '$http', '$window', '$location', function( $scope ,$rootScope , $http, $window, $location){

  $http({
    method: "GET",
    url: '/user/'
  }).
    success(function(data){
      console.log("on load ", data);
      if (data === false) {
        $rootScope.isUserLoggedIn = false;
      } else if (data.id !== undefined) {
        $rootScope.isUserLoggedIn = true;
      } else { console.log("how?");}

  });

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
    }).success(function(){
      $http({
      method: "POST",
      url: '/index',
      data: regObject
    }).success(function(data){
        console.log(data);
          if (data.status_id == 99) {$window.location.href = '/adminView';}
          else if (data.status_id == 3) {$window.location.href = '/#/application';}
          else {$window.location.href = "/#/userdash";}

      }).error(function(err){
        console.log(err);
          $window.location.href = 'views/failure.html';
      });
    });
  };

  $scope.login = function (){
    var loginObject = {
      email: $scope.email,
      password: $scope.password
    };
    $http({
      method: "POST",
      url: '/index',
      data: loginObject
    }).success(function(data){
        console.log(data);
          if (data.status_id == 99) {$window.location.href = '/adminView';}
          else if (data.status_id == 3 || 4) {$window.location.href = '/#/application';}
          else {$window.location.href = "/#/userdash";}

      }).error(function(err){
        console.log(err);
          $window.location.href = 'views/failure.html';
      });
    };

    $scope.logout = function (){
      $http({
        method: "GET",
        url: '/user/logout'
      });
    $rootScope.isUserLoggedIn = false;
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
    url: '/applicationForm/formData'
  }).then(function(data){
    data = data.data;
    console.log(data);
    $scope.equipmentList = data;
  }).then(function(){
    $http({
      method: 'GET',
      url: '/user'
    }).then(function(userData){
      userData = userData.data;
      console.log(userData);
    });
  });

  $http({
    method: 'GET',
    url: '/user'
  }).then(function(userData){
    userData = userData.data;
    console.log(userData);

    //Scope in userData
    $scope.status_id = userData.status_id;
    $scope.role = userData.role;
    $scope.rank = userData.rank;
    $scope.firstName = userData.first_name;
    $scope.lastName = userData.last_name;
    $scope.primaryPhone = userData.primary_phone;
    $scope.altPhone = userData.alt_phone;
    $scope.contactEmail = userData.contact_email;
    $scope.time = userData.contact_time;
    $scope.address1 = userData.dept_add_street1;
    $scope.address2 = userData.dept_add_street2;
    $scope.city = userData.dept_add_city;
    $scope.state = userData.dept_add_state;
    $scope.zip = userData.dept_add_zip;
    $scope.numberOfDogs = userData.dept_k9s;

  });


	$scope.roles = ["K9 Handler", "K9 Unit Supervisor", "Department Admin", "Other Admin Staff", "Other Command Staff"];
	$scope.getRole = function() {
   if ($scope.role !== undefined) {
     return $scope.role;
    } else {
	    return "Please select a role";
    }
  };

	$scope.times = ["Morning", "Afternoon", "Evening"];
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


  //Send userInfo to updateStatus
  var userInfo = {
    contact_email: $scope.contactEmail,
    status_id: $scope.status_id
  };

  $http({
    method: 'POST',
    url: '/updateStatus',
    data: userInfo
  });

};

$scope.sendLegalAgreement = function() {
	var legalToSend = {
		signature: $scope.signature,
		badgeSignature: $scope.badgeSignature
	}; // end legalToSend

	console.log(legalToSend);
	$http({
		  method: 'POST',
		  url: '/applicationForm/part3',
		  data: legalToSend
	  });
}; // end sendLegalAgreement



$scope.go = function(path){
  $location.path(path);
};
}]);

myApp.factory('check', ['$http', '$rootScope', '$location', function($http, $rootScope, $location) {


}]);
