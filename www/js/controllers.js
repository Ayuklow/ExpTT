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
  $scope.chats = $firebaseArray(new Firebase('https://experiencett.firebaseio.com/experiences/daytt/hiking'));

  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})



.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
