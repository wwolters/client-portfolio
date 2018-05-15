var gulp = require('gulp');
var html2js = require('gulp-html2js');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var gap = require('gulp-append-prepend');
var _ = require('lodash');
var declare = require('gulp-declare');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var order = require('gulp-order');
var rename = require("gulp-rename");
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
const babel = require('gulp-babel');
const jshint = require('gulp-jshint');
const files_css = ['css/*.css', 'features/**/*.css'];

const files_sass = ['./sass/**/*.scss', 'features/**/*.css'];

const files_vendor = [
    'vendor/jquery.event.gevent-master/jquery.event.gevent.js',
    'vendor/jquery.event.ue-master/jquery.event.ue.js',
    'vendor/taffydb-master/taffy.js',
    'vendor/visionmedia-page/page.js',
    'vendor/handlebars-runtime-3/handlebars.js'
];

const files_js = [
    'js/**/*.js',
    'js/*.js',
    'features/**/*.js'
];

const files_js_order = [
    'js/spa.js',
    'js/spa.util.js',
    'js/spa.util_b.js',
    'js/spa.router.js',
    'js/spa.shell.js',
    'js/spa.template.js',
    'features/**/*.js'
];

gulp.task('html', function () {
   gulp.src(['index.html'])
       .pipe(rename(function (path) {
           path.dirname += "/";
           path.basename = 'index';
           path.extname = ".html";
       }))
       .pipe(gulp.dest('dist/'));
});

gulp.task('images', function () {
    gulp.src(['images/*', 'images/**/*'])
        .pipe(gulp.dest('dist/images'));
});

// gulp.task('fa_fonts', function () {
//     gulp.src(['vendor/font-awesome/font-awesome/fonts/*'])
//         .pipe(gulp.dest('dist/fonts');
// });


gulp.task('templates', function(){
    gulp.src(['features/**/*.hbs'])
    // Compile each Handlebars template source file to a template function
        .pipe(handlebars())
        // Wrap each template function in a call to Handlebars.template
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        // Declare template functions as properties and sub-properties of MyApp.templates
        .pipe(declare({
            namespace: 'spa_templates.templates',
            noRedeclare: true, // Avoid duplicate declarations
            processName: function(filePath) {
                // Allow nesting based on path using gulp-declare's processNameByPath()
                // You can remove this option completely if you aren't using nested folders
                // Drop the client/templates/ folder from the namespace path by removing it from the filePath
                return declare.processNameByPath(filePath.replace('client/templates/', ''));
            }
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('dist/js/'))

});

gulp.task('sass', function () {
    return gulp.src(files_sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('css', function () {
    return gulp.src(files_css)
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('vendor', function(){
    return gulp.src(files_vendor)
        .pipe(order([
            'vendor/**/*.js'
        ], { base: './' }))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('js', function () {
    return gulp.src(files_js)
        .pipe(order(files_js_order, { base: './' }))
        .pipe(concat('app.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function () {
    gulp.watch(['features/**/*.hbs'], ['templates', 'js']);
    gulp.watch(['index.html'], ['html']);
    gulp.watch(['images/*', 'images/**/*'], ['images']);
    gulp.watch(files_css, ['css']);
    gulp.watch(files_sass, ['sass']);
    gulp.watch(['js/*.js', 'features/**/*.js'], ['templates','js']);
});

gulp.task('build_js', function () {
    return gulp.src(files_js)
        .pipe(order(files_js_order, { base: './' }))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('build_css', ['sass'], function () {
    return gulp.src(files_css)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('style.min.css'))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('build', ['html', 'images','templates', 'vendor', 'build_js', 'build_css'], function(){
    console.log('Build done');
});

gulp.task('jshint', function () {
    return gulp.src(['features/**/*.js', 'js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task('default', ['templates']);