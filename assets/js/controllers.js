'use strict';

/* Controllers */

function IndexCtrl($scope, $http) {
  $http.get('/api/categories').
    success(function(data, status, headers, config) {
      $scope.categories = data;
    });
}

function CategoryCtrl($scope, $http, $routeParams) {
  $http.get('/api/subcategories/'+$routeParams.id).
    success(function(data, status, headers, config) {
      $scope.subcategories = data;
    });
}
function SubcategoryCtrl($scope, $http, $routeParams) {
  $http.get('/api/recipes/'+$routeParams.id).
    success(function(data, status, headers, config) {
      $scope.recipes = data;
    });
}
function RecipeCtrl($scope, $http, $routeParams) {
  $http.get('/api/recipe/'+$routeParams.id).
    success(function(data, status, headers, config) {
      // console.log(data);
      $scope.recipe = data;
    });
}

function AddPostCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.submitPost = function () {
    $http.post('/api/post', $scope.form).
      success(function(data) {
        $location.path('/');
      });
  };
}

function ReadPostCtrl($scope, $http, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
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
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
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
}

function LeftNav($scope, $http, $location, $routeParams) {
  


  

  var search = angular.element('.search')

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
}
function theController($scope, $http) {
  $scope.recipes = [
  {
    "_id": "516207e7f51d344e4b6e7bbf",
    "subcategory_id": "ice cream",
    "title": "ICE CREAM",
    "subtitle": "Megan&#39;s recipe",
    "ingredients": "<p>1 large instant pudding (5.1 oz.) any flavor<br>2 cups milk<br>Mix together and let it set up in the refrigerator for about 10 minutes.</p>",
    "directions": "<p>In a bowl, mix 2 cups sugar, 4 cups milk, 2 cups cream, and 1 regular can of evaporated milk (abt. 14 oz.). Add the pudding mixture &amp; mix. Pour into an ice cream freezer and mix. Enjoy.</p>"
  },
  {
    "_id": "516207e7f51d344e4b6e7bc0",
    "subcategory_id": "ice cream",
    "title": "CHOCOLATE ICE CREAM",
    "subtitle": "",
    "ingredients": "<p>4 eggs beaten with blender<br>2 c. sugar<br>4 tsp. vanilla<br>1 pint heavy whipping cream<br>&frac12; tsp. salt<br>&frac14; &ndash; &frac12; tsp. lemon juice<br>fill up with milk to line in mixer.</p>",
    "directions": "<p>Beat the eggs, add sugar, vanilla, in mixer. Add salt and lemon juice. Pour in to mixer and fill the rest of the way up with milk to the line in mixer. Put ice cream in mixer and add rock salt and ice around the edge and turn it on. ENJOY!!!</p>"
  },
  {
    "_id": "516207e7f51d344e4b6e7bc1",
    "subcategory_id": "ice cream",
    "title": "CHOCOLATE ICE CREAM",
    "subtitle": "",
    "ingredients": "<p>6 c. milk<br>6 eggs beaten<br>3 c. sugar<br>3/8 tsp. salt<br>3 c. cream<br>2 TBS. vanilla<br>3 squares of unsweetened chocolate</p>",
    "directions": "<p>Beat the eggs, add sugar, salt, and milk. Add chocolate that has been melted. Cook over a double boiler until it coats the spoon. Put in the blender and whip until smooth. Cool. Add cream and vanilla. Put in ice cream freezer and add rock salt and ice around the edge and turn it on. ENJOY!!!</p>"
  },
  {
    "_id": "516207e7f51d344e4b6e7bc2",
    "subcategory_id": "ice cream",
    "title": "VANILLA ICE CREAM",
    "subtitle": "mom&#39;s favorite one",
    "ingredients": "<p>4 quarts<br><br>4 eggs<br>2 &frac12; c. sugar<br>6 c. milk<br>4 c. cream<br>2 TBS. vanilla<br>&frac12; tsp. salt</p><p>6 quarts<br><br>6 eggs<br>3 c. sugar<br>8 c. milk<br>6 c. cream<br>3 TBS. vanilla<br>&frac34; tsp. salt</p>",
    "directions": "<p>Beat eggs in a bowl until light. Add sugar to eggs beating until the mixture thickens. Add the milk and cream and vanilla and salt. Mix and put in the ice cream freezer. Put ice and rock salt around the edge and turn the machine on. ENJOY!!! You can add whatever flavoring or fruit or nuts you would like.</p>"
  },
  {
    "_id": "516207e7f51d344e4b6e7bc3",
    "subcategory_id": "ice cream",
    "title": "THROW ICE CREAM",
    "subtitle": "",
    "ingredients": "<p>1/3 c. sugar<br>1 c. milk (whatever flavor you want)<br>1 c. cream</p>",
    "directions": "<p>Put this mixture in a quart Ziplock bag and seal. Put this first ziplock bag into another quart ziplock bag and seal. Put this bag into a gallon ziplock bag and put ice and 1 &frac12; c. rock salt into the gallon bag around the milk mixture bags. Wrap this in 5 or 6 sheets of newspaper and tape it good with strong tape. Throw it around outside for about 20 minutes. Then open it and eat it. This is fun for kids!!!</p>"
  },
  {
    "_id": "516207e7f51d344e4b6e7bc4",
    "subcategory_id": "ice cream",
    "title": "ICE CREAM DESSERT",
    "subtitle": "KayLynn Johnson&#39;s recipe",
    "ingredients": "<p>&frac12; gallon pineapple sherbert (softened)<br>1 bag (12&ndash;16. oz.) frozen raspberries<br>&frac12; to &frac34; bag of miniature marshmallows<br>2&ndash;3 bananas (cut up)</p>",
    "directions": "<p>Put ice cream in an electric mixer bowl. Beat the ice cream until smooth. Add frozen raspberries and mix. Add marshmallow and bananas and mix it all up. It is a pretty ice cream dessert and so good!!!.</p>"
  },
  {
    "_id": "516207e7f51d344e4b6e7bc5",
    "subcategory_id": "ice cream",
    "title": "ICE CREAM DESSERT",
    "subtitle": "Sue Alldredge&#39;s recipe",
    "ingredients": "<p>&frac12; gallon vanilla ice cream (softened)<br>1 bag of frozen raspberries (12&ndash;16&ndash; oz.)<br>2&ndash;3 bananas cut up<br>chopped pecans (if desired)</p>",
    "directions": "<p>Mix ice cream until smooth. Add other ingredients and serve. Yum!!!</p>"
  },
  {
    "_id": "516207e7f51d344e4b6e7bc6",
    "subcategory_id": "ice cream",
    "title": "JELLO JIGGLERS",
    "subtitle": "",
    "ingredients": "<p>2 large packages of Jell&ndash;O<br>2 &frac12; c. boiling water (do not add cold water)</p>",
    "directions": "<p>Stir boiling water into gelatin. Dissolve completely. Pour mixture slowly into a 13x9x2 pan. Chill at least 3 hours until set. Cut into bite size pieces.</p>"
  },
  {
    "_id": "516207e7f51d344e4b6e7bc8",
    "subcategory_id": "ice cream",
    "title": "PINEAPPLE DELIGHT",
    "subtitle": "",
    "ingredients": "<p>24 graham cracker crushed<br>1/3 c. melted butter<br>&frac12; c. brown sugar</p><p>Mix the graham crackers, butter, &amp; brown sugar together. Line the bottom of an 8x8 cake pan. Put into refrigerator to chill. Save a little for the top to decorate.</p>",
    "directions": "<p>1 can evaporated milk &mdash;chilled<br>&frac14; c. sugar<br>1 small pkg. of lemon Jell&ndash;O<br>&frac12; c. boiling water<br>1 can 20 oz. crushed pineapple (drained)</p><p>Pour the chilled can of evaporated milk into a bowl and whip with an electric mixer. Add the sugar. Dissolve the Jell&ndash;O into &frac12; c. water and add to the milk mixture. Fold in1 can of drained crushed pineapple. Spread into pan with graham crackers and sprinkle a little graham cracker crumbs over the top. Chill at least 4 hours in the refrigerator. Double this for a 13x9x2 cake pan.</p>"
  },
  {
    "_id": "516207e7f51d344e4b6e7bc9",
    "subcategory_id": "ice cream",
    "title": "PINEAPPLE DESSERT",
    "subtitle": "",
    "ingredients": "<p>Cream: &frac12; c. butter<br>&frac12; c. sugar<br>Beat: 1 egg and mix together with butter and sugar<br>Add: 1 c. walnuts or pecans (chopped) and set aside.<br>Crush: &frac12; lb. of graham crackers and divide into 3 parts<br>Add: 1 part (a little less) of the graham crackers to the creamed mixture<br>Add: &frac12; can of medium pineapple (drained) to the creamed mixture also</p>",
    "directions": "<p>Place: 1 part of the graham crackers into the bottom of the pan 8x8 inch<br>Next: Put the egg&ndash; butter&ndash;sugar etc. mixture on top of the crushed grahams<br>Next: Place the rest of the drained pineapple on this mixture<br>Next: Place the rest of the crushed graham crackers on top of the pineapple.<br>Next: Put it in the refrigerator to chill. ENJOY!!!!</p>"
  },
  {
    "_id": "516207e7f51d344e4b6e7bca",
    "subcategory_id": "ice cream",
    "title": "TURNOVERS",
    "subtitle": "Mom made this up",
    "ingredients": "<p>1 c. shortening<br>1 egg<br>2 tsp. sugar<br>3 c. flour<br>1 tsp. salt<br>1 tsp. baking soda<br>1 tsp. cream of tartar<br>5 TBS. water</p>",
    "directions": "<p>Cream shortening, add egg and sugar. Add dry ingredients. Add water and mix. Knead until mixed. Roll out on floured board. Cut into squares and put a tablespoon or two of cherry or apple pie fillings or whatever kind you like and fold into a triangle and seal the edges. Bake at 350 until light brown. Drizzle with a thin powdered sugar frosting when cool.</p>"
  },
  {
    "_id": "516207e7f51d344e4b6e7bcb",
    "subcategory_id": "ice cream",
    "title": "CHOCOLATE&ndash;VANILLA PUDDING DESSERT",
    "subtitle": "",
    "ingredients": "<p>&frac12; c. butter<br>1 c. flour<br>1 c. nuts chopped<br>&frac14; c. powdered sugar</p>",
    "directions": "<p>Mix together and press into a 13x9x2 pan and bake at 350 for 15 minutes. Cool.</p><p>2 c. cool whip (small carton)<br>&frac12; c. powdered sugar<br>8 oz. cream cheese (softened)</p><p>Cream the cream cheese and add the powdered sugar and fold in the cool whip. Spread the cream cheese mixture over the cooled crust mixture in the pan. Make the instant chocolate pudding &amp; the vanilla instant pudding separately. Put the chocolate pudding on top of cream cheese mixture and then put the vanilla pudding on top of the chocolate pudding carefully. Refrigerate. Put chocolate shavings on top. Serve with a dot of cool whip.</p>"
  },
  {
    "_id": "516207e7f51d344e4b6e7bcc",
    "subcategory_id": "ice cream",
    "title": "PUMPKIN&ndash;CREAM CHEESE ROLL",
    "subtitle": "",
    "ingredients": "<p>3 large eggs<br>1 c. sugar<br>2/3 c. pumpkin<br>1 tsp. lemon juice<br>&frac34; c. flour<br>1 tsp. cinnamon<br>1 tsp. ginger<br>&frac12; tsp. nutmeg<br>&frac12; tsp. salt<br>1 tsp. baking powder<br><br>Filling:<br>1 c. powdered sugar<br>6 oz. cream cheese<br>4 TBS. butter softened<br>&frac12; tsp. vanilla</p>",
    "directions": "<p>Beat eggs on high for 5 minutes until very fluffy. Add sugar gradually and add pumpkin and lemon juice and mix together. Add flour, baking powder, cinnamon, ginger, nutmeg &amp; salt. Mix together. Spread into a greased floured cookie sheet 15x10x1. Bake at 375 for 15 minutes. Turn out onto a towel sprinkled with powdered sugar. Roll cake &amp; towel together lengthwise. Cool. Unroll when cool. Mix the filling ingredients together. Spread the filling onto the unrolled pumpkin bread. Roll up the pumpkin with the cream cheese filling. Chill. Enjoy!!!</p>"
  }
];
  // console.log('got to controller');
  // $http.get('/api/recipes/ice%20cream').success(successCallback);
  // function successCallback(data) {
  //   $scope.recipes = data;
  // }
}
function Ctrl3($scope) {
  $scope.title = 'Lorem Ipsum';
  $scope.text = 'Neque porro quisquam est qui dolorem ipsum quia dolor...';
}