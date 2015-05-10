var v = require('../../lib/views.js'),
    debug = require('debug')('api:views');

module.exports = function(app) {
  'use strict';
  
  app.post("/api/view/:recipeId", v.newView, function(req, res, next) {
    res.json();
  });

};
