var r = require('../../lib/recipes.js'),
    debug = require('debug')('api:recipes');

module.exports = function(app) {

  app.get("/api/recipes/:subcategoryId", r.list, function(req, res, next) {
    res.json({recipes: req.recipes, subcategory: req.subcategory});
  });
  app.get("/api/recipe/:id", r.get, function(req, res, next) {
    res.json({recipe: req.recipe, subcategory: req.subcategory});
  });
  app.post("/api/recipes/move", r.move, function(req, res, next) {
    res.json(204);
  });
  // app.del("/api/subcategory/:subcategoryId", r.deleteSu, function(req, res, next) {
  //   res.json(204);
  // });

  app.get("/api/search/:searchTerm", r.search, function(req, res, next) {
    res.json(req.recipes);
  });

};
