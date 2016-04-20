// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var expttApp=angular.module('starter', ['ionic','firebase', 'ngCordova', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider)   {
    if (ionic.Platform.isAndroid())
       $ionicConfigProvider.scrolling.jsScrolling(true);
     })

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl',
      cache: false
  })

  .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'loginCtrl',
      cache: false
  })

  .state('scaffold', {
      abstract: true,
      templateUrl: "templates/scaffold.html",
      controller:'ScaffoldCtrl',
      cache: false   
  })

  .state('account', {
      url: '/account',
      templateUrl: 'templates/account.html',
      controller: 'AccountCtrl',
      parent: 'scaffold',
      cache: false
  })
  .state('preferences', {
      url: '/preferences',
      templateUrl: 'templates/preferences.html',
      controller: 'PreferencesCtrl',
      parent:'scaffold',
      cache: false
  })

  .state('contact', {
      url: '/contact',
      templateUrl: 'templates/contact.html',
      controller: 'ContactCtrl',
      parent: 'scaffold'
  })

  .state('details',{
      url:'/details/:act',
      parent:"scaffold",
      templateUrl:'templates/details.html',
      controller:'DetailsCtrl'   
  })

  .state('search',{
      url:'/search/',
      parent:"scaffold",
      templateUrl:'templates/search.html',
      controller:'SearchCtrl',
      cache: false  
  })

  .state('tab', {
    url: '/tab',
    parent:"scaffold",
    abstract: true,
    templateUrl: 'templates/tabs.html',
    cache: false
    
  })



  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.hot', {
    url:'/hot',
    views: {
      'tab-hot': {
        templateUrl: 'templates/tab-hot.html',
        controller: 'HotCtrl'
      }
    }
  })

  .state('tab.fav',{
    url:'/fav',
    views:{
      'tab-fav':{
        templateUrl:'templates/tab-fav.html',
        controller: 'FavCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

    .state('tab.chat-choose', {
      url: '/chats/:cat/:cho',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-choose.html',
          controller: 'ChatChooseCtrl'
        }
      }
    })

  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});

