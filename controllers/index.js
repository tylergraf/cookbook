/**
 * Module dependencies
 */
// var m = require("../lib/middleware");

/**
 * Expose the api routes
 */
module.exports = function(app) {


  app.get("/", function(req, res, next) {
    res.render('angular');
  });
  app.get('/recipes/:slug', function(req, res, next){
    res.render('angular');
  });
  app.get('/category/:slug', function(req, res, next){
    res.render('angular');
  });
  app.get('/subcategory/:slug', function(req, res, next){
    res.render('angular');
  });
  app.get('/recipe/:slug', function(req, res, next){
    res.render('angular');
  });
};
