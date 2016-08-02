console.log("Admin.js");

var myApp = angular.module('myApp', ['ngMaterial', 'xeditable']);

// xeditable Initialize
myApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

myApp.controller('adminViewController', ['$scope', function($scope){
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

  };//End showApplications

}]);//End snippitController


myApp.controller('inquiryTableController', ['$scope', '$http', '$mdDialog',  function($scope, $http, $mdDialog){

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

    var statusData = {
      contact_email: $scope.inquiryData[index].contact_email,
      status_id: $scope.inquiryData[index].status_id
    };

    //Check to see if the application/inquiry is new
    if ($scope.inquiryData[index].status_id == 1 || $scope.inquiryData[index].status_id == 4){
      $http({
        method: 'POST',
        url: '/updateStatus',
        data: statusData
      })
      .then(function(data){
        $scope.inquiryData[index].status_id = data.data;
      });


    }

    if (document.getElementById('expand' + index).style.display == "none"){
      this.backgroundColor = "#AAAAAA";
      document.getElementById('expand' + index).style.display = "table-row";
    } else if (document.getElementById('expand' + index).style.display == "table-row"){
      this.backgroundColor = "#FFFFFF";
      document.getElementById('expand' + index).style.display = "none";
    }

  };


  $scope.approveInquiry = function(e, index) {


    var firstName = $scope.inquiryData[index].first_name;
    var statusData = {
      contact_email: $scope.inquiryData[index].contact_email,
      status_id: $scope.inquiryData[index].status_id
    };

    var txt;
    var r = confirm("Are you sure you would like to approve " + firstName + "'s inquiry?");
    if (r === true) {

      $http({
        method: 'POST',
        url: '/updateStatus',
        data: statusData
      });

       $scope.status = firstName + ' has been approved!';
     } else {
       $scope.status = firstName + ' has not been approved.';
     }



  //   // Appending dialog to document.body to cover sidenav in docs app
  //   var confirm = $mdDialog.confirm({
  //     parent: document.body,
  //     targetEvent: e,
  //     template:
  //       '<md-dialog aria-label="Lucky Day">' +
  //       '  <md-title>' +
  //       '   "Are you sure you would like to approve " + firstName + "?"' +
  //       '  </md-title>' +
  //       '  <md-content>' +
  //       '   <p>Hello</p>' +
  //       '  </md-content>' +
  //       '  <div class="md-dialog-actions">' +
  //       '    <md-button ng-click="$mdDialog.cancel()">' +
  //       '      Close Greeting' +
  //       '    </md-button>' +
  //       '  </div>' +
  //       '</md-dialog>',
  //       locals: {
  //         firstName: firstName
  //       }
  //       // bindToController: true,
  //       // controllerAs: 'ctrl',
  //       // controller: 'inquiryTableController'
  //   })
  //         .title('Are you sure you would like to approve ' + firstName + '?')
  //         .textContent('Once you approve ' + firstName + ', they will be sent an email directing them to complete the application process.')
  //         .targetEvent(e)
  //         .ariaLabel('Lucky Day')
  //         .ok('Confirm')
  //         .cancel('Cancel');
  //
  //   $mdDialog.show(confirm).then(function() {
  //     $scope.status = firstName + ' has been approved!';
  //   }, function() {
  //     $scope.status = firstName + ' has not been approved.';
  //   });

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
    tableData = tableData.data;
    console.log(tableData);
    $scope.applicationData = tableData;
  });


  $scope.expandView = function(index){
    console.log(index, 'was clicked.');

  };

}]);//End applicationTableController


myApp.controller('adminEditController', ['$scope', '$http', function($scope, $http){


  $scope.saveUser = function(index) {

    //Will need more fields
    var user = {
      id: $scope.inquiryData[index].id,
      primary_phone: $scope.inquiryData[index].primary_phone,
      alt_phone: $scope.inquiryData[index].alt_phone,
      email: $scope.inquiryData[index].email,
      contact_email: $scope.inquiryData[index].contact_email,
      contact_time: $scope.inquiryData[index].contact_time,
      add_street1: $scope.inquiryData[index].dept_add_street1,
      add_street2: $scope.inquiryData[index].dept_add_street2,
      add_city: $scope.inquiryData[index].dept_add_city,
      add_state: $scope.inquiryData[index].dept_add_state,
      add_zip: $scope.inquiryData[index].dept_add_zip
};

    console.log(user);


    // $scope.user already updated!
    return $http.post('/saveUser', user).error(function(err) {
      if(err.field && err.msg) {
        // err like {field: "name", msg: "Server-side error for this username!"}
        $scope.userForm.$setError(err.field, err.msg);
      } else {
        // unknown error
        $scope.userForm.$setError('name', 'Unknown error!');
      }
    });
  };//End saveUser


}]);//End adminEditController
