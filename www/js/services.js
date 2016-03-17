angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Day TT',
    lastText: 'Experience The Sun of Daytime!',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Night TT',
    lastText: 'Experience The Passion of the Night! ',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Carnival TT',
    lastText: 'The Greatest Show on Earth!',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Rent Experience',
    lastText: 'Rent A House By the Seas!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Transportation Services',
    lastText: 'Let Us Take You Around.',
    face: 'img/mike.png'
  }];


  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Search', function($firebaseArray) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
 // var chats = $firebaseArray(new Firebase('https://experiencett.firebaseio.com/experiences'));
 var chats =$firebaseArray(new Firebase('https://experiencett.firebaseio.com/experiences'));

  return {
    all: function() {
      return chats;
    },

    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].$id === chatId) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory("Auth", function($firebaseAuth){
    var userRef = new Firebase("https://experiencett.firebaseio.com");
    return $firebaseAuth(userRef);
});

