var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var sass = require('gulp-sass');
var auto_prefixer = require('gulp-autoprefixer');
var clean_css = require('gulp-clean-css');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');

gulp.task('html', function () {
    gulp.src(['index.html'])
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});

gulp.task('build', gulpsync.async(['html', ['sass', 'css'], 'js']), function () {

});

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(livereload());
});

gulp.task('default', function () {
    console.log('running default task')
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('index.html', ['html']);
    gulp.watch('css/**/*.css', ['css']);
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('js/**/*.js', ['js']);
});

gulp.task('css', function () {
    return gulp.src('./css/**/*.css')
        .pipe(clean_css({compatibility: 'ie9'}))
        .pipe(auto_prefixer('last 2 version', 'safari 5', 'ie 9'))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(livereload());
});

gulp.task('js', function () {
    return gulp.src('./js/**/*.js')
        .pipe(gulp.dest('./dist/js'))
        .pipe(livereload());
});
