var libjs = [
  'lodash/dist/lodash.js',
  'angular/angular.js',
  'ui-router/release/angular-ui-router.js',
  'angular-animate/angular-animate.js',
  'angular-messages/angular-messages.js',
  'angular-ui-router/release/angular-ui-router.js',
  'restangular/dist/restangular.js',
  'angular-mocks/angular-mocks.js',
  'satellizer/satellizer.js'
];

var libcss = [
  'bootstrap/dist/css/bootstrap.css'
];

var libfonts = [
  'bootstrap/dist/fonts/*',
  'font-awesome/fonts/*',
  'lato/font/*'
];

var appjs = [
  'module.js',
  'mockRest.js',
  '*/*.js'
];

var
  gulpLoadPlugins = require('gulp-load-plugins'),
  plugins = gulpLoadPlugins(),
  CacheBuster = require('gulp-cachebust'),
  cachebustJs = new CacheBuster(),
  cachebustCss = new CacheBuster(),
  concat = require('gulp-concat-sourcemap'),
  gulp = require('gulp');

/* External libraries */

gulp.task('lib-js', function () {
  return gulp.src(libjs, {cwd: './bower_components/'})
//    .pipe(plugins.uglify())
    .pipe(concat('moonshot-lib.min.js'))
    .pipe(cachebustJs.resources())
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('lib-css', function () {
  return gulp.src(libcss, {cwd: './bower_components/'})
    .pipe(plugins.cssmin())
    .pipe(concat('moonshot-lib.min.css'))
    .pipe(cachebustCss.resources())
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('lib-fonts', function () {
  return gulp.src(libfonts, {cwd: './bower_components/'})
    .pipe(gulp.dest('dist/lib/fonts'));
});

/*  Project source files */

gulp.task('app-js', function () {
  return gulp.src(appjs, {cwd: './src/'})
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
//    .pipe(plugins.uglify())
    .pipe(concat('moonshot.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('app-css', function () {
  gulp.src('src/styles.less')
    .pipe(plugins.less())
//    .pipe(plugins.cssmin())
    .pipe(concat('moonshot.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('app-partials', function () {
  var templateCache = require('gulp-angular-templatecache');
  gulp.src('src/**/*.partial.html')
    .pipe(templateCache('moonshot-templates.js',
                        {module: 'moonshot', root:'/'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('app-html', ['app-js', 'app-css', 'app-partials'], function () {
  gulp.src('src/index.tpl.html')
    .pipe(plugins.template({name: 'Paulie'}))
    .pipe(cachebustJs.references())
    .pipe(cachebustCss.references())
    .pipe(plugins.rename('index.html'))
    .pipe(gulp.dest('dist'));
});

gulp.task('app-css-watch', function () {
  var watcher = gulp.watch('./src/**/*.less', ['app-css']);
  watcher.on('change', function (event) {
    console.log('#### Changed: ' + event.path);
  });
});


gulp.task('app-js-watch', function () {
  var watcher = gulp.watch('./src/**/*.js', ['app-js']);
  watcher.on('change', function (event) {
    console.log('#### Changed: ' + event.path);
  });
});

gulp.task('app-html-watch', ['webserver'], function () {
  var watcher = gulp.watch('./src/index.tpl.html', ['app-html']);
  watcher.on('change', function (event) {
    console.log('#### Changed: ' + event.path);
  });
});

gulp.task('app-partials-watch', ['webserver'], function () {
  var watcher = gulp.watch('./src/**/*.partial.html', ['app-partials']);
  watcher.on('change', function (event) {
    console.log('#### Changed: ' + event.path);
  });
});

gulp.task('webserver', function () {
  gulp.src('dist')
    .pipe(
    plugins.webserver(
      {
        livereload: true,
        port: 9000
      }));
});

gulp.task('default', [
  // Run some tasks just on startup
  'lib-css', 'lib-js', 'lib-fonts',
  'app-html',
  'app-js-watch',
  'app-css-watch',
  'app-partials-watch',
  'app-html-watch'
]);
