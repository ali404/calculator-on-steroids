"use strict";

var gulp        = require("gulp")

var concat      = require("gulp-concat")
var uglify      = require("gulp-uglify")
var sass        = require("gulp-sass")
var rename      = require("gulp-rename")
var sourcemaps  = require("gulp-sourcemaps")
var minifycss   = require("gulp-minify-css")

var nodemon     = require("gulp-nodemon")

var reactify    = require("reactify")
var browserify  = require("browserify")
var babelify    = require("babelify")
var source      = require("vinyl-source-stream")

gulp.task("react", function() {
    return browserify("static/scripts/app.js")
        .transform(babelify)
        // .transform("reactify", {stripTypes: true, es6: true})
        .bundle()
        .pipe(source("production.js"))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gulp.dest("public/scripts/build"))
})

gulp.task("styles", function() {

    gulp.src("static/styles/main.sass")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(rename({
            suffix: ".min",
            basename: "production"
        }))
        .pipe(minifycss({debug: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("public/styles/build"))
})

gulp.task("default", ["react", "styles"], function() {})

gulp.watch("static/styles/**/*.sass", ["styles"])
gulp.watch("static/scripts/**/*.js", ["react"])
