'use strict';

var gulp = require('gulp');

// plugins
  var bower = require('gulp-bower'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename');




gulp.task('bower', function() {
  return bower()
  .pipe(gulp.dest('assets/components/'));
});


// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src([
    'assets/js/fb_redirect.js',
    'assets/js/app.js',
    'assets/js/services.js',
    'assets/js/controllers.js',
    'assets/js/filters.js',
    'assets/js/directives.js'
  ])
  .pipe(concat('build.js'))
  .pipe(gulp.dest('assets/build'))
  .pipe(rename('build.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('assets/build'));
});

// Concatenate & Minify Bower Components
gulp.task('bowerScripts', function() {
  return gulp.src([
    'assets/components/jquery/dist/jquery.min.js',
    'assets/components/angular/angular.min.js',
    'assets/components/angular-route/angular-route.min.js',
    'assets/components/angular-resource/angular-resource.min.js'
  ])
  .pipe(concat('components.js'))
  .pipe(gulp.dest('assets/build'))
  .pipe(rename('components.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('assets/build'));
});

gulp.task('watch', function() {
  gulp.watch('assets/js/**/*.js', ['scripts']);
  // gulp.watch('assets/css/**/*.css', ['styles']);
});

gulp.task('default', ['scripts','watch']);
gulp.task('prod', ['bowerScripts','scripts']);
