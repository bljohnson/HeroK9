var myApp = angular.module('myApp', [
  'ngRoute'
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: '/views/home.html',
    }).
    when('/inquiry', {
      templateUrl: '/views/inquiry.html'
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
