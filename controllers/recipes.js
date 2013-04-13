/**
 * Module dependencies
 */
var Recipes = require('../models/Recipes.js'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    debug = require('debug')('api:recipes');
// var categoriesApi = require('../services/categoriesApi');

/**
 * Expose the api routes
 */
module.exports = function(app) {

  app.get("/api/recipes/:subcategoryId", recipes, function(req, res, next) {
    res.json(res.recipes);
  });
  app.get("/api/recipe/:id", recipe, function(req, res, next) {
    res.json(res.recipe);
  });
  app.get("/api/search/:searchTerm", search, function(req, res, next) {
    res.json(res.recipe);
  });

};


function recipes(req, res, next) {
  var subcategoryId = req.params.subcategoryId;
  Recipes.find({subcategory_id: subcategoryId},function (err, recipes) {
    if(err) return next(err);

    debug('Recipes:',recipes);

    res.recipes = recipes;
    next();
  })
}

function recipe(req, res, next) {
  var id = req.params.id;
  debug('id','ObjectId("'+id+'")');
  Recipes.findOne({_id: id},function(err, recipe){
    if(err) return next(err);

    debug('Recipe:',recipe);

    res.recipe = recipe;
    next();
  })
}

function search(req, res, next) {
  var searchTerm = req.params.searchTerm;
  searchTerm = searchTerm.replace('&', '&amp;');
  debug('searchTerm',searchTerm);
  // searchText.match(/\SIce cream/im)
  var reg = new RegExp(searchTerm,'im');
  debug('reg',reg);

  Recipes.find({'title': reg}).limit(50).exec(function (err, searchResults) {
    if(err) return next(err);
    // debug('Recipe:',output);

    res.recipe = searchResults;
    next();
  });
}