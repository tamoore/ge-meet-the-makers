var gulp = require('gulp'),
	shell = require('gulp-shell'),
	watch = require('gulp-watch'),
	sass = require('gulp-ruby-sass'),
	$ = require('gulp-load-plugins')(),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	htmlreplace = require('gulp-html-replace');

gulp.task('styles', function() {
	return sass('src/scss/main.scss')
	.on('error', function (err) {
      console.error('Error', err.message);
   	})
	.pipe(gulp.dest('src/css')).
	on('end', function(){
		reload();
	})
})

gulp.task('build', ['styles'], function() {
	gulp.src('./')
		.pipe(shell([
			'jspm bundle-sfx --minify src/lib/index',
			'mv ./build.js ./build/ && mv ./build.js.map ./build/',
			'cp -rf ./src/css ./build && cp -rf ./src/images ./build/images/',
			'cp -f ./src/boot.js ./build'
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
});

// Run development server environmnet
gulp.task('serve', ['styles'], function () {
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
    'src/lib/**/*.js',
    'src/images/**/*',
    '.tmp/scripts/**/*.js',
  ]).on('change', reload);

  gulp.watch('src/scss/**/*.scss', ['styles']);
});

