(function(){
  'use strict';
  var deps = [
  'ngRoute',
  'cookbookApp.filters',
  'cookbookApp.controllers',
  'cookbookApp.services',
  'cookbookApp.directives',
  'btford.markdown'
  ];
  // Declare app level module which depends on filters, and services
  var app = angular.module('cookbookApp', deps);

  app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/partials/categories',
        controller: 'IndexCtrl'
      }).
      when('/auth/facebook', {
        templateUrl: '/partials/categories',
        controller: 'LoginCtrl'
      }).
      when('/logout', {
        templateUrl: '/partials/categories',
        controller: 'LoginCtrl'
      }).
      when('/create-account', {
        templateUrl: '/partials/create-account',
        controller: 'CreateAccountCtrl'
      }).
      when('/category/:id', {
        templateUrl: '/partials/subcategories',
        controller: 'SubcategoryCtrl'
      }).
      when('/favorites', {
        templateUrl: '/partials/favorites',
        controller: 'FavoritesCtrl'
      }).
      when('/recipes/:id', {
        templateUrl: '/partials/recipes',
        controller: 'RecipesCtrl'
      }).
      when('/recipe/:id', {
        templateUrl: '/partials/recipe',
        controller: 'RecipeCtrl'
      }).
      when('/addPost', {
        templateUrl: '/partials/addPost',
        controller: 'AddPostCtrl'
      }).
      when('/readPost/:id', {
        templateUrl: '/partials/readPost',
        controller: 'ReadPostCtrl'
      }).
      when('/editPost/:id', {
        templateUrl: '/partials/editPost',
        controller: 'EditPostCtrl'
      }).
      when('/deletePost/:id', {
        templateUrl: '/partials/deletePost',
        controller: 'DeletePostCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }])
  .run(['$rootScope',function($rootScope){
    $rootScope.taxonomy = {};
    $rootScope.editMode = false;

    $rootScope.toggleEditMode = function(){
      $rootScope.editMode = !$rootScope.editMode;
    };
  }]);

    // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
  if (!Object.keys) {
    Object.keys = (function() {
      'use strict';
      var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
          dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
          ],
          dontEnumsLength = dontEnums.length;

      return function(obj) {
        if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }

        var result = [], prop, i;

        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }

        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    }());
  }
})();
