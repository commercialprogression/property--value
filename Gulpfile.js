'use strict';

var gulp = require('gulp'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  watch = require('gulp-watch');

gulp.task('css', function () {
  return gulp.src('dist/property--value.css')
    .pipe(cleanCSS({
      compatibility: '*'
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function() {
  gulp.src('scss/property--value.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
  gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('default', ['watch']);