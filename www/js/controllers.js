angular.module('starter.controllers', ['ionic','firebase', 'starter.controllers', 'starter.services','ngCordova'])



.controller('DashCtrl', function($scope,$firebaseArray,$ionicPopup,$ionicLoading,$timeout,$http,Search,Favourites,Preferences) {
  var ref=new Firebase('https://experiencett.firebaseio.com');
  $scope.allPlaces=Search.all();
  $scope.prefs=Preferences.all();

  $scope.prefs.$loaded().then(function(){
    if(!$scope.prefs){  
      var alertPopup = $ionicPopup.alert({
        title: 'Preferences',
        template: 'Go to Account to select User Preferences.'
      });
    }
  })
 
  ref.child("preferences").child((ref.getAuth()).uid).on("value", function(snapshot) {
    
    $scope.places=[];
    $scope.prefs=snapshot.val();

    $scope.allPlaces.$loaded()
      .then(function(){
          angular.forEach($scope.allPlaces, function(pla) {
            
            angular.forEach($scope.prefs, function(pre) {
              
              if(pla.class == pre)
                $scope.places.push(pla);
          })
        })
      })      
  });
  
  $http.get("http://www.myweather2.com/developer/forecast.ashx?uac=QKqRwBWQ-g&query=10.6617,-61.5194&temp_unit=f&output=json")
        .success(function(res){
          console.log(res);
          //console.log(res.weather.curren_weather);
          $scope.forecast = res.weather.curren_weather[0];
          console.log($scope.forecast.temp);
  });

  $scope.addFav=function(val,img){
      Favourites.add(val,img);
  }   
})

.controller('ContactCtrl',function($scope,$cordovaEmailComposer){
  /*$cordovaEmailComposer.isAvailable().then(function() {
   // is available
   alert("available");
 }, function () {
   // not available
   alert("not available");
 });

 $scope.sendEmail = function(){
  var email = {
     to: 'teste@example.com',
     cc: 'teste@example.com',
     bcc: ['john@doe.com', 'jane@doe.com'],
     attachments: [
       'file://img/logo.png',
       'res://icon.png',
       'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
       'file://README.pdf'
     ],
     subject: 'State purpose here (Advertising, Information)',
     body: '',
     isHtml: true
  };

 $cordovaEmailComposer.open(email).then(null, function () {
   // user cancelled email
  });
 }*/
})

.controller('HotCtrl',function($scope,$http)  {

  $scope.places=[];
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var untilMonth;
  var untilYr;

//QUERY GIVES EVENTS FROM CURRENT DATE TO 3 MONTHS IN THE FUTURE BY DATE
  var since=year+"-"+month+"-"+day;

  if (month <=6 ){
    untilMonth=month+4;
    untilYr=year;
  }
  else{
    untilMonth=6-(12-month);
    untilYr=year ++;
  }
 
  var until=untilYr+"-"+untilMonth+"-"+day;
  var access_token="CAACEdEose0cBAMVWJG16Nfney3vboiybMu6eZASZCiNtLOMgQUSedX1ZBCEIhrB4Asox9ZCgGJazC5JZA96bykHZBuzZAZC3KNWlPo5feEVAB77LHzA8BZCuWxoMoEZB1ZAKq6eFiDM3AZAubfmmSfLQ4KGgVOUQeIFThlStKDzMafYd5ZAxJpqnvkcliRi7obZCPJ7Erve6xfjZADdEgZDZD";

   $scope.items = [
    {'src':'img/vert.jpg'},
    {'src':'img/vert2.jpg'}
   
  ];

  $scope.slideHasChanged=function(){
    
    $ionSlideBoxDelegate.update();
  }

  $scope.height=document.getElementsByTagName('ion-content')[0].clientHeight;
  $scope.width=document.getElementsByTagName('ion-content')[0].clientWidth;

  $http.get("https://graph.facebook.com/v2.5/me/events/not_replied?since="+since+"&until="+until+"&fields=cover%2Cowner%2Cdescription&access_token="+access_token+"")
  .success(function(res){
    angular.forEach(res.data,function(event){
      $scope.places.push( event);
    })
    console.log($scope.places);
  });
  
  $http.get("https://graph.facebook.com/v2.5/me/events/?since="+since+"&until="+until+"&fields=cover%2Cowner%2Cdescription&access_token="+access_token+"")
  .success(function(res){
    angular.forEach(res.data,function(event){
      $scope.places.push( event);
    })
    console.log($scope.places);
  });


})

.controller('FavCtrl',function($scope,$state,Favourites){
    var ref=new Firebase('https://experiencett.firebaseio.com');
    
    $scope.favs = Favourites.all();
    $scope.user= Favourites.getInfo();

    ref.child("favourites").child($scope.user.uid).on("value", function(snapshot) {
      $scope.favCount=snapshot.numChildren();
    });

    ref.child("users").child($scope.user.uid).on("value", function(snapshot) {
      $scope.username=snapshot.val().username;
      if(snapshot.val().img!=undefined && snapshot.val().img!==""){
        $scope.image="data:image/jpeg;base64,"+snapshot.val().img;
      }
      else{
        $scope.image="img/ios7-camera.png";
      }
    });

    $scope.toDet=function(val){
        $state.go('details',{"act":val});
    }
    
    $scope.delete=function(val){
      Favourites.delete(val);
    }
   
})

.controller('ChatsCtrl', function($scope,$firebaseArray, $ionicLoading) {
  $scope.chats = $firebaseArray(new Firebase('https://experiencett.firebaseio.com/menu'));
})

.controller('ChatDetailCtrl', function($scope, $stateParams,$firebaseArray) {
  $scope.chats= $firebaseArray(new Firebase('https://experiencett.firebaseio.com/menu/'+$stateParams.chatId+'/activities'));
  $scope.par=$stateParams.chatId;
})

.controller('ChatChooseCtrl', function($scope, $stateParams,Search,$state,$filter) {
  $scope.chats=Search.all();
  $scope.par1=$filter('lowercase')($stateParams.cat);
  $scope.par2=$filter('lowercase')($stateParams.cho);
  console.log($scope.par1);
  console.log($scope.par2);
})

.controller('DetailsCtrl',function($scope,$stateParams,Search,Favourites,$state,$ionicLoading,$timeout,$filter,$window){
   $scope.mheight=''+$window.innerHeight/2+'px';

    $ionicLoading.show({
      template: '<ion-spinner class="spinner-calm"></ion-spinner>',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

     $timeout(function () {
        $ionicLoading.hide(); 
        var lower=$filter('lowercase')($stateParams.act);
        $scope.chats= Search.get(lower);
        console.log($scope.chats.img);
        $scope.bg=$scope.chats.img;
     });
  


    $scope.home=function(){
      $state.go('tab.dash');
    }

    $scope.addFav=function(){
      Favourites.add($scope.chats.$id,$scope.chats.img);
    }     
})

.controller('SearchCtrl', function($scope,Search,$ionicLoading,$timeout) {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-calm"></ion-spinner>',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

     $timeout(function () {
      $ionicLoading.hide();
      $scope.chats=Search.all();
      $scope.val;
    });
})

.controller("PreferencesCtrl",function($scope,$state,$ionicPopup,Preferences){

  $scope.classList=Preferences.preferencesList();
  $scope.userPref=Preferences.all();

  $scope.save = function(){
    $scope.prefs = [];
    angular.forEach($scope.classList, function(pref){
      if (pref.selected ) {
        $scope.prefs.push(pref.class);
      }
    })
    
    var alertPopup = $ionicPopup.alert({
      title: 'Save',
      template: 'Your preferences have been saved. Suggestions will be loaded on your dashboard.'
    });
    
    Preferences.add($scope.prefs);
    $state.go('account');
  }; 
})


.controller('AccountCtrl', function($scope,$state,userData, $ionicHistory, $firebaseArray, $cordovaCamera) {
  var ref = new Firebase("https://experiencett.firebaseio.com");
  var authData=ref.getAuth();

  ref.child("favourites").child(authData.uid).on("value", function(snapshot) {
      $scope.favCount=snapshot.numChildren();
  });

  ref.child("users").child(authData.uid).on("value", function(snapshot) {
    $scope.UserName=snapshot.val().username;
    if(snapshot.val().img!=undefined && snapshot.val().img!==""){
      $scope.image="data:image/jpeg;base64,"+snapshot.val().img;
    }
    else{
      $scope.image="img/ios7-camera.png";
    }
  });

  $scope.upload = function() {
    var options = {
        quality :100,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        allowEdit : true,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        targetWidth:500,
        targetHeight: 500,
        saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.imageData=imageData;
        var userdata=userData.getUserInfo();
        userdata.img=$scope.imageData;
        userData.storeUserInfo(userdata);
    }, function(error) {
        console.error(error);
    }); 
  }
  ;
})

.controller("ScaffoldCtrl",function($scope,$state,userData,$rootScope,$ionicLoading){
  var ref = new Firebase("https://experiencett.firebaseio.com");
  var authData=ref.getAuth();

  //if current state is tab.dash do not allow a previous state 
  $rootScope.previousState;
  $rootScope.currentState;
  $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
    $rootScope.previousState = from.name;
    $rootScope.currentState = to.name;
    console.log('Previous state:'+$rootScope.previousState);
    console.log('Current state:'+$rootScope.currentState);
  });

  ref.child("users").child(authData.uid).on("value", function(snapshot) {
    $scope.UserName=snapshot.val().username;
    userData.setName(snapshot.val().username);
    userData.setUserInfo(snapshot.val());
    if(snapshot.val().img!=undefined && snapshot.val().img!==""){
      $scope.image="data:image/jpeg;base64,"+snapshot.val().img;
    }
    else{
      $scope.image="img/ios7-camera.png";
    }
  });

  $scope.logout=function(){
     ref.child("users").child(authData.uid).off();
      userData.logout();
      console.log("Loggin out");
      ref.unauth();
      $state.transitionTo('login', $state.params, {reload: true, inherit: true,notify: true});
      //$state.go('login', $state.params, { reload: true });
      //$state.go('login');
      //$window.location.reload(); //causes the white screen at logout but is necessary to reload controllers after logout  
  }

  $scope.navAccount=function(){
    $state.go('account');
  }

  $scope.navPreferences=function(){
    $state.go('preferences');
  }

  $scope.navHome=function(){
   $state.go('tab.dash');
  }  

  $scope.navContact=function(){
       $state.go('contact');
  }  

  $scope.navFav=function(){
   $state.go('tab.fav');
  } 

  $scope.searchState=function(){
    if(!$state.includes('search'))
      $state.go('search');
    else
     $state.go('tab.dash');
  } 

  $scope.prev=function(){
    $state.go($rootScope.previousState);
  }
})

.controller("loginCtrl",function($scope,$state,Auth,userData,$ionicPopup){
  var ref = new Firebase("https://experiencett.firebaseio.com");
    userData.logout();
    $scope.emailLogin= function(usr_email,usr_password){
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
          userData.storeAuthData(authData);
          $state.go('tab.dash'); 
        }
      });
    }
    
    $scope.fblogin = function(){
      
      Auth.$authWithOAuthRedirect("facebook").then(function(authData){/*Succesful login*/ }).catch(function(error){

          if (error.code === "TRANSPORT_UNAVAILABLE") {
            Auth.$authWithOAuthPopup("facebook").then(function(authData){    
                //Succesful login 
                 console.log("authWithOAuthPopup Login: "+authData);
                // userData.setName(authData.facebook.cachedUserProfile.first_name);
                // userData.storeAuthData(authData);
                $state.go('tab.dash');

            }).catch(function(error){     
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
          if(authData == null){
            console.log("Not logged in yet");
          }
          else{
            if(authData!= undefined && authData.provider=='facebook'){
                console.log("Logged in as "+authData.facebook.displayName+" with data ");console.log(authData);    
                userData.setName(authData.facebook.cachedUserProfile.first_name);
                userData.storeAuthData(authData);
                $state.go('tab.dash');
            }
          }
        });   
    }

    $scope.resetPassword= function(usr_email){
        console.log("resetting");
        
        ref.resetPassword({email: usr_email+""}
          ,function(error) {
            if (error) {
              switch (error.code) {
                case "INVALID_USER":
                  console.log("The specified user account does not exist.");
                  var alertPopup = $ionicPopup.alert({
                    title: 'Password Reset Failed!',
                    template: 'The specified user account does not exist. Please Enter a valid Email Address'
                  });
                  break;
                default:
                  console.log("Error resetting password:", error);
                  var alertPopup = $ionicPopup.alert({
                    title: 'Password Reset Failed!',
                    template: 'Please Ensure Your Email Address is valid'
                  });
              }
            }
            else {
              console.log("Password reset email sent successfully!");
              var alertPopup = $ionicPopup.alert({
                    title: 'Password Reset Succesful!',
                    template: 'Password reset email sent successfully!'
              });
              document.getElementById("usr_email").value="";
            }
        })
    }

    $scope.register=function(reg_email,reg_password,reg_username){
          
      ref.createUser({
        email    : reg_email,
        password : reg_password
        }, function(error, authData) {
          if (error) {
            console.log("Error creating user:", error);
            var alertPopup = $ionicPopup.alert({
                title: 'Sign Up failed!',
                template: 'Please Check Your Credentials'
            });
          } 
          else {
            console.log("Successfully created user account with uid:", authData.uid);
            console.log(authData);
            ref.child("users").child(authData.uid).set({
              uid: authData.uid,
              username: reg_username,
              img:""
            });
            $scope.emailLogin(reg_email,reg_password);
            document.getElementById("reg_email").value="";
            document.getElementById("reg_password").value="";
            document.getElementById("reg_username").value="";
          }
      });
    }

    $scope.navRegister=function(){
       $state.go('register');
    }  
    ;
});