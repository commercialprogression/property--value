var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  watch = require('gulp-watch');

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