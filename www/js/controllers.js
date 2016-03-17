angular.module('starter.controllers', ['firebase'])

.controller('DashCtrl', function($scope) {
  $scope.items = [
    {'src':'img/perry.png'},
    {'src':'img/pigeonPoint.jpg'}
  ];

  $scope.slideHasChanged=function(){
    
    $ionSlideBoxDelegate.update();
  }

  $scope.height=document.getElementsByTagName('ion-content')[0].clientHeight;
  $scope.width=document.getElementsByTagName('ion-content')[0].clientWidth;

})



.controller('HotCtrl',function($scope)  {})

.controller('ChatsCtrl', function($scope, Chats,$firebaseArray) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = $firebaseArray(new Firebase('https://experiencett.firebaseio.com/menu'));
  
/*  $scope.test=function(){
    for(var i=0;i<$scope.chats.length;i++)
    {
      console.log($scope.chats[i]);
    }
  };*/

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams,Chats,$firebaseArray) {
  $scope.chats= $firebaseArray(new Firebase('https://experiencett.firebaseio.com/menu/'+$stateParams.chatId+'/activities'));
  $scope.par=$stateParams.chatId;
  $scope.test=function(){
    for(var i=0;i<$scope.chats.length;i++)
    {
      
        //$scope.chats.splice(i,1);
        console.log($scope.chats[i]);
      
    }
  };
})

.controller('ChatChooseCtrl', function($scope, $stateParams,Search,$firebaseArray,$state,$filter) {
 /* console.log($state.current.name);
  $scope.chats= $firebaseArray(new Firebase('https://experiencett.firebaseio.com/experiences/'+$stateParams.chatId+'/activities/'+$stateParams.chatId2+''));
  $scope.par=$stateParams.chatId;
  $scope.par2=$stateParams.chatId2;*/
  /*$scope.title=$stateParams.cho;*/
  $scope.chats=Search.all();
  $scope.par1=$filter('lowercase')($stateParams.cat);
  $scope.par2=$filter('lowercase')($stateParams.cho);
  console.log($scope.par1);
  console.log($scope.par2);


})

.controller('DetailsCtrl',function($scope,$stateParams,Search,$state,$firebaseArray,$ionicHistory,$filter,$window){
  /*var ref= new Firebase('https://experiencett.firebaseio.com/experiences/');
   $scope.back=function(){
     window.history.back();
   };*/
   //$scope.chats=Seach.all();
   $scope.mheight=''+$window.innerHeight/2+'px';
   console.log($scope.mheight);
   var lower=$filter('lowercase')($stateParams.act);
   console.log(lower);
    $scope.chats= Search.get(lower);
    $scope.test=function(){
      for(var i=0;i<$scope.chats.length;i++)
      {
        
          //$scope.chats.splice(i,1);
          console.log($scope.chats[i]);
        
      }
  };
   
})

.controller('SearchCtrl', function($scope) {
   
})

.controller('AccountCtrl', function($scope,$state,userData) {

  var ref = new Firebase("https://experiencett.firebaseio.com");

  $scope.UserName=userData.getData();

    $scope.logout=function(){
      ref.unauth();

      console.log("Loggin out");
      $state.go('login');
    }
    
  $scope.settings = {
    enableFriends: true
  };
})

.controller("ScaffoldCtrl",function($scope,$state,userData){
  var ref = new Firebase("https://experiencett.firebaseio.com");
    
    $scope.UserName=userData.getData();

    $scope.logout=function(){
      ref.unauth();
      console.log("Loggin out");
      $state.go('login');
    }

    $scope.navAccount=function(){
       $state.go('account');
    }

    $scope.navHome=function(){
       $state.go('tab.dash');
    }    
  ;
})

.controller("loginCtrl",function($scope,$state,Auth,userData,$ionicPopup){

  var ref = new Firebase("https://experiencett.firebaseio.com");
  $scope.register=function(usr_email,usr_password){
    
    ref.createUser({
      email    : usr_email,
      password : usr_password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
         var alertPopup = $ionicPopup.alert({
                title: 'Sign Up failed!',
                template: 'User already exists'
            });
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        $scope.emailLogin(usr_email,usr_password);
      }
    });
  }

  $scope.emailLogin= (function(usr_email,usr_password){
    ref.authWithPassword({
      email    : usr_email,
      password : usr_password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
         var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
      } 
      else {
        console.log("Authenticated successfully with payload:", authData);
        $scope.authData = authData;

//REMEMBER TO INCLUDE IN FACEBOOK ONCE FB LOGIN IS UP
        var email=authData.password.email;
        email=email.substring(0, email.indexOf("@"));
        userData.setData(email);

        $state.go('tab.dash');
      }
    });
  })
  
  $scope.fblogin = function(){
	 
	 Auth.$authWithOAuthRedirect("facebook").then(function(authData){ 
      //Succesful login 
      //user successfully logged in 
      //can log to the console since we are using a pop up

      console.log("authWithOAuthRedirect Login : "+authData);
      $scope.authData = authData;
      $state.go('tab.dash');   

      })
      .catch(function(error){
        if (error.code === "TRANSPORT_UNAVAILABLE") {
          Auth.$authWithOAuthPopup("facebook").then(function(authData){ 
          
              //Succesful login 
              console.log("authWithOAuthPopup Login: "+authData);
              $scope.authData = authData;
              $state.go('tab.dash'); 

          })
          .catch(function(error){     
            //another error occured
            console.log("error: " +error);

            var alertPopup = $ionicPopup.alert({
                title: 'Facebook Login failed!',
                template: 'Please retry or try email/pasword login!'
            });
          })
        }
        else{  
            var alertPopup = $ionicPopup.alert({
                title: 'Facebook Login failed!',
                template: 'Please retry or try email/pasword login!'
            });
        }
      })
       
    Auth.$onAuth(function(authData){
        if(authData === null){
          console.log("Not logged in yet");
          $state.go('login');
        }
        else{
          console.log("Logged in as "); console.log(authData);
          $state.go('tab.dash');
        }
        $scope.authdata = authData; //Display the username in our view
      }
    );

  };
});
