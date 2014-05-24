var gulp = require('gulp'),
uglify = require('gulp-uglify'),
concat = require('gulp-concat');

gulp.task('default', function(){
    gulp.src('./src/**/*.js')
	.pipe(concat('html5lock-compact.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/'))

    gulp.src('./src/*.js')
	.pipe(concat('html5lock.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/'))
});


