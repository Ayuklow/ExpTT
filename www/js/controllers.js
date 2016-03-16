angular.module('starter.controllers', [])



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

.controller('ChatsCtrl', function($scope, Chats, $firebaseArray) {
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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
