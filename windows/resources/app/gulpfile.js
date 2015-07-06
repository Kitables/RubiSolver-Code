var gulp = require('gulp'),
    sass = require('gulp-sass'),
    del = require('del')
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    concat = require('gulp-concat')
    defineModule = require('gulp-define-module');


gulp.task('clean', function(cb) {
    del('./dist', cb);
});

gulp.task('clean:css', function(cb) {
    del('./dist/css', cb);
});

gulp.task('clean:images', function(cb) {
    del('./dist/images', cb);
});

gulp.task('clean:js', function(cb) {
    del('./dist/js', cb);
});

gulp.task('clean:fonts', function(cb) {
    del('./dist/fonts', cb);
});

gulp.task('clean:templates', function(cb) {
    del('./dist/templates', cb);
});

gulp.task('sass', ['clean:css'], function() {
    gulp.src('./assets/sass/**/*.scss')
        .pipe(sass())
        .on('error', function() {
            console.error('Sass failed to compile');
        })
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('images', ['clean:images'], function() {
    gulp.src('./assets/images/**')
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('js', ['clean:js'], function() {
    gulp.src('./assets/js/**/*.js')
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('fonts', ['clean:fonts'], function() {
    gulp.src('./assets/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('templates', ['clean:templates'], function() {
    gulp.src('./assets/js/**/*.hbs')
        .pipe(handlebars())
        .pipe(defineModule('commonjs'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['sass', 'images'], function() {
    gulp.watch('./assets/sass/**/*.scss', ['sass']);
    gulp.watch('./assets/js/**/*.js', ['js']);
    gulp.watch('./assets/js/**/*.hbs', ['templates']);
});

gulp.task('default', ['sass', 'images', 'templates', 'js', 'fonts', 'watch']);
