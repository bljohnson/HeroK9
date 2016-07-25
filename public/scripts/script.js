var myApp = angular.module('myApp', []);


myApp.controller('loginController', ['$scope', '$http', '$location', function( $scope , $http, $location){

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
        $location.path('/success');
      });
};
}]);
