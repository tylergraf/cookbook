/**
 * Module dependencies
 */
var Subcategories = require('../models/Subcategories.js'),
    debug = require('debug')('api:subcategories');
// var categoriesApi = require('../services/categoriesApi');

/**
 * Expose the api routes
 */
module.exports = function(app) {

  // TODO do we need app.restrict and check if they're a member here?

  app.get("/api/subcategories/:categoryId", subcategories, function(req, res, next) {
    res.json(res.subcategories);
  });

};


function subcategories(req, res, next) {
  var categoryId = req.params.categoryId;
  Subcategories.find({category_id: categoryId},function (err, subcategories) {
    if(err) return next(err);

    debug('Subcategories:',subcategories);

    res.subcategories = subcategories;
    next();
  })
}