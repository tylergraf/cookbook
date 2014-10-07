var s = require('../../lib/subcategories.js'),
    debug = require('debug')('api:subcategories');

module.exports = function(app) {

  app.get("/api/subcategories/:categoryId", s.list, function(req, res, next) {
    res.json({subcategories: req.subcategories, category: req.category});
  });
  app.post("/api/subcategory/new", s.newSubcategory, function(req, res, next) {
    res.json({subcategory: req.newSubcategory});
  });
  app.post("/api/subcategories/move", s.moveSubcategory, function(req, res, next) {
    res.json(204);
  });
  app.del("/api/subcategory/:subcategoryId", s.deleteSubcategory, function(req, res, next) {
    res.json(204);
  });

};
