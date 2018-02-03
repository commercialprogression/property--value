'use strict';

var gulp = require('gulp'),
  brotli = require('gulp-brotli'),
  cleanCSS = require('gulp-clean-css'),
  gzip = require('gulp-gzip'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  watch = require('gulp-watch');

gulp.task('brotli', function () {
  gulp.src('dist/property--value.min.css')
    .pipe(brotli.compress({
      extension: "br",
      quality: 11
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('css', function () {
  gulp.src('dist/property--value.css')
    .pipe(cleanCSS({
      compatibility: '*'
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('gzip', function() {
  gulp.src('dist/property--value.min.css')
    .pipe(gzip({
      gzipOptions: { level: 9 }
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('release', ['css', 'gzip', 'brotli']);

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
