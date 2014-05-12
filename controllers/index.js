/**
 * Module dependencies
 */
// var m = require("../lib/middleware");

/**
 * Expose the api routes
 */
module.exports = function(app) {
  var routes = [
  '/',
  '/login',
  '/create-account',
  '/favorites',
  '/recipes/:slug',
  '/category/:slug',
  '/subcategory/:slug',
  '/recipe/:slug'
  ];
  routes.forEach(function(r){
    app.get(r, function(req, res, next) {
      res.render('angular', {user: req.user});
    });
  });

  // app.get("/login", function(req, res, next) {
  //   res.render('angular');
  // });
  // app.get("/create-account", function(req, res, next) {
  //   res.render('angular');
  // });
  // app.get('/recipes/:slug', function(req, res, next){
  //   res.render('angular');
  // });
  // app.get('/category/:slug', function(req, res, next){
  //   res.render('angular');
  // });
  // app.get('/subcategory/:slug', function(req, res, next){
  //   res.render('angular');
  // });
  // app.get('/recipe/:slug', function(req, res, next){
  //   res.render('angular');
  // });
};
