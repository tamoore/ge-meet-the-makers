var gulp = require('gulp'),
	shell = require('gulp-shell'),
	watch = require('gulp-watch'),
	sass = require('gulp-ruby-sass'),
	postcss = require('gulp-postcss'),
	$ = require('gulp-load-plugins')(),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	htmlreplace = require('gulp-html-replace');
	var spawn = require('child_process').spawn;
	var gutil = require('gulp-util');


var pkg = require('./package.json');


gulp.task('styles', function() {
	return sass('src/scss/main.scss')
	.on('error', function (err) {
      console.error('Error', err.message);
   	})
	.pipe(gulp.dest('src/css'))
	.pipe(reload({stream: true}));
});

gulp.task('styles-mobile', function() {
	return sass('src/scss/main-mobile.scss')
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

gulp.task('deploy-staging', ['build'], function() {
	return gulp.src(['./'])
		.on('end', shell.task([
			'aws s3 sync ./build s3://labs.theguardian.com/meet-the-makers/development/build --profile labs --acl public-read --region us-west-1 --cache-control="max-age=0, no-cache"'
		]));
});

gulp.task('deploy-staging-mobile', ['build-mobile'], function() {
	return gulp.src(['./'])
		.on('end', shell.task([
			'aws s3 sync ./build s3://labs.theguardian.com/meet-the-makers/development/mobile/build --profile labs --acl public-read --region us-west-1 --cache-control="max-age=0, no-cache"'
	]));
});

gulp.task('build', ['styles'], function() {
	gulp.src('./')
		.pipe(shell([
			'jspm bundle-sfx --minify src/lib/index',
			'mv ./build.js ./build/ && mv ./build.js.map ./build/',
			'cp -rf ./src/css ./build && cp -rf ./src/images/ ./build/images/ && cp -rf ./src/static/static-scripts.js ./build/static/',
			'cp ./src/manifest.mf ./build'
		]));

	gulp.src('./src/index.html')
		.pipe(htmlreplace({
			src: './src/index.html',
			'js': {
				src: ['build.js']
			},
			'css': {
				src: ['css/main.css']
			}
		}))
	.pipe(gulp.dest('build/'));
	
	
<<<<<<< HEAD

	gulp.src('./src/static/*.html')
	.pipe(htmlreplace({
		src: './src/static/*.html',
		'js': {
			src: ['https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js','static-scripts.js']
		},
		'css': {
			src: ['../css/main.css']
		}
	}))
	.pipe(gulp.dest('build/static/'));
});

gulp.task('build-mobile', function(){
	gulp.src('./')
	.pipe(shell([
		'jspm bundle-sfx --minify src/lib-mobile/index',
		'mv ./build.js ./build/ && mv ./build.js.map ./build/',
		'cp -rf ./src/css ./build && cp -rf ./src/images/ ./build/images/ && cp -rf ./src/static/static-scripts.js ./build/static/'

	]));
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
});
=======
>>>>>>> eae5f4db8cb414a553f64072bddf71f2bb9c0d6f

gulp.task('print-images', function() {
	for (var makercount = 1; makercount <= 6; makercount++) {
		for (var assetcount = 1; assetcount <= 24; assetcount++) {
			console.log('http://cdn.labs.theguardian.com/2015/meet-the-makers/images/maker0' + makercount + '_' + (assetcount < 10 ? '0' : '') + assetcount + '.jpg')
		}
	}
});

gulp.task('build-mobile', function(){
	gulp.src('./')
	.pipe(shell([
		'jspm bundle-sfx --minify src/lib-mobile/index',
		'mv ./build.js ./build/ && mv ./build.js.map ./build/',
		'cp -rf ./src/css ./build && cp -rf ./src/images/ ./build/images/ && cp -rf ./src/static/static-scripts.js ./build/static/'

	]));
	gulp.src('./src/index-mobile.html')
		.pipe(htmlreplace({
			src: './src/index-mobile.html',
			'js': {
				src: ['build.js', 'static/static-scripts.js']
			},
			'css': {
				src: ['css/main-mobile.css']
			}
		}))
	.pipe(gulp.dest('build/'));
});

// Run development server environmnet
gulp.task('serve-desktop', ['styles'], function () {
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
    'src/lib/**/*.js',
    'src/lib/**/*.jsx',
    'src/lib-mobile/**/*.js',
    'src/lib-mobile/**/*.jsx',
    'src/images/**/*',
    '.tmp/scripts/**/*.js',
  ]).on('change', reload);
  gulp.watch('src/scss/**/*.scss', ['styles', 'styles-mobile']);
});

// Run development server environmnet
gulp.task('serve-mobile', ['styles'], function () {
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


