
/**
 * Module dependencies.
 */

var express = require('express'),
    fs = require('fs'),
    http = require('http'),
    etagify = require('etagify'),
    path = require('path'),
    ejs = require('ejs'),
    expressLayouts = require('express-ejs-layouts'),
    passport = require('passport'),
    util = require('util'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(express);


// DB CONNECTION
if(process.env.NODE_ENV === 'production'){
  mongoose.connect(process.env.MONGO_URL);
} else {
  mongoose.connect('mongodb://localhost/cookbook');
}


var app = module.exports = express();

// Configuration

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('view options',{layout: 'layout'});
  app.use(express.favicon());
  // app.use(etagify);
  app.use(expressLayouts);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(express.cookieParser());
  app.use(express.session(
    {
      secret: 'THE SECRETEST KEY IN THE SWEARWORDS.',
      store: new MongoStore({
        mongoose_connection: mongoose.connections[0]
      })
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'assets')));
  app.use(function(req, res, next) {
    console.log(req.user);
    if (req.user) {
      app.locals.user = req.user;
    }
    next();
  });
  app.use(clientErrorHandler);

});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


function loadControllers(folder) {
  folder.forEach(function (file) {
    if (fs.lstatSync(__dirname + '/controllers/' + file).isDirectory()) {
      var insideFiles = fs.readdirSync(__dirname + '/controllers/' + file);
      insideFiles.forEach(function(insideFile) {
        require(__dirname + '/controllers/' + file + '/' + insideFile)(app);
      });
    } else {
      require(controllers_path+'/'+file)(app);
    }
  });
}
// LOAD ROUTES AND CONTROLLERS
var controllers_path = __dirname + '/controllers',
    controller_files = fs.readdirSync(controllers_path);
    loadControllers(controller_files);

// var controllers_path = __dirname + '/controllers'
//   , controller_files = fs.readdirSync(controllers_path)
// controller_files.forEach(function (file) {
//   require(controllers_path+'/'+file)(app)
// })
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    var code = err.code || 500,
        message = err.message || 'Something blew up.';

    res.json(code, {code: code, message: message });
  } else {
    next(err);
  }
}

// Routes

// app.get('/', routes.index);
// app.get('/partials/:name', routes.partials);

// JSON API

// app.get('/api/posts', api.posts);

// app.get('/api/post/:id', api.post);
// app.post('/api/post', api.addPost);
// app.put('/api/post/:id', api.editPost);
// app.delete('/api/post/:id', api.deletePost);

// redirect all others to the index (HTML5 history)


// Start server

app.listen(app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
