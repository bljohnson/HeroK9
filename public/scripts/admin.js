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


//Dummy data
var tableData = [
  {
    id: '12345',
    fName: 'Jack',
    lName: 'Mehoff',
    phone: '1234567890',
    email: 'fakeEmail@fake.com'
  },
  {
    id: '54321',
    fName: 'Al',
    lName: 'Coholic',
    phone: '1010101010',
    email: 'sloppy@fake.com'
  },
  {
    id: '66666',
    fName: 'Seymour',
    lName: 'Butz',
    phone: '3333333333',
    email: 'booty@fake.com'
  },
  {
    id: '101001',
    fName: 'Amanda',
    lName: 'Hugginkiss',
    phone: '4443332222',
    email: 'smooches@fake.com'
  }
];//End Dummy Data


myApp.controller('inquiryTableController', ['$scope', function($scope){

  // //Make a call to populate inquiryTable
  // $http({
  //
  // }).
  // then(function(tableData){
  //   //Bind the returned data
    $scope.inquiryData = tableData;
  // });


  $scope.expandView = function(index){
    console.log(index, 'was clicked.');
  };

}]);//End inquiryTableController


myApp.controller('applicationTableController', ['$scope', function($scope){

  // //Make a call to populate applicationTable
  // $http({
  //
  // }).
  // then(function(tableData){
  //   //Bind the returned data
    $scope.applicationData = tableData;
  // });


  $scope.expandView = function(index){
    console.log(index, 'was clicked.');
  };

}]);//End applicationTableController
