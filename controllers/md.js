/**
 * Module dependencies
 */
var toMarkdown = require('to-markdown').toMarkdown,
    Recipe = require('../models/Recipes.js');
/**
 * Expose the api routes
 */
module.exports = function(app) {

  app.get("/convert", function(req, res, next) {
    Recipe.find().limit(10).exec(function(err, recipes){
      if(err) return next(err);
      var recips = [];

      recipes.forEach(function(recipe){
        var directions = toMarkdown(recipe.directions);
        var ing = (recipe.ingredients) ? recipe.ingredients.replace(/\<br\>/g,'\r* ') : null;
        var ingredients = toMarkdown(ing);

        recips.push({directions: directions, ingredients: ingredients, recipe: recipe});
      });

      res.render('recips',{recipes: recips, user: req.user})
      // res.json({directions: directions, ingredients: ingredients, recipe: recipe})
    });
  });

};
