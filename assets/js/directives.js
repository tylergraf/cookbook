'use strict';

/* Directives */


angular.module('myApp.directives', []).
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
  directive('zippy', function($http){
    return {
      restrict: 'A',
      // This HTML will replace the zippy directive.
      replace: true,
      // transclude: 'ng-repeat',
      scope: {title: '=',subtitle: '='},
      // template: '<div ng-repeat="recipe in recipes">'
                  // +'<h3><a href="/recipe/{{recipe._id}}" ng-bind-html-unsafe="recipe.title"></a></h3>' 
                  // +'<h4 ng-bind-html-unsafe="recipe.subtitle"></h4>' 
                // +'</div>',
      // templateUrl: '/partials/recipes',
      controller: theController,
      // The linking function will add behavior to the template
      link: function(scope, element, attrs) {
            // Title element
        // var title = angular.element(element.children()[0]),
            // Opened / closed state
            // opened = true;
 
        // Clicking on title should open/close the zippy
        // title.bind('click', toggle);
 
        // Toggle the closed/opened state
        // function toggle() {
          // opened = !opened;
          // element.removeClass(opened ? 'closed' : 'opened');
          // element.addClass(opened ? 'opened' : 'closed');
        // }
 
        // initialize the zippy
        // toggle();
      }
    }
  });
