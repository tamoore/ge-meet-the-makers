var gulp = require('gulp'),
	shell = require('gulp-shell'),
	watch = require('gulp-watch'),
	del = require('del'),
	sass = require('gulp-ruby-sass'),
	postcss = require('gulp-postcss'),
	$ = require('gulp-load-plugins')(),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	htmlreplace = require('gulp-html-replace');
	var spawn = require('child_process').spawn;
	var gutil = require('gulp-util');


var pkg = require('./package.json');

gulp.task('styles-mobile', function() {
	return sass('src/scss/main-mobile.scss', {
		container: 'gulp-ruby-sass',
		verbose: true
	})
	.on('error', function (err) {
      console.error('Error', err.message);
   	})
	.pipe(gulp.dest('src/css'))
	.pipe(reload({stream: true}));
});

gulp.task('deploy-scratch', function() {
	return gulp.src(['./'])
		.on('end', shell.task([
			'aws s3 sync ./scratch s3://cdn.labs.theguardian.com/2015/meet-the-makers/scratch/ --profile labs --acl public-read --region ap-southeast-2 --cache-control="max-age=0, no-cache"'
		]));
});

gulp.task('deploy-staging-mobile', function() {
	gulp.src('./src/index-mobile.html')
	.pipe(htmlreplace({
		src: './src/index-mobile.html',
		'js': {
			src: ['build.js']
		},
		'css': {
			src: ['css/main-mobile.css']
		}
	}))
	.pipe(gulp.dest('build/'));
	gulp.src('./')
	.pipe(shell([
		'jspm bundle-sfx --minify src/lib-mobile/index',
		'mv ./build.js ./build/ && mv ./build.js.map ./build/',
		'cp -rf ./src/css ./build && cp -rf ./src/images/ ./build/ && cp -rf ./src/static/static-scripts.js ./build/static/'
	])).on('end', shell.task([
			'aws s3 sync ./build s3://labs.theguardian.com/meet-the-makers/staging/mobile/build --profile labs --acl public-read --region us-west-1 --cache-control="max-age=0, no-cache"'
	]));
});

gulp.task('build-mobile', ['styles-mobile'], function(){
	gulp.src('./src/index-mobile.html')
		.pipe(htmlreplace({
			src: './src/index-mobile.html',
			'js': {
				src: ['build.js']
			},
			'css': {
				src: ['css/main-mobile.css']
			}
		}))
	.pipe(gulp.dest('build/'));
	gulp.src('./')
	.pipe(shell([
		'jspm bundle-sfx --minify src/lib-mobile/index',
		'mv ./build.js ./build/ && mv ./build.js.map ./build/',
		'cp -rf ./src/css ./build && cp -rf ./src/images/ ./build/ && cp -rf ./src/static/static-scripts.js ./build/static/'
	]));
});

gulp.task('clean-build', function(cb){
	del([
    'build/build.js',
    'build/build.js.map',
  ], cb);
});

// Run development server environmnet
gulp.task('serve', ['styles-mobile'], function () {
  browserSync({
    notify: false,
    port: 9000,
    ui: {
      port: 9001
    },
    server: {
      baseDir: ['.tmp', 'src'],
      routes: {
        '/jspm_packages': 'jspm_packages',
        '/config.js': 'config.js'
      }
    }
  });

  // watch for changes
  gulp.watch([
    'src/**/*.txt',
    'src/*.html',
    'src/**/*.html',
    'src/lib-mobile/**/*.js',
    'src/lib-mobile/**/*.jsx',
    'src/images/**/*',
    '.tmp/scripts/**/*.js',
  ]).on('change', reload);
  gulp.watch('src/scss/**/*.scss', ['styles-mobile']);
});


