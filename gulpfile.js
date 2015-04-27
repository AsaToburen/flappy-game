 var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// JavaScript linting task
//gulp.task('jshint', function() {
//  return gulp.src(['js/**/*.js', 'js/*.js'])
//    .pipe(jshint());
//    
//});

// Compile Sass task
gulp.task('sass', function() {
  return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css/'));
});

// Minify index
gulp.task('html', function() {
  gulp.src('index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});

// JavaScript build task, removes whitespace and concatenates all files
//gulp.task('scripts', function() {
//  gulp.src(['js/**/*.js', 'js/*.js'])
//    .pipe(concat('app.js'))
//    .pipe(uglify())
//    .pipe(gulp.dest('./build/js'));
//});

gulp.task('scripts', function() {
  return browserify('./js/main.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    //.pipe(uglify())
    .pipe(gulp.dest('js/'));
});

// Styles build task, concatenates all the files
gulp.task('styles', function() {
  gulp.src('css/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css'));
});

// Image optimization task
gulp.task('images', function() {
  gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});

// Watch task
gulp.task('watch', function() {
  gulp.watch(['js/**/*.js', 'js/*.js'], ['scripts']);
  gulp.watch('scss/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['sass', 'scripts', 'images', 'watch']);

// Build task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'styles', 'images']);