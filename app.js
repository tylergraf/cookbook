
/**
 * Module dependencies.
 */

var express = require('express')
  // routes = require('./routes'),
  // api = require('./routes/api');

  , fs = require('fs')
  , http = require('http')
  , path = require('path')
  , ejs = require('ejs')
  , expressLayouts = require('express-ejs-layouts')
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy
  , mongoose = require('mongoose')
  , MongoStore = require('connect-mongo')(express);


// DB CONNECTION
if(process.env.NODE_ENV === 'production'){
  mongoose.connect(process.env.MONGO_URL);
} else {
  mongoose.connect('mongodb://localhost/cookbook');
}


var app = module.exports = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('view options',{layout: 'layout'});
  app.use(express.favicon());
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

});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});



var controllers_path = __dirname + '/controllers'
  , controller_files = fs.readdirSync(controllers_path)
controller_files.forEach(function (file) {
  require(controllers_path+'/'+file)(app)
})


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

app.listen(5000, function(){
  console.log("Express server listening on port %d in %s mode", 5000, app.settings.env);
});
