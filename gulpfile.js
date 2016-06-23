var gulp = require('gulp');

gulp.task('hello', function() {

  console.log("bla")
  .pipe(connect.reload())
});
var gutil = require('gulp-util'),
	coffee = require('gulp-coffee'),
	connect = require('gulp-connect'),
	uglify = require('gulp-uglify'),
	gulpIf = require('gulp-if'),
	cssnano = require('gulp-cssnano'),
	htmlmin = require('gulp-htmlmin'),
  useref = require('gulp-useref'),
  ngrok = require('ngrok');

gulp.task('useref', function(){

  return gulp.src('index.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('ngrok-url', function(cb) {
  return ngrok.connect(8080, function (err, url) {
    site = url;
    console.log('serving your tunnel from: ' + site);
    cb();
  });
});

// gulp.task('connect', function(){
// 	connect.server({
// 		root: 'dist',
// 		livereload: true
// 	})
// });

var htmlSources = ['dist/*.html']

gulp.task('html', function(){
	gulp.src(htmlSources)
		.pipe(connect.reload())
});

var imagemin = require('gulp-imagemin');
gulp.task('imagemin', function(){
	return gulp.src('img/*.+(png|jpg|jpeg|gif|svg)')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))

});

var cache = require('gulp-cache');



gulp.task('htmlmin', function() {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});





