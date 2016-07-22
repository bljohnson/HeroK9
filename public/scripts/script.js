var myApp = angular.module('myApp', []);


myApp.controller('loginController', ['$scope', '$http', function( $scope , $http){

  $scope.register = function(){
    var loginObject = {
      email: $scope.email,
      password: $scope.password
    };

    $http({
      method: 'POST',
      url: '/register',
      data: loginObject
    });
  };

}]);
