var myApp = angular.module('myApp', []);


myApp.controller('loginController', ['$scope', '$http', function( $scope , $http){

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
    url: '/',
    data: loginObject
  });
};
}]);
