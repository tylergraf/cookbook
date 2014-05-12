var m = require('../lib/middleware.js'),
    u = require('../lib/users.js'),
    p = require('passport'),
    debug = require('debug')('api:auth');

module.exports = function(app) {

  app.post("/api/login", function(req, res, next) {
    debug("req.body",req.body);
    var user = req.body.user;
    if(!user){res.json(400, {message: "Please format user correctly."})}
    // if(typeof req.body.username )
    // TODO: move this to middleware
    p.authenticate('local', function(err, user) {
      debug('err',err);
      debug('user',user);
      if(err) {res.json(500, {message: "An Error Occurred."});}

      if(!user){res.json(404, {message: "Incorrect username or password"});}
      else {
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          user.password = null;
          delete user.password;
          res.json(user);
        });
      }

    })(req,res,next)
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/facebook',
    p.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    p.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });


}
