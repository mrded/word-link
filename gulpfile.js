'use strict';

const del = require('del');
const gulp = require('gulp');
const browserify = require('browserify');
const rename = require('gulp-rename');
const pkg = require('./package.json');
const source = require('vinyl-source-stream');

const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins();

const banner = ['/**',
  ' * <%= pkg.name %> - @version v<%= pkg.version %> - @author <%= pkg.author %>',
  ' */',
  ''].join('\n');

gulp.task('clean', function(cb) {
  return del(['dist'], cb);
});

gulp.task('build', ['clean'], function() {
  return browserify('./src/index.js')
    .transform("babelify", {
      presets: ["@babel/preset-env"]
    })
    .bundle()
    .pipe(source('word-link.js'))
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
