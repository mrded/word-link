'use strict';

const del = require('del');
const gulp = require('gulp');
const browserify = require('gulp-browserify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const pkg = require('./package.json');

const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins();

var banner = ['/**',
  ' * <%= pkg.name %> - @version v<%= pkg.version %> - @author <%= pkg.author %>',
  ' */',
  ''].join('\n');

gulp.task('clean', function(cb) {
  return del(['dist'], cb);
});

gulp.task('build', ['clean'], function() {
  return gulp.src(['./src/index.js'])
    .pipe(browserify())
    .pipe(babel({ presets: ["es2015"] }))
    .pipe(rename({ basename: "word-link", extname: '.js' }))
    .pipe(plugins.header(banner, { pkg: pkg }))
    .pipe(gulp.dest('dist'));
});

gulp.task('uglify', ['build'], function() {
  return gulp.src(['./dist/word-link.js'])
    .pipe(plugins.uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(plugins.header(banner, { pkg: pkg }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean', 'build', 'uglify']);
