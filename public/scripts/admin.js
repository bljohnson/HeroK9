console.log("Admin.js");

var myApp = angular.module('myApp', ['ngMaterial']);

myApp.controller('adminView', ['$scope', function($scope){
  console.log("In adminView");

  //Dummy Data
  $scope.username = "Dummy Username";

  //View selection
  $scope.tabs = [
    {url: './views/partials/snippit.html'},
    {url: './views/partials/inquiryTable.html'},
    {url: './views/partials/applicationTable.html'},
  ];

  //Initialize with this partial
  $scope.activeTab = $scope.tabs[0];

  $scope.viewControl = function(tab){
    console.log('In tab change');

    $scope.activeTab = $scope.tabs[tab];

  };

}]);//End adminView controller


myApp.controller('snippitController', ['$scope', '$http', function($scope, $http){


  //Initialize by making a call to populate the snippits
  $http({
    method: 'GET',
    url: '/snippitInfo'
  }).
  then(function(snippitData){
    // Bind the returned data

    snippitData = snippitData.data;
    console.log(snippitData);

   $scope.newInquiry = snippitData.inquiry.new;
   $scope.pendingInquiry = snippitData.inquiry.pending;
   $scope.approvedInquiry = snippitData.inquiry.approved;

   $scope.newApplication = snippitData.application.new;
   $scope.pendingApplication = snippitData.application.pending;
   $scope.approvedApplication = snippitData.application.approved;
  });


  $scope.showInquiries = function(){

    //Set the ng-include
    $scope.viewControl(1);

  };//End showInquiries


  $scope.showApplications = function(){

    //Set the ng-include
    $scope.viewControl(2);

  }//End showApplications

}]);//End snippitController


myApp.controller('inquiryTableController', ['$scope', '$http', '$mdDialog', function($scope, $http, $mdDialog){

  //Make a call to populate inquiryTable
  $http({
    method: 'GET',
    url: '/inquiryTable'
  }).
  then(function(tableData){
    //Bind the returned data
    tableData = tableData.data;
    console.log(tableData);
    $scope.inquiryData = tableData;
  });


  $scope.expandView = function(index){

    if (document.getElementById('expand' + index).style.display == "none"){
      this.backgroundColor = "#AAAAAA";
      document.getElementById('expand' + index).style.display = "table-row";
    } else if (document.getElementById('expand' + index).style.display == "table-row"){
      this.backgroundColor = "#FFFFFF";
      document.getElementById('expand' + index).style.display = "none";
    }

  };


}]);//End inquiryTableController


myApp.controller('applicationTableController', ['$scope', '$http', function($scope, $http){

  //Make a call to populate applicationTable
  $http({
    method: 'GET',
    url: '/applicationTable'
  }).
  then(function(tableData){
    //Bind the returned data
    tableData = tableData.data
    console.log(tableData);
    $scope.applicationData = tableData;
  });


  $scope.expandView = function(index){
    console.log(index, 'was clicked.');

  };

}]);//End applicationTableController
