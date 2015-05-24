// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic.contrib.ui.cards'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})


.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate, $http) {
  var cardTypes = [{
    title: '“It\'s hard to beat a person who never gives up.”',
    author: 'Babe Ruth',
    image: 'img/pic.png'
  }, {
    title: '“I\'m a greater believer in luck, and I find the harder I work the more I have of it”',
    author: 'Thomas Jefferson'  ,      
    image: 'img/pic.png'
  }, {
    title: '“Don\'t wish it were easier. Wish you were better.”',
    author: 'Jim Rohn'   ,     
    image: 'img/pic.png'
  }, {
    title: '“There are no shortcuts to any place worth going.”',
    author: 'Beverly Sill'  ,      
    image: 'img/pic.png'
  }, {
    title: '“As long as I am breathing, in my eyes, I am just beginning.”',
    author: 'Cris Jami'   ,     
    image: 'img/pic.png'
  },{
    title: '“Sometimes there\'s not a better way. Sometimes there\'s only the hard way.” ',
    author: 'Mary E Pearson'   ,     
    image: 'img/pic.png'
  }];

  var endPoint = "http://api.theysaidso.com/";
  $http.get('https://cors-test.appspot.com/test').then(function(resp) {
    console.log('Success', resp);
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
  
  $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

  $scope.cardSwiped = function(index) {
    $scope.addCard();
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }
})

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  $scope.goAway = function() {
    var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
    card.swipe();
  };
});
