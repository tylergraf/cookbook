// 'use strict';

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

services.factory('RecipesService', function($resource){
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
  };
});

services.factory('CategoryService', function($http, $q){
  return {
    get: function(categoryId){
      var deferred = $q.defer();

      $http.get('/api/category/'+categoryId)
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

      $http.get('/api/categories')
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(data){
          deferred.reject(data);
        });
      return deferred.promise;
    },
    add: function(category){
      var deferred = $q.defer();

      $http.post('/api/category/'+category)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(data){
          deferred.reject(data);
        });
      return deferred.promise;
    },
    delete: function(categoryId){
      var deferred = $q.defer();

      $http.delete('/api/category/'+categoryId)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(data){
          deferred.reject(data);
        });
      return deferred.promise;
    }
  };
});

services.factory('SubcategoryService', function($http, $q){
  return {
    getAll: function(categoryId){
      var deferred = $q.defer();

      $http.get('/api/subcategories/'+categoryId)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(data){
          deferred.reject(data);
        });
      return deferred.promise;
    },
    add: function(subcategory, categoryId){
      var deferred = $q.defer(),
          formData = {
            categoryId: categoryId,
            subcategory: subcategory
          };

      $http.post('/api/subcategory/new', formData)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(data){
          deferred.reject(data);
        });
      return deferred.promise;
    },
    move: function(list, category){
      var deferred = $q.defer(),
          formData = {
            subcategoryIds: list,
            categoryId: category
          };

      $http.post('/api/subcategories/move', formData)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(data){
          deferred.reject(data);
        });
      return deferred.promise;
    },
    delete: function(subcategoryId){
      var deferred = $q.defer();

      $http.delete('/api/subcategory/'+subcategoryId)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(data){
          deferred.reject(data);
        });
      return deferred.promise;
    }
  };
});

services.factory('RecipeService', function($http, $q){
  return {
    get: function(recipeId){
      var deferred = $q.defer();

      $http.get('/api/recipe/'+recipeId)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(data){
          deferred.reject(data);
        });
      return deferred.promise;
    },
    getAll: function(subcategoryId){
      var deferred = $q.defer();

      $http.get('/api/recipes/'+subcategoryId)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(data){
          deferred.reject(data);
        });
      return deferred.promise;
    },
    add: function(subcategory, categoryId){
      var deferred = $q.defer(),
          formData = {
            categoryId: categoryId,
            subcategory: subcategory
          };

      $http.post('/api/subcategory/new', formData)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(data){
          deferred.reject(data);
        });
      return deferred.promise;
    },
    move: function(list, subcategoryId){
      var deferred = $q.defer(),
          formData = {
            recipeIds: list,
            subcategoryId: subcategoryId
          };

      $http.post('/api/recipes/move', formData)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(data){
          deferred.reject(data);
        });
      return deferred.promise;
    },
    delete: function(subcategoryId){
      var deferred = $q.defer();

      $http.delete('/api/subcategory/'+subcategoryId)
        .success(function(data){
          deferred.resolve(data);
        })
        .error(function(data){
          deferred.reject(data);
        });
      return deferred.promise;
    }
  };
});
