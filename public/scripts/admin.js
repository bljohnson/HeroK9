var myApp = angular.module('myApp', ['ngMaterial', 'xeditable', 'ngMessages']);

// xeditable Initialize
myApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

myApp.controller('adminViewController', ['$scope', function($scope){
  console.log("In adminView");

  //View selection
  $scope.tabs = [
    {url: './views/partials/snippit.html'},
    {url: './views/partials/inquiryTable.html'},
    {url: './views/partials/applicationTable.html'},
  ];

  //Initialize with this partial
  $scope.activeTab = $scope.tabs[0];
  $scope.awayFromHome = false;

  $scope.viewControl = function(tab){
    console.log('In tab change');

    $scope.activeTab = $scope.tabs[tab];

    switch (tab) {
      case 0:
        $scope.awayFromHome = false;
      case 1:
      case 2:
      case 3:
        $scope.awayFromHome = true;
        break;
      default:

    }

  };

}]);//End adminView controller


myApp.controller('snippitController', ['$scope', '$http', function($scope, $http){

  $scope.showCancelMessage = false;

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

   $scope.username = snippitData.user;

   $scope.messages = snippitData.messages;
  });


  $scope.showInquiries = function(){

    //Set the ng-include
    $scope.viewControl(1);
    $scope.adminTable = true;

  };//End showInquiries


  $scope.showApplications = function(){

    //Set the ng-include
    $scope.viewControl(2);
    $scope.adminTable = true;

  };//End showApplications


  $scope.newMessage = function(){
    if ($scope.showCancelMessage == false){
      console.log('was false, now true', $scope.showCancelMessage);
      $scope.showCancelMessage = true;
    } else {
      console.log('was true, now false', $scope.showCancelMessage);
      $scope.showCancelMessage = false;
    }
  };

  $scope.sendMessage = function(){

    var messageToSend = {
      message: $scope.messageBody,
      subject: $scope.messageSubject
    };

    console.log(messageToSend);

    $http({
      method: 'POST',
      url: '/snippitInfo/newMessage',
      data: messageToSend
    }).then(function(){
      $scope.messages.push(messageToSend);
      $scope.showCancelMessage = false;
    });

  };


  $scope.deleteMessage = function(index){

    console.log('Deleting message id:', $scope.messages[index].id);

    var deleteMessage = {
      id: $scope.messages[index].id
    };

    $scope.messages.splice(index,1);

    console.log(deleteMessage);

    $http({
      method: 'PUT',
      url: '/snippitInfo/deleteMessage',
      data: deleteMessage
    });

  };


  $scope.expandMessage = function(index){

    if (document.getElementById('expandMessage' + index).style.display == "none"){
      this.backgroundColor = "#AAAAAA";
      document.getElementById('expandMessage' + index).style.display = "table-row";
    } else if (document.getElementById('expandMessage' + index).style.display == "table-row"){
      this.backgroundColor = "#FFFFFF";
      document.getElementById('expandMessage' + index).style.display = "none";
    }

  };

}]);//End snippitController


myApp.controller('inquiryTableController', ['$scope', '$http', function($scope, $http){

  //initialize
    //In applicationTable, to show dogTable
    $scope.applicationTable = false;

    //In adminTable Partial
    $scope.adminTable = true;

  //Make a call to populate inquiryTable
  $http({
    method: 'GET',
    url: 'adminTable/inquiryTable'
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

  $scope.sendApproveMail = function (index){
    var mailObject = {
      to: $scope.inquiryData[index].contact_email,
      subject: "Your inquiry has been approved",
      admin: $scope.inquiryData[index].contact_email
    };

    $http({
      method: 'POST',
      url: '/sendMail',
      data: mailObject
    }).then(function(Response) {
  console.log("in sendMail post call success: ", Response);
  }).error(function(Response) {
  console.log(Response);
  });
  };

  $scope.approveInquiry = function(e, index) {


    var firstName = $scope.inquiryData[index].first_name;
    var statusData = {
      contact_email: $scope.inquiryData[index].contact_email,
      status_id: $scope.inquiryData[index].status_id
    };



    if ($scope.inquiryData[index].status_id == 3){
      var r = confirm("Would you like to resend " + firstName + "'s applicationForm?");
      if (r === true) {
        $scope.inquiryData[index].statusAlert = 'Another email has been sent to ' + firstName + ' with instructions for the application process.';
        $scope.alertStatus = "alert alert-success";
        $scope.sendApproveMail(index);
      } else {
        $scope.inquiryData[index].statusAlert = firstName + ' was not sent another email.';
        $scope.alertStatus = "alert alert-warning";
      }
    } else {
      var r = confirm("Are you sure you would like to approve " + firstName + "'s inquiry?");
      if (r === true) {

        $http({
          method: 'POST',
          url: '/updateStatus',
          data: statusData
        }).then(function(data){
          $scope.inquiryData[index].status_id = data.data;
        });

         $scope.inquiryData[index].statusAlert = firstName + ' has been approved!  An email has been sent to ' + firstName + ' with instructions for the application process.';
         $scope.alertStatus = "alert alert-success";
         $scope.sendApproveMail(index);
       } else {
         $scope.inquiryData[index].statusAlert = firstName + ' has not been approved.';
         $scope.alertStatus = "alert alert-warning";
       }
    }

  };//End approveInquiry


  $scope.deleteInquiry = function(e, index) {

    var deleteUserObject = {
      contact_email: $scope.inquiryData[index].contact_email
    }

    var firstName = $scope.inquiryData[index].first_name;

    var r = confirm("Are you sure you would like to approve " + firstName + "'s inquiry?");
    if (r === true){

      $http({
        method: 'POST',
        url: '/deleteUser',
        data: deleteUserObject
      });


       $scope.status = firstName + ' has been approved!';
       $scope.alertStatus = "alert alert-success";
       $scope.sendApproveMail(index);
     } else {
       $scope.status = firstName + ' has not been approved.';
       $scope.alertStatus = "alert alert-warning";
     }

  };//End approveInquiry


  $scope.deleteInquiry = function(e, index) {

    var deleteUserObject = {
      contact_email: $scope.inquiryData[index].contact_email
    };

    var firstName = $scope.inquiryData[index].first_name;
    var r = confirm("Are you sure you would like to approve " + firstName + "'s inquiry?");
    if (r === true){

      $http({
        method: 'POST',
        url: '/deleteUser',
        data: deleteUserObject
      });


      $scope.status = firstName + ' has been deleted from your records!';
      $scope.alertStatus = "alert alert-success";
    } else {
      $scope.status = firstName + ' has not been deleted from your records.';
      $scope.alertStatus = "alert alert-warning";
    }
  };



}]);//End inquiryTableController


myApp.controller('applicationTableController', ['$scope', '$http', function($scope, $http){

  //Initialize
    //In applicationTable, to show dogTable
    $scope.applicationTable = true;

    //In adminTable Partial
    $scope.adminTable = true;

  //Make a call to populate applicationTable
  $http({
    method: 'GET',
    url: 'adminTable/applicationTable'
  }).
  then(function(tableData){
    //Bind the returned data
    tableData = tableData.data;
    console.log(tableData);
    $scope.applicationData = tableData;
  });


  $scope.expandView = function(index){

    sendUserInfo = {
      user_id: $scope.applicationData[index].id
    };

    //Get Department Dogs
    $http({
      method: 'POST',
      url: 'adminTable/dogTable',
      data: sendUserInfo
    }).then(function(tableData){
      tableData = tableData.data;
      console.log("back from /dogTable with,", tableData);
      $scope.dogDataTable = tableData;
    });

    var statusData = {
      contact_email: $scope.applicationData[index].contact_email,
      status_id: $scope.applicationData[index].status_id
    };

    //Check to see if the application/inquiry is new
    if ($scope.applicationData[index].status_id == 1 || $scope.applicationData[index].status_id == 4){
      $http({
        method: 'POST',
        url: '/updateStatus',
        data: statusData
      })
      .then(function(data){
        $scope.applicationData[index].status_id = data.data;
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

}]);//End applicationTableController


myApp.controller('adminEditController', ['$scope', '$http', function($scope, $http){


  $scope.saveUser = function(index) {

    //Will need more fields
    var user = {
      id: $scope.applicationData[index].id,
      primary_phone: $scope.applicationData[index].primary_phone,
      alt_phone: $scope.applicationData[index].alt_phone,
      email: $scope.applicationData[index].email,
      contact_email: $scope.applicationData[index].contact_email,
      contact_time: $scope.applicationData[index].contact_time,
      add_street1: $scope.applicationData[index].dept_add_street1,
      add_street2: $scope.applicationData[index].dept_add_street2,
      add_city: $scope.applicationData[index].dept_add_city,
      add_state: $scope.applicationData[index].dept_add_state,
      add_zip: $scope.applicationData[index].dept_add_zip
};

    console.log(user);


    // $scope.user already updated!
    return $http.post('/adminEdit/saveUser', user).error(function(err) {
      if(err.field && err.msg) {
        // err like {field: "name", msg: "Server-side error for this username!"}
        $scope.userForm.$setError(err.field, err.msg);
      } else {
        // unknown error
        $scope.userForm.$setError('name', 'Unknown error!');
      }
    });
  };//End saveUser

  $scope.deleteInquiry = function(e, index) {

    var deleteUserObject = {
      contact_email: $scope.applicationData[index].contact_email
    }

    var firstName = $scope.applicationData[index].first_name;
    var r = confirm("Are you sure you would like to approve " + firstName + "'s inquiry?");
    if (r === true){

      $http({
        method: 'POST',
        url: '/deleteUser',
        data: deleteUserObject
      });


      $scope.applicationData[index].statusAlert = firstName + ' has been deleted from your records!';
      $scope.alertStatus = "alert alert-success";
    } else {
      $scope.applicationData[index].statusAlert = firstName + ' has not been deleted from your records.';
      $scope.alertStatus = "alert alert-warning";
    }
  };


}]);//End adminEditController


myApp.controller('dogTableController', ['$scope', '$http', function($scope, $http){

  $scope.expandDogView = function(index){

    console.log('expandDogView clicked');

    if (document.getElementById('expandDog' + index).style.display == "none"){
      this.backgroundColor = "#AAAAAA";

      $scope.dogInfo[index] = true;
      // document.getElementById('expandDog' + index).style.display = "table-row";
    } else if (document.getElementById('expandDog' + index).style.display == "table-row"){
      this.backgroundColor = "#FFFFFF";

      $scope.dogInfo[index] = false;
      // document.getElementById('expandDog' + index).style.display = "none";
    }

  };

}]);//End dogTableController


myApp.controller('dogEditController', ['$scope', '$http', '$filter', function($scope, $http, $filter){

  $scope.bool = [
    {value: true, text: 'True'},
    {value: false, text: 'False'}
  ];

  $scope.showStatusRetirement = function() {
    var selectedRetirement = $filter('filter')($scope.bool, {value: $scope.dogData.k9_retirement});
    return ($scope.dogData.k9_retirement && selectedRetirement.length) ? selectedretirement[0].text : 'Not set';
  };

  $scope.showStatusDuty = function() {
    var selectedDuty = $filter('filter')($scope.bool, {value: $scope.dogData.k9_active_duty});
    return ($scope.dogData.k9_active_duty && selectedDuty.length) ? selectedDuty[0].text : 'Not set';
  };

  $scope.showStatusSquad = function() {
    var selectedSquad = $filter('filter')($scope.bool, {value: $scope.dogData.squad_retirement});
    return ($scope.dogData.squad_retirement && selectedSquad.length) ? selectedSquad[0].text : 'Not set';
  };


  $scope.saveDog = function(index) {

    console.log('Index:', index);
    console.log('ID:', $scope.dogDataTable[index].id);

    //Will need more fields
    var dog = {
      id: $scope.dogDataTable[index].id,
      breed: $scope.dogDataTable[index].breed,
      age: $scope.dogDataTable[index].age,
      k9_active_duty: $scope.dogDataTable[index].k9_active_duty,
      k9_retirement: $scope.dogDataTable[index].k9_retirement,
      handler_rank: $scope.dogDataTable[index].handler_rank,
      handler_first_name: $scope.dogDataTable[index].handler_first_name,
      handler_last_name: $scope.dogDataTable[index].handler_last_name,
      handler_badge: $scope.dogDataTable[index].handler_badge,
      handler_cell_phone: $scope.dogDataTable[index].handler_cell_phone,
      handler_secondary_phone: $scope.dogDataTable[index].handler_secondary_phone,
      handler_email: $scope.dogDataTable[index].handler_email,
      k9_back: $scope.dogDataTable[index].k9_back,
      k9_chest: $scope.dogDataTable[index].k9_chest,
      k9_girth: $scope.dogDataTable[index].k9_girth,
      k9_undercarriage: $scope.dogDataTable[index].k9_undercarriage,
      k9_vest_color: $scope.dogDataTable[index].k9_vest_color,
      k9_vest_imprint: $scope.dogDataTable[index].k9_vest_imprint,
      squad_make: $scope.dogDataTable[index].squad_make,
      squad_model: $scope.dogDataTable[index].squad_model,
      squad_year: $scope.dogDataTable[index].squad_year,
      squad_retirement: $scope.dogDataTable[index].squad_retirement
};

    console.log(dog);


    // $scope.user already updated!
    return $http.post('/adminEdit/saveDog', dog).error(function(err) {
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
