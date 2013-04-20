'use strict';

// Declare app level module which depends on filters, and services
angular.module('cookbookApp', ['cookbookApp.filters', 'cookbookApp.services', 'cookbookApp.directives','LocalStorageModule']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/partials/index',
        controller: IndexCtrl
      }).
      when('/category/:id', {
        templateUrl: '/partials/subcategories',
        controller: CategoryCtrl
      }).
      when('/recipes/:id', {
        templateUrl: '/partials/recipes',
        controller: SubcategoryCtrl
      }).
      when('/recipe/:id', {
        templateUrl: '/partials/recipe',
        controller: RecipeCtrl
      }).
      when('/addPost', {
        templateUrl: '/partials/addPost',
        controller: AddPostCtrl
      }).
      when('/readPost/:id', {
        templateUrl: '/partials/readPost',
        controller: ReadPostCtrl
      }).
      when('/editPost/:id', {
        templateUrl: '/partials/editPost',
        controller: EditPostCtrl
      }).
      when('/deletePost/:id', {
        templateUrl: '/partials/deletePost',
        controller: DeletePostCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);
