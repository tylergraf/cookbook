'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
// angular.module('cookbookApp.services', [])
//   .factory('localStorageCheck',function(localStorageService){
//     return {
//       check: function (id) {

//         var recipe = localStorageService.get(id);
//         if(recipe){
//           console.log('recipe found');
//           console.log(recipe);
//           return JSON.stringify(recipe);
//         } else {
//           console.log('recipe not found');
//           return false;
//         }


//         console.log(localStorageService);
//         return 'stuff'
//       }
//     }
//   });
var services = angular.module('cookbookApp.services', ['ngResource']);

services.run(["$http",
         function ($http) {
  $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}] );

services.factory('RecipeService', function($resource){
  return $resource('/api/search/:term', {}, {
    query: {method:'GET', isArray:true}
  });
});

services.factory('FavoriteService', function($http, $q){
  return {
    get: function(recipeId){
      var deferred = $q.defer();

      $http.get('/api/favorite/'+recipeId)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(data){
          deferred.reject(data);
        });
      return deferred.promise;
    },
    getAll: function(){
      var deferred = $q.defer();

      $http.get('/api/favorites')
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(data){
          deferred.reject(data);
        });
      return deferred.promise;
    },
    post: function(recipeId){
      var deferred = $q.defer();

      $http.post('/api/favorite/'+recipeId)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(data){
          deferred.reject(data);
        });
      return deferred.promise;
    },
    delete: function(recipeId){
      var deferred = $q.defer();

      $http.delete('/api/favorite/'+recipeId)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(data){
          deferred.reject(data);
        });
      return deferred.promise;
    }
  }
});
