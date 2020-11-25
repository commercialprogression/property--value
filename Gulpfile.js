'use strict';

var gulp = require('gulp'),
  brotli = require('gulp-brotli'),
  cleanCSS = require('gulp-clean-css'),
  gzip = require('gulp-gzip'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps');

function compileSass() {
  return gulp.src('scss/property--value.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'));
}

function compressBrotli() {
  return gulp.src('dist/property--value.min.css')
    .pipe(brotli.compress({
      extension: "br",
      quality: 11
    }))
    .pipe(gulp.dest('./dist/'));
}

function compressGzip() {
  return gulp.src('dist/property--value.min.css')
    .pipe(gzip({
      gzipOptions: { level: 9 }
    }))
    .pipe(gulp.dest('./dist/'));
}

function css() {
  return gulp.src('dist/property--value.css')
    .pipe(cleanCSS({
      compatibility: '*'
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/'));
}

var release = gulp.series(compileSass, css, gulp.parallel(compressGzip, compressBrotli));

exports.compileSass = compileSass;
exports.compressBrotli = compressBrotli;
exports.compressGzip = compressGzip;
exports.css = css;
exports.release = release;

exports.default = release;
