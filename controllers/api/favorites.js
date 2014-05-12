var f = require('../../lib/favorites.js'),
    debug = require('debug')('api:favorites');

module.exports = function(app) {

  app.get("/api/favorite/:recipeId", f.getFavorite, function(req, res, next) {
    res.json({favorite: req.favorite});
  });
  app.get("/api/favorites", f.list, function(req, res, next) {
    res.json({favorites: req.favorites});
  });
  app.post("/api/favorite/:recipeId", f.newFavorite, function(req, res, next) {
    res.json({favorite: req.newFavorite});
  });
  app.del("/api/favorite/:recipeId", f.deleteFavorite, function(req, res, next) {
    res.json(204);
  });

}
