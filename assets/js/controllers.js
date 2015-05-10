(function(){
  'use strict';

  var ngModule = angular.module('cookbookApp.controllers', []);
  /* Controllers */
  ngModule.controller("IndexCtrl", function($scope, $rootScope, $http, CategoryService) {
    window.io = $scope;
    $rootScope.taxonomy = {};
    $scope.addCategory = function(category){
      CategoryService
        .add(category)
        .then(function(data){
          $scope.categories.push(data.category);
        });
      $scope.category = '';
    };

    $scope.deleteCategory = function(categoryId, index){
      CategoryService
        .delete(categoryId)
        .then(function(data){
          $scope.categories.splice(index, 1);
        });
    };

    CategoryService
      .getAll()
      .then(function(data){
        $scope.categories = data.categories;
      });

  });

  ngModule.controller("LoginCtrl", function($scope, $rootScope, $http) {
    window.location.reload();
    // $scope.login = function(email, password){
    //   $http.post('/api/login', {user: {email: email, password: password}}).
    //     success(function(data, status, headers, config) {
    //
    //     });
    // }
  });

  ngModule.controller("CreateAccountCtrl", function($scope, $rootScope, $http) {
    $scope.createAccount = function(email, password){
      $http.post('/api/user/new', {user: {email: email, password: password}}).
        success(function(data, status, headers, config) {

        });
    };
  });

  ngModule.controller("SubcategoryCtrl", function($scope, $rootScope, SubcategoryService, CategoryService, $routeParams) {
    $scope.edit = {};
    $rootScope.taxonomy = {};

    $scope.move = false;
    $scope.categoryId = $routeParams.id;

    window.io = $scope;
    $scope.addSubcategory = function(subcategory){
      SubcategoryService
        .add(subcategory, $scope.categoryId)
        .then(function(data){
          $scope.subcategories.push(data.subcategory);
        });
      $scope.subcategory = '';
    };

    $scope.deleteSubcategory = function(subcategoryId, index){
      SubcategoryService
        .delete(subcategoryId)
        .then(function(data){
          $scope.subcategories.splice(index, 1);
        });
    };

    $scope.moveTo = function(subcategoryList){
      var list = [];

      for(var x in subcategoryList){
        if(subcategoryList[x]){
          list.push(x);
        }
      }

      SubcategoryService
        .move(list, $scope.moveToCategory._id)
        .then(function(data){
          angular.forEach($scope.subcategories, function(s, i){
            for(var x in subcategoryList){
              if(subcategoryList[x] && s._id === x){
                $scope.subcategories.splice(i, 1);
              }
            }
          });
        });
    };

    SubcategoryService
      .getAll($scope.categoryId)
      .then(function(data){
        $scope.subcategories = data.subcategories;
        $rootScope.taxonomy.category = data.category;
      });

    CategoryService
      .getAll()
      .then(function(data){
        $scope.categories = data.categories;
      });

  });

  ngModule.controller("RecipesCtrl", function($scope, $rootScope, $routeParams, RecipeService, SubcategoryService, CategoryService) {
    // $rootScope.taxonomy = {};

    var categoryId = $routeParams.categoryId,
        subcategoryId = $routeParams.id;

    $scope.edit = {};
    $scope.move = false;


    RecipeService
      .getAll(subcategoryId)
      .then(function(data){
        $scope.recipes = data.recipes;
        $rootScope.taxonomy.subcategory = data.subcategory;
      });

    CategoryService
      .getAll()
      .then(function(data){
        $scope.categories = data.categories;

        angular.forEach(data.categories, function(c, i){
          if(c._id === categoryId){
            $rootScope.taxonomy = {category: c.name};
          }
        });
      });

    $scope.moveTo = function(){
      var list = [],
          recipeList = $scope.edit;

      for(var x in recipeList){
        if(recipeList[x]){
          list.push(x);
        }
      }
      RecipeService
        .move(list, $scope.moveToSubcategory._id)
        .then(function(data){
          angular.forEach($scope.recipes, function(s, i){
            for(var x in recipeList){
              if(recipeList[x] && s._id === x){
                $scope.recipes.splice(i, 1);
              }
            }
          });
        });
    };

    $scope.$watch('moveToCategory', function(value){

      if(value){
        SubcategoryService
          .getAll(value._id)
          .then(function(data){
            $scope.subcategories = data.subcategories;
          });
      }
    });

  });
  ngModule.controller("FavoritesCtrl", function($scope, $rootScope, $http, FavoriteService) {

    FavoriteService.getAll()
      .then(function(data){
        console.log(data.favorites);
        $scope.favorites = data.favorites;
      },
      function(err){
        console.log(err);
      });
  });

  ngModule.controller("RecipeCtrl", function($scope, $rootScope, RecipeService, CategoryService, ViewService, $routeParams) {
    var recipeId = $routeParams.id;


    RecipeService
      .get(recipeId)
      .then(function(data){
        $scope.recipe = data.recipe;
        $rootScope.taxonomy.subcategory = data.subcategory;
        return CategoryService.get(data.subcategory._category)
      })
      .then(function(data){
        $rootScope.taxonomy.category = data.category;

        return ViewService.newView(recipeId);
      })
      .then();

  });

  ngModule.controller("AddPostCtrl", function($scope, $rootScope, $http, $location) {
    $scope.form = {};
    $scope.submitPost = function () {
      $http.post('/api/post', $scope.form).
        success(function(data) {
          $location.path('/');
        });
    };
  });

  ngModule.controller("ReadPostCtrl", function($scope, $rootScope, $http, $routeParams) {
    $http.get('/api/post/' + $routeParams.id).
      success(function(data) {
        $scope.post = data.post;
      });
  });

  ngModule.controller("EditPostCtrl", function($scope, $rootScope, $http, $location, $routeParams) {
    $scope.form = {};
    $http.get('/api/post/' + $routeParams.id).
      success(function(data) {
        $scope.form = data.post;
      });

    $scope.editPost = function () {
      $http.put('/api/post/' + $routeParams.id, $scope.form).
        success(function(data) {
          $location.url('/readPost/' + $routeParams.id);
        });
    };
  });

  ngModule.controller("DeletePostCtrl", function($scope, $rootScope, $http, $location, $routeParams) {
    $http.get('/api/post/' + $routeParams.id).
      success(function(data) {
        $scope.post = data.post;
      });

    $scope.deletePost = function () {
      $http.delete('/api/post/' + $routeParams.id).
        success(function(data) {
          $location.url('/');
        });
    };

    $scope.home = function () {
      $location.url('/');
    };
  });

  ngModule.controller("LeftNav", function($scope, $rootScope, $http, $location, $routeParams) {

    var search = angular.element('.search');

    search.bind('click',searchTransition);

    // $scope.autoComplete = function(){
    //   $http.get('/api/recipes/ice%20cream').
    //     success(function(data) {
    //       console.log(data);
    //     });
    // }
    // angular.element('.search-term').blur(function(){
    //   angular.element('.left-nav').toggleClass('searching');
    //   angular.element('.search-form').toggleClass('hide');
    // });
    function searchTransition() {
      angular.element('.left-nav').toggleClass('searching');
      angular.element('.search-form').toggleClass('hide');


    }
  });


})();
