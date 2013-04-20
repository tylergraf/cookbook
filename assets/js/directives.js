'use strict';

/* Directives */


angular.module('cookbookApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).directive('searchRecipes', function($timeout, dateFilter) {
    // return the directive link function. (compile function not needed)
    return {
    // template: '<div></div>',
    // templateUrl: 'directive.html',
    // replace: false,
    // transclude: false,
    // restrict: 'A',
    // scope: false,
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink(scope, iElement, iAttrs, controller) {
      // console.log('got here');

        },
        post: function postLink(scope, iElement, iAttrs, controller) {
      // console.log('got here');

        }
      }
    },
    link: function postLink(scope, element, attrs) {
      console.log('got here');
    }
  };
  // function(scope, element, attrs) {
      
      // var format,  // date format
      //     timeoutId; // timeoutId, so that we can cancel the time updates
 
      // // used to update the UI
      // function updateTime() {
      //   element.text(dateFilter(new Date(), format));
      // }
 
      // // watch the expression, and update the UI on change.
      // scope.$watch(attrs.searchRecipes, function(value) {
      //   format = value;
      //   updateTime();
      // });
 
      // // schedule update in one second
      // function updateLater() {
      //   // save the timeoutId for canceling
      //   timeoutId = $timeout(function() {
      //     updateTime(); // update DOM
      //     updateLater(); // schedule another update
      //   }, 1000);
      // }
 
      // // listen on DOM destroy (removal) event, and cancel the next UI update
      // // to prevent updating time after the DOM element was removed.
      // element.bind('$destroy', function() {
      //   $timeout.cancel(timeoutId);
      // });
 
      // updateLater(); // kick off the UI update process.
    // }
  }).directive('searchResults', function ($http) {
    return {
        restrict: 'A',
        templateUrl: '/partials/test',
        scope: false,
        replace: false,
        link: function (scope, iterStartElement, attr) {
          scope.$watch(attr.searchResults,function(){
            function successCallback(data) {
              scope.recipes = data;
              scope.selected = 0;
              angular.forEach(scope.recipes, function(recipe, index){
                recipe.selected = 'unselected';
                if(index == 0) recipe.selected = 'selected';
              });
            }
            if(scope.searchTerm != '' && !angular.isUndefined(scope.searchTerm)){
              $http.get('/api/search/'+scope.searchTerm).success(successCallback);
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
