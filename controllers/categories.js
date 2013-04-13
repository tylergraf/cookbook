/**
 * Module dependencies
 */
var Categories = require('../models/Categories.js'),
    debug = require('debug')('api:categories');
// var categoriesApi = require('../services/categoriesApi');

/**
 * Expose the api routes
 */
module.exports = function(app) {

  // TODO do we need app.restrict and check if they're a member here?

  app.get("/api/categories", categories, function(req, res, next) {
    res.json(res.categories);
  });

};


function categories(req, res, next) {
  Categories.find(function (err, categories) {
    if(err) return next(err);

    debug('Categories:',categories);

    res.categories = categories;
    next();
  })
}