'use strict'

const gulp = require( 'gulp' )
const browserSync = require( 'browser-sync' )
const sass = require( 'gulp-sass' )( require( 'sass' ) )
const rename = require( 'gulp-rename' )
const autoprefixer = require( 'gulp-autoprefixer' )
const groupMedia = require( 'gulp-group-css-media-queries' )
const cleanCSS = require( 'gulp-clean-css' )

// Static server
gulp.task( 'server', () => {
    browserSync.init( {
        server: {
            baseDir: 'src',
        },
    } )
} )

gulp.task( 'styles', () => {
    return gulp
        .src( 'src/sass/**/*.+(scss|sass)' )
        .pipe( sass( { outputStyle: 'compressed' } ).on( 'error', sass.logError ) )
        .pipe( groupMedia() )
        .pipe( rename( {
            prefix: '',
            suffix: '.min',
        } ) )
        .pipe( autoprefixer( {
            cascade: false,
        } ) )
        .pipe( cleanCSS() )
        .pipe( gulp.dest( 'src/css' ) )
        .pipe( browserSync.stream() )
} )

gulp.task( 'watch', () => {
    gulp.watch( 'src/sass/**/*.+(scss|sass)', gulp.parallel( 'styles' ) )
    gulp.watch( 'src/*.html' ).on( 'change', browserSync.reload )
} )

gulp.task( 'default', gulp.parallel( 'styles', 'server', 'watch' ) )
