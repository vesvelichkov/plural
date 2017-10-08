'use strict'

let gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    cssnano     = require('gulp-cssnano'),
    fileinclude = require('gulp-file-include'),
    uglify      = require('gulp-uglify'),
    watch       = require('gulp-watch'),
    rename      = require('gulp-rename'),
    stripDebug  = require('gulp-strip-debug'),
    prefix      = require('gulp-autoprefixer'),
    imagemin    = require('gulp-imagemin');


// A list of JS files to compile,
// add any new JS file here.
let sourceFilesJs = [
    // 'node_modules/angular/angular.min.js',
    'resources/js/**/*'
];

let destDirJs  = 'build/js',
    destFileJs = 'app.js';

let destDirCss = 'build/css',
    destFileCss = 'app.css';

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}

// Compile Sass
gulp.task('sass', function () {
    return gulp.src('resources/sass/master.scss')
        .pipe(sass({
            includePaths: ['node_modules'],
            outputStyle: 'compact'
        }))
        .on('error', swallowError)
        // .pipe(prefix({
        //     browsers: ['> 1%', 'ie > 8', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'Android 4.4', 'Firefox ESR'],
        //     cascade: true
        // }))
        //.pipe(cssnano())
        .pipe(rename(destFileCss))
        .pipe(gulp.dest(destDirCss));
});

// Compile JS
gulp.task('js', function () {
    return gulp.src(sourceFilesJs)
        // .pipe(concat('app.js'))
        // .pipe(uglify())
        // .pipe(stripDebug())
        .on('error', swallowError)
        // .pipe(rename(destFileJs))
        .pipe(gulp.dest(destDirJs));
});


// Copy angular js files to 'js' root
gulp.task('js-components', function () {
    return gulp.src('resources/js/components/**/*.html')
        .on('error', swallowError)
        .pipe(gulp.dest(destDirJs+'/components'));
});

// Copy angular js files to 'js' root
gulp.task('angularjs', function () {
    return gulp.src('node_modules/angular/angular.min.js')
        .on('error', swallowError)
        .pipe(gulp.dest(destDirJs));
});

// Copy data files to 'data' root
gulp.task('data', function () {
    return gulp.src('resources/data/*')
        .on('error', swallowError)
        .pipe(gulp.dest('build/data'));
});

// Copy html files to 'build' dir
gulp.task('html', function() {
    return gulp.src('resources/html/index.html')
        .pipe(fileinclude({
          prefix: '@@',
          indent: true,
          basepath: '@file'
        }))
        .on('error', swallowError)
        .pipe(gulp.dest('build'));
});

// Watch Sass and JS files and compile them in dev mode.
gulp.task('watch', ['html', 'sass', 'js', 'js-components'], function() {
    gulp.watch('resources/html/**/*.html', ['html']);
    gulp.watch('resources/sass/**/*.scss', ['sass']);
    gulp.watch('resources/js/components/**/*.html', ['js-components']);
    gulp.watch('resources/js/**/*', ['js']);
});

// Compile Sass, JS and images, then start watching.
gulp.task('default', [
    'sass',
    'js',
    'js-components',
    'angularjs',
    'data',
    'html',
    'watch'
]);
