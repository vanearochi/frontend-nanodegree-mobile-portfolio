var gulp = require('gulp');

gulp.task("alo", function(){
  console.log("bla")
})
var gutil = require('gulp-util'),
	connect = require('gulp-connect'),
	uglify = require('gulp-uglify'),
	gulpIf = require('gulp-if'),
	cssnano = require('gulp-cssnano'),
	htmlmin = require('gulp-htmlmin');
  imagemin = require('gulp-imagemin');
  useref = require('gulp-useref');
  ngrok = require('ngrok');

gulp.task('ngrok-url', function(cb) {
  return ngrok.connect(8080, function (err, url) {
    site = url;
    console.log('serving your tunnel from: ' + site);
    cb();
  });
});

gulp.task("jsmin", function(){
  return gulp.src("js/*.js")
  .pipe(uglify())
  .pipe(gulp.dest("dist/js"))
})

gulp.task('imagemin', function(){
	return gulp.src('images/*.+(png|jpg|jpeg|svg)')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))

});

gulp.task("cssmin", function(){
  return gulp.src('css/*.css')
  .pipe(cssnano())
  .pipe(gulp.dest('dist/css'))
})


gulp.task('htmlmin', function() {
  return gulp.src('dist/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});




