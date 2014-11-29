(function(){

  'use strict';

  /* Directives */


  angular.module('cookbookApp.directives', []).
    directive('appVersion', ['version', function(version) {
      return function(scope, elm, attrs) {
        elm.text(version);
      };
    }]).directive('popularRecipes', function ($http) {
      return {
          restrict: 'A',
          templateUrl: '/partials/recipeTitle',
          scope: false,
          replace: false,
          link: function (scope, iterStartElement, attr) {

            $('.search-clear').click(function () {
              scope.searchTerm = '';
              scope.$apply();
            })
            scope.$watch(attr.searchResults,function(){
              function successCallback(data,e,f,req) {
                var sTerm = req.url.split('/')[3];
                if(scope.searchTerm === sTerm){
                  scope.recipes = data;
                  scope.selected = 0;
                  angular.forEach(scope.recipes, function(recipe, index){
                    recipe.selected = 'unselected';
                    if(index == 0) recipe.selected = 'selected';
                  });
                }

              }
              if(scope.searchTerm != '' && !angular.isUndefined(scope.searchTerm)){
                $http.get('/api/search/'+scope.searchTerm).success(successCallback);
              } else {
                scope.recipes = [];
              }
            });
          }
      };
  }).directive('addFavorite', function ($http, FavoriteService,$rootScope) {
      return {
          restrict: 'A',
          template: '<span class="edit btn">{{favText}}</span>',
          replace: true,
          scope: {
            recipeId: '='
          },
          link: function (scope, elem, attr) {
            scope.favText = 'Add to Favorites';
            scope.favorited = false;
            if(!$rootScope.user){
              $(elem).hide();
              return false;
            }
            scope.addFavorite = function(){
              if(scope.favorited){
                FavoriteService.delete(scope.recipeId)
                  .then(function(data){
                    scope.favText = "Add to Favorites";
                    scope.favorited = false;
                  },function(err){
                    console.log(err);
                  });
              } else {
                FavoriteService.post(scope.recipeId)
                  .then(function(data){
                    scope.favText = "Favorited";
                    scope.favorited = true;
                  },function(err){
                    console.log(err);
                  });
              }

            }
            scope.$watch('recipeId',function(){
              if(scope.recipeId !== undefined){
                FavoriteService.get(scope.recipeId)
                  .then(function(data){
                    scope.favText = "Favorited";
                    scope.favorited = true;
                  },function(err){
                    console.log(err);
                  });
              }
            });
          }
      };
  }).directive('searchResults', function ($http, RecipesService) {
      return {
          restrict: 'A',
          templateUrl: '/partials/recipeTitle',
          scope: false,
          replace: false,
          link: function (scope, iterStartElement, attr) {

            $('.search-clear').click(function () {
              scope.searchTerm = '';
              scope.$apply();
            });

            scope.$watch(attr.searchResults, function(){

              if(scope.searchTerm != '' && !angular.isUndefined(scope.searchTerm)){
                RecipesService.query(
                  {term: scope.searchTerm},
                  function(searchResults) {
                    scope.recipes = searchResults;
                    scope.selected = 0;
                    angular.forEach(scope.recipes, function(recipe, index){
                      recipe.selected = 'unselected';
                      if(index == 0) recipe.selected = 'selected';
                    });
                  },
                  function(err) {
                    console.log(err);
                  });
                // $http.get('/api/search/'+scope.searchTerm).success(successCallback);
              } else {
                scope.recipes = [];
              }
            });
          }
      };
  }).directive('selectRecipe', function ($http, $location) {
      return {
          restrict: 'A',
          scope: false,
          link: function ($scope, iterStartElement, attr) {
            function up() {
              if($scope.selected > 0){
                $scope.recipes[$scope.selected].selected = 'unselected';
                $scope.selected--;
                $scope.recipes[$scope.selected].selected = 'selected';
              }
            }
            function down() {
              if($scope.selected < $scope.recipes.length-1){
                $scope.recipes[$scope.selected].selected = 'unselected';
                $scope.selected++;
                $scope.recipes[$scope.selected].selected = 'selected';
              }
            }
            function checkViewPort() {
              $('.left-nav-inside').height();
            }

            angular.element('.left-nav-inside').delegate('.recipe-list-item','click',function(e){
              $scope.recipes[$scope.selected].selected = 'unselected';
              $(this).toggleClass('selected','unselected');
              $scope.selected = $(this).index();
              $scope.recipes[$scope.selected].selected = 'selected';
              $scope.$digest();
            });
            // angular.element('.search-term').focus(function(){
              $(document).keydown(function(e){
                if($scope.recipes.length > 0){
                  if(e.keyCode === 38){
                    e.preventDefault();
                    up();
                    $scope.$digest();
                  } else if(e.keyCode === 40){
                    e.preventDefault();
                    down();
                    $scope.$digest();
                  } else if(e.keyCode === 13){
                    e.preventDefault();
                    var url = '/recipe/'+$scope.recipes[$scope.selected]._id;
                    $scope.$apply($location.url(url));
                  }
                }
              // });
            });

            $scope.$watch('selected',function(selected){
              if(!angular.isUndefined(selected)){
                var leftNavHeight = $('.left-nav-inside').height();
                var leftNavScrollHeight = $('.left-nav-inside').scrollTop();
                var elHeight = $('.recipe-list-item.selected').height();
                if((selected*elHeight) < leftNavScrollHeight){
                  $('.left-nav-inside').scrollTop(elHeight*selected+ (selected*2));
                } else if((selected*elHeight+elHeight) > leftNavHeight + leftNavScrollHeight){
                  $('.left-nav-inside').scrollTop(elHeight*selected - (leftNavHeight-elHeight) + (selected*2));
                  // $('.left-nav-inside').scrollTop(leftNavHeight elHeight*selected+leftNavHeight);
                }
                // debugger
              }
            });
          }
      };
  }).directive('browse', function ($http, $location) {
      return {
          restrict: 'A',
          scope: false,
          link: function ($scope, iterStartElement, attr) {
            $scope.$watch(searchTerm,function(searchTerm){
              if(searchTerm != '' && !angular.isUndefined(searchTerm)){

              }
            });
          }
      };
  }).
    directive('ckeditor', function($http){
      return {
        restrict: 'A',
        replace: false,
        link: function(scope, element, attrs) {
          var editing = false;

          function editable(el,on) {
            $('#'+el).attr('contenteditable',on);
            $('#recipeTitle').focus();
            if(!on){
              CKEDITOR.destroy(el);
            } else {
              CKEDITOR.inline(el,{
                customConfig: '/js/lib/ckeditor/config.js'
              });
            }

          }
          angular.element(element).click(function(){
            editing = (editing) ? false : true;

            $(element).text((editing)? 'editing mode' : 'edit');

            CKEDITOR.inline('recipeTitle',{
              on: {
              instanceReady: function( ev ) {
                // Output paragraphs as <p>Text</p>.
                this.dataProcessor.writer.setRules( 'h3', {
                  indent: false,
                  breakBeforeOpen: true,
                  breakAfterOpen: false,
                  breakBeforeClose: false,
                  breakAfterClose: true
                });
              }
              }
            });
            CKEDITOR.inline('recipeSubtitle',{
              on: {
                instanceReady: function( ev ) {
                  // Output paragraphs as <p>Text</p>.
                  this.dataProcessor.writer.setRules( 'h4', {
                    indent: false,
                    breakBeforeOpen: true,
                    breakAfterOpen: false,
                    breakBeforeClose: false,
                    breakAfterClose: true
                  });
                }
              }
            });
            CKEDITOR.inline('recipeIngredients',{
              on: {
            instanceReady: function( ev ) {
                // Output paragraphs as <p>Text</p>.
                this.dataProcessor.writer.setRules( 'p', {
                    indent: false,
                    breakBeforeOpen: true,
                    breakAfterOpen: false,
                    breakBeforeClose: false,
                    breakAfterClose: true
                });
            }
            }
        });
            CKEDITOR.inline('recipeDirections',{
              on: {
            instanceReady: function( ev ) {
                // Output paragraphs as <p>Text</p>.
                this.dataProcessor.writer.setRules( 'p', {
                    indent: false,
                    breakBeforeOpen: true,
                    breakAfterOpen: false,
                    breakBeforeClose: false,
                    breakAfterClose: true
                });
            }
            }
        });

          });

          // var stuff = angular.element('#recipeTitle').ckeditor();
  // debugger

          // var editor;

          // // The instanceReady event is fired, when an instance of CKEditor has finished
          // // its initialization.
          // CKEDITOR.on( 'instanceReady', function( ev ) {
          //   editor = ev.editor;

          //   // Show this "on" button.
          //   document.getElementById( 'readOnlyOn' ).style.display = '';

          //   // Event fired when the readOnly property changes.
          //   editor.on( 'readOnly', function() {
          //     document.getElementById( 'readOnlyOn' ).style.display = this.readOnly ? 'none' : '';
          //     document.getElementById( 'readOnlyOff' ).style.display = this.readOnly ? '' : 'none';
          //   });
          // });

          // function toggleReadOnly( isReadOnly ) {
          //   // Change the read-only state of the editor.
          //   // http://docs.ckeditor.com/#!/api/CKEDITOR.editor-method-setReadOnly
          //   editor.setReadOnly( isReadOnly );
          // }



          // var editing = false,
          //     editor,
          //     title = document.getElementById('recipeTitle');


          // // debugger
          // editor = CKEDITOR.inline(title);

        }
      }
    });
})()
