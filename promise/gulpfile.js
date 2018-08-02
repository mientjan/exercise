'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
  return gulp.src('./src/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['sass', 'browserSync'], function (){
  gulp.watch('./src/*.scss', ['sass']); 
  gulp.watch('./src/*.html', browserSync.reload); 
  gulp.watch('./src/*.js', browserSync.reload);
})

gulp.task('browserSync', function() {
  browserSync.init({
    startPath:'./',
    server:{
        baseDir: './src/'
    }
  })
})

gulp.task( 'default', [ 'watch' ] );