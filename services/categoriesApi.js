/**
 * Module dependencies
 */
var Categories = require('../models/Categories.js');
  , debug = require("debug")("temple:soiService");
    

/**
 * Defines
 */
// var SOI_URL = process.env.SOI_URL || "https://familysearch.org/scopeservice/soi/request";

/**
 * Call the scope of interest service
 */
exports.allCategories = function(done) {
  
};

/**
 * Submit a scope of interest request
 */
exports.submitSoiRequest = function(accessToken, options, done) {
  options.p = 3;
  debug("SOI_URL:",SOI_URL);
  debug("options:",options);
  superagent
    .post(SOI_URL)
    .query({p: options.p})
    .query({a: options.a})
    .query({d: options.d})
    .send({o: null})
    .set("contentType", "application/json")
    .set("accept", "application/json")
    .set("authorization", "Bearer "+accessToken)
    .end(function(err, res) {
      debug("soi submit error:",err);
      if(err) return done(err);
      if(res.ok) return done(null, res.body);

      done(new Error(res.text));
    });
};


function paramifyJSON(obj){
 return JSON.parse('{"' + decodeURI("abc=foo&def=%5Basf%5D&xyz=5".replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')
}