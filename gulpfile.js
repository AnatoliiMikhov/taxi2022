'use strict'

const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const groupMedia = require('gulp-group-css-media-queries')
const cleanCSS = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')

// Static server
function server() {
    browserSync.init({
        server: {
            baseDir: 'src',
        },
        notify: false, // Вимикає повідомлення в браузері
        open: false, // Вимикає автоматичне відкриття браузера
    })
}

// Styles task
function styles() {
    return gulp
        .src('src/sass/**/*.+(scss|sass)')
        .pipe(sourcemaps.init()) // Ініціалізація sourcemaps для кращої розробки
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(groupMedia())
        .pipe(
            autoprefixer({
                cascade: false,
                overrideBrowserslist: ['last 2 versions'], // Оновлений синтаксис
            })
        )
        .pipe(cleanCSS({ compatibility: 'ie8' })) // Підтримка IE8
        .pipe(
            rename({
                prefix: '',
                suffix: '.min',
            })
        )
        .pipe(sourcemaps.write('.')) // Запис sourcemaps
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream())
}

// Watch task
function watchFiles() {
    gulp.watch('src/sass/**/*.+(scss|sass)', styles)
    gulp.watch('src/*.html').on('change', browserSync.reload)
}

// Default task
exports.default = gulp.parallel(styles, server, watchFiles)
