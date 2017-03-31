'use strict';

const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
 uglifyCSS = require('gulp-uglifycss'),
       del = require('del');

gulp.task("concatCSS", () => {
   return gulp.src([
       'css/normalize.css',
       'css/foundation.css',
       'css/avatar.css',
       'css/basics.css',
       'css/menu.css',
       'css/hero.css',
       'css/modals.css',
       'css/photo-grid.css',
       'css/footer.css'])
    .pipe(concat('main.css'))
    .pipe(gulp.dest('css'));
});

gulp.task("concatScripts", () => {
    return gulp.src([
        'js/jquery.js',
        'js/fastclick.js',
        'js/foundation.js',
        'js/foundation.equalizer.js',
        'js/foundation.reveal.js',
        'js/scripts.js'])
    .pipe(concat("app.js"))
    .pipe(gulp.dest("js"));
});

gulp.task("minifyCSS", ["concatCSS"], () => {
    return gulp.src("css/main.css")
        .pipe(uglifyCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('css'));
});

gulp.task("minifyScripts", ["concatScripts"], () => {
    return gulp.src("js/app.js")
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('watchFiles', () => {
    gulp.watch('css/**/*.css', ['concatCSS']);
    gulp.watch('js/scripts.js', ['concatScripts']);
});

gulp.task('clean', () => {
    del(['dist', 'css/main*.css', 'js/app*.js']);
});

gulp.task("build", ['minifyCSS', 'minifyScripts'], () => {
    return gulp.src(["css/main*.css", "js/app*.js", "index.html", "img/**"], { base: "./" })
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', ["watchFiles"]);

gulp.task("default", ['clean'], () => gulp.start('build'));