
angular.module('starter.services', [])


.factory('Favourites',function($firebaseArray){

  var ref = new Firebase("https://experiencett.firebaseio.com/");
  var authData = ref.getAuth();
  var favlist = $firebaseArray(new Firebase('https://experiencett.firebaseio.com/favourites/'+authData.uid+''));
  var userFav=new Firebase('https://experiencett.firebaseio.com/favourites/'+authData.uid);
  var found=0;

  return {
    all: function() {
      return favlist;
    },

    getInfo:function(){
      return authData;
    },

    add: function(name,img){
      var obj={"name":name,"img":img};
      found=0;
      angular.forEach(favlist,function(fav){
        if(fav.name===obj.name){
          found=1;
        }
      });
      if(found==0){
        userFav.push().set(obj);
      }  
    },

    delete:function(obj){
      favlist.$loaded().then(function() {
        favlist.$remove(favlist.indexOf(obj)).then(function() {
            console.log('item removed')
        }).catch(function(error) {
            console.log('error', error);
        });
      });
    },

    remove: function(fav) {
      favs.splice(favs.indexOf(fav), 1);
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
})

.factory('userData', function() {
  var ref = new Firebase("https://experiencett.firebaseio.com");
  var users = new Firebase("https://experiencett.firebaseio.com/users");
  var username; var userInfo; var AuthData;

  return {
    //USER USERNAME
    setName: function (newData) {
        username = newData;
    },

    getName: function () {
        return username;
    },

    //sets userinfo in this variable for retrieval
    setUserInfo: function (newData) {
        userInfo = newData;
    },
    //ALL USER INFO STORED IN FIREBASE
    storeUserInfo: function (newData) {
        userInfo = newData;//to ensure that both sets of data correlates may remove line if necessary
        users.child((ref.getAuth()).uid).set(newData);
    },
    getUserInfo: function () {
        return userInfo;
    },

    //AUTH DATA FROM WHEN A USER LOGS IN
    storeAuthData: function(newData){
      AuthData=newData;
    },

    getAuthData: function(){
      return AuthData;
    },

    logout: function(){
      AuthData=null;
      username=null;
      userInfo=null;
    }
  };
})

.factory('Preferences',function($firebaseArray){

  var ref = new Firebase("https://experiencett.firebaseio.com/");
  var authData = ref.getAuth();
  var userPrefs = $firebaseArray(new Firebase('https://experiencett.firebaseio.com/preferences/'+authData.uid+''));
  var ActivityList=$firebaseArray(new Firebase('https://experiencett.firebaseio.com/experiences'));
  var preferencesList=[];

  return {
    preferencesList: function() {
      angular.forEach(ActivityList,function(act){
        var found=0;
        angular.forEach(preferencesList,function(pref){
          if(pref.class===act.class){
            found=1;
          }
        });
        if(found==0){
          preferencesList.push({"class":act.class});
        }  
      });
      return preferencesList;
    },
    all: function(){
      return userPrefs;
    },
    add: function(val){
      var up = new Firebase('https://experiencett.firebaseio.com/preferences/'+(ref.getAuth()).uid+'');
      up.set(val);
    }
  };
})
;

