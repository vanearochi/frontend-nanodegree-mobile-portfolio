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
	htmlmin = require('gulp-htmlmin');

gulp.task('coffee', function(){
	gulp.src('js/main.js')
		.pipe(coffee({bare: true})
			.on('error', gutil.log))
		.pipe(gulp.dest('dist'))
});


var useref = require('gulp-useref');

gulp.task('useref', function(){
  return gulp.src('pizza.html')
    .pipe(useref())
    .pipe(gulpIf('js/*', uglify()))
    .pipe(gulpIf('css/*.css', cssnano()))
    .pipe(gulp.dest('dist'))

});


var ngrok = require('ngrok');

gulp.task('ngrok-url', function(cb) {
  return ngrok.connect(8080, function (err, url) {
    site = url;
    console.log('serving your tunnel from: ' + site);
    cb();
  });
});

var psi = require('psi');

gulp.task('psi-desktop', function (cb) {
  psi(site, {
    nokey: 'true',
    strategy: 'desktop'
  }, cb);
});

gulp.task('psi-mobile', function (cb) {
  psi(site, {
    nokey: 'true',
    strategy: 'mobile'
  }, cb);
});

var sequence = require('run-sequence');
var site = '';

gulp.task('psi-seq', function (cb) {
  return sequence(
    'ngrok-url',
    'psi-desktop',
    'psi-mobile',
    cb
  );
});

gulp.task('psi', ['psi-seq'], function() {
  console.log('Woohoo! Check out your page speed scores!')
  process.exit();
})

gulp.task('connect', function(){
	connect.server({
		root: 'dist',
		livereload: true
	})
});

var htmlSources = ['dist/*.html']

gulp.task('html', function(){
	gulp.src(htmlSources)
		.pipe(connect.reload())
});

var imagemin = require('gulp-imagemin');
gulp.task('imagemin', function(){
	return gulp.src('images/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))

});

var cache = require('gulp-cache');

gulp.task('images', function(){
  return gulp.src('img/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('htmlmin', function() {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});



gulp.task('default', ['connect', 'html'])

