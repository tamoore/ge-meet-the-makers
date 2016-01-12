var gulp = require('gulp'),
	shell = require('gulp-shell'),
	watch = require('gulp-watch'),
	sass = require('gulp-ruby-sass'),
	postcss = require('gulp-postcss'),
	$ = require('gulp-load-plugins')(),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	htmlreplace = require('gulp-html-replace');
<<<<<<< HEAD

gulp.task('styles', function() {
	return sass('src/scss/main.scss')
	.on('error', function (err) {
      console.error('Error', err.message);
   	})
	.pipe(gulp.dest('src/css')).
	on('end', function(){
		reload();
	})
});

gulp.task('build', ['styles'], function() {
	gulp.src('./')
		.pipe(shell([
			'jspm bundle-sfx --minify src/lib/index',
			'mv ./build.js ./build/ && mv ./build.js.map ./build/',
			'cp -rf ./src/css ./build && cp -rf ./src/images/ ./build/images/'
		]));
=======
	var spawn = require('child_process').spawn;
	var gutil = require('gulp-util');


var pkg = require('./package.json');

gulp.task('styles', function() {
	return sass('src/scss/main.scss', {
		container: 'gulp-ruby-sass',
		verbose: true
	})
	.on('error', function (err) {
		console.error('Error', err.message);
	})
	.pipe(gulp.dest('src/css'))
	.pipe(reload({stream: true}));
});


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

gulp.task('deploy-staging-mobile', ['build-mobile'], function() {
	return gulp.src(['./'])
		.on('end', shell.task([
			'aws s3 sync ./build s3://labs.theguardian.com/meet-the-makers/development/mobile/build --profile labs --acl public-read --region us-west-1 --cache-control="max-age=0, no-cache"'
	]));
});

gulp.task('deploy-staging', [], function() {
	return gulp.src(['./'])
		.on('end', shell.task([
			'aws s3 sync ./build s3://labs.theguardian.com/meet-the-makers/staging/build --profile labs --acl public-read --region us-west-1 --cache-control="max-age=0, no-cache"'
		]));
});

gulp.task('deploy-production', ['build'], function() {
	return gulp.src(['./'])
		.on('end', shell.task([
			'aws s3 sync build s3://labs.theguardian.com/innovation-never-sleeps/ --profile labs --acl public-read --region us-west-1 --cache-control="max-age=0, no-cache"'
		]));
});

gulp.task('build-all', ['build', 'build-mobile'], function(){

})

gulp.task('build', function() {
	gulp.src('./')
	.pipe(shell([
		'jspm bundle-sfx --minify src/bootstrap',
		'mv ./build.js ./build/ && mv ./build.js.map ./build/',
		'cp -rf ./src/css ./build && cp -rf ./src/images/ ./build/images/',
		'cp ./src/manifest.mf ./build',
		'cp ./src/not-supported.html ./build'
	]));
>>>>>>> 957e1911c6f61c0a16982467ca13029cb1c3e535

	gulp.src('./src/index.html')
		.pipe(htmlreplace({
			src: './src/index.html',
			'js': {
				src: ['build.js']
<<<<<<< HEAD
			},
			'css': {
				src: ['css/main.css']
			}
		}))
	.pipe(gulp.dest('build/'));
});

// Run development server environmnet
gulp.task('serve', ['styles'], function () {
=======
			}
		}))
	.pipe(gulp.dest('build/'));

});


gulp.task('print-images', function() {
	for (var makercount = 1; makercount <= 6; makercount++) {
		for (var assetcount = 1; assetcount <= 24; assetcount++) {
			console.log('http://cdn.labs.theguardian.com/2015/meet-the-makers/images/maker0' + makercount + '_' + (assetcount < 10 ? '0' : '') + assetcount + '.jpg')
		}
	}
});


gulp.task('serve-desktop', ['styles'], function () {
>>>>>>> 957e1911c6f61c0a16982467ca13029cb1c3e535
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
<<<<<<< HEAD
    'src/lib/**/*.js',
=======
    'src/**/*.html',
    'src/lib/**/*.js',
    'src/lib/**/*.jsx',
>>>>>>> 957e1911c6f61c0a16982467ca13029cb1c3e535
    'src/images/**/*',
    '.tmp/scripts/**/*.js',
  ]).on('change', reload);

  gulp.watch('src/scss/**/*.scss', ['styles']);
});

<<<<<<< HEAD
=======
// Run development server environmnet
gulp.task('serve-mobile', ['styles-mobile'], function () {
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


>>>>>>> 957e1911c6f61c0a16982467ca13029cb1c3e535
