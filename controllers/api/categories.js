var c = require('../../lib/categories.js'),
    debug = require('debug')('api:categories');

module.exports = function(app) {

  app.get("/api/categories", c.list, function(req, res, next) {
    res.json({categories: req.categories});
  });
  app.get("/api/category/:categoryId", c.get, function(req, res, next) {
    res.json({category: req.category});
  });
  app.post("/api/category/:category", c.newCategory, function(req, res, next) {
    res.json({category: req.newCategory});
  });
  app.get("/addIds", c.addIds, function(req, res, next) {
    res.json(204);
  });
  app.del("/api/category/:categoryId", c.deleteCategory, function(req, res, next) {
    res.json(204);
  });

};
