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

var appConfig = require('./src/lib/config');
var pkg = require('./package.json');


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
			'cp -rf ./src/css ./build && cp -rf ./src/images/ ./build/images/ && cp -rf ./src/static/static-scripts.js ./build/static/'
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
	  'src/**/*.html',
    'src/lib/**/*.js',
    'src/images/**/*',
    '.tmp/scripts/**/*.js',
  ]).on('change', reload);

  gulp.watch('src/scss/**/*.scss', ['styles']);
});

gulp.task('transcode-ambient-videos', function(){
	var makerCount = appConfig.preload.MAKER_COUNT;
	var ambientVideosCount = appConfig.preload.MAKER_AMBIENT_COUNT;
	var makercount = 1;
	var assetcount = 1;
	var config = pkg.config;
	while(makercount <= makerCount){
		while(assetcount <= ambientVideosCount){

				var child = spawn("aws",
					[	'elastictranscoder',
						'create-job',
						'--pipeline-id',
						config.transcoderPipelineId,
						'--input',
						JSON.stringify({"Key": appConfig.preload.MAKER_AMBIENT_PREFIX +'0'+makercount +'_'+(assetcount < 10? '0':'')+assetcount+'.mp4' }),
						'--profile',
						'labs',
						'--region',
						'us-east-1',
						'--outputs',
						JSON.stringify([{"Key": appConfig.preload.MAKER_AMBIENT_PREFIX +'0'+makercount +'_'+(assetcount < 10? '0':'')+assetcount+'.mp4', "PresetId": config.transcoderPresetId }]),
						'--output-key-prefix',
						config.s3Prefix+'videos/'
					],
					{cwd: process.cwd()}
				),
					stdout = '',
					stderr = '';

				child.stdout.setEncoding('utf8');
				child.stdout.on('data', function (data) {
					stdout += data;
					gutil.log(data);
				});
				child.stderr.setEncoding('utf8');
				child.stderr.on('data', function (data) {
					stderr += data;
					gutil.log(gutil.colors.red(data));
					gutil.beep();
				});
				child.on('close', function(code) {
					gutil.log("Done with exit code", code);

				});
			assetcount++;
		}
		makercount++;
	}

});

