angular.module('myApp').controller('UserDashController', [
  '$scope',
  '$http',
  '$window',
  '$location',
  function($scope, $http, $window, $location) {

	  $http({
		method: 'GET',
		url: '/userDash'
	}).then(function(data){ // query results
		data = data.data; // scope in where you want stuff to go
		console.log(data);
	});

    // custom welcome message to the user
    $scope.username = "Officer Henry Hall";

	// test //
	$scope.userStatus = [
		{ status: "visited", name: "Application In Review"},
		{ status: "active", name: "Application Approved"},
		{ status: "", name: "Grant Approved"},
		{ status: "", name: "Order Sent In"},
		{ status: "", name: "Shipped"}
	];

 	// create button on user dash for admin only to update status to update progress bar
	$scope.setStatus = function( newStatus ){
			if( status === 0 ){
				$scope.userStatus = [
					{ status: "active", name: "Application In Review"},
					{ status: "", name: "Application Approved"},
					{ status: "", name: "Grant Approved"},
					{ status: "", name: "Order Sent In"},
					{ status: "", name: "Shipped"}
				];
			}// end 0
			if( status === 1 ){
				$scope.userStatus = [
					{ status: "visited", name: "Application In Review"},
					{ status: "active", name: "Application Approved"},
					{ status: "", name: "Grant Approved"},
					{ status: "", name: "Order Sent In"},
					{ status: "", name: "Shipped"}
				];
			}// end 1
			if( status === 2 ){
				$scope.userStatus = [
					{ status: "visited", name: "Application In Review"},
					{ status: "visited", name: "Application Approved"},
					{ status: "active", name: "Grant Approved"},
					{ status: "", name: "Order Sent In"},
					{ status: "", name: "Shipped"}
				];
			}// end 2
			if( status === 3 ){
				$scope.userStatus = [
					{ status: "visited", name: "Application In Review"},
					{ status: "visited", name: "Application Approved"},
					{ status: "visited", name: "Grant Approved"},
					{ status: "active", name: "Order Sent In"},
					{ status: "", name: "Shipped"}
				];
			}// end 3
			if( status === 4 ){
				$scope.userStatus = [
					{ status: "visited", name: "Application In Review"},
					{ status: "visited", name: "Application Approved"},
					{ status: "visited", name: "Grant Approved"},
					{ status: "visited", name: "Order Sent In"},
					{ status: "active", name: "Shipped"}
				];
			}// end 4
	}; // end setStatus


}]);
