/**
 * Created by Omkareshwar on 5/16/17.
 */

/**
 * Created by Omkareshwar on 5/16/17.
 */
var gulp = require('gulp'),
  minifyCSS = require('gulp-clean-css'),
  compass = require('gulp-compass'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  livereload = require('gulp-livereload'),
  sourcemaps = require('gulp-sourcemaps');


gulp.task('css', function () {
  return gulp.src('source/scss/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('landio.css'))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'))
    .pipe(livereload());
});

gulp.task('js', function () {
  //define scripts as array so we can prioritize them
  return gulp.src([
      'source/js/*.js'
    ]
  )
    .pipe(concat('landio.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js/landio.min.ja'))
});

gulp.task('compass', function () {
  gulp.src('./source/scss/*.scss')
    .pipe(compass({
      sass: './source/scss'
      //uncomment if you would like to include susy grids
      //require: ['susy']
    }))
    .pipe(gulp.dest('source/scss'));

  // gulp.src('./static/scss/main/*.scss')
  //   .pipe(compass({
  //     css: './static/css',
  //     sass: './static/scss'
  //     //uncomment if you would like to include susy grids
  //     //require: ['susy']
  //   }))
  //   .pipe(gulp.dest('static/_css'));
});

gulp.task('default', function () {
  gulp.start('compass', 'css', 'js');
  livereload.listen();
  gulp.watch('gulpfile.js');
  gulp.watch('source/scss/*.css', ['css']);
  gulp.watch('source/js/*.js', ['js']);
  gulp.watch('source/scss/bootstrap/*.scss', ['compass']);
  gulp.watch('source/scss/bootstrap/utilities/*.scss', ['compass']);
  gulp.watch('source/scss/*.scss', ['compass']);

});