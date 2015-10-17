"use strict";

var gulp        = require("gulp");
var concat      = require("gulp-concat");
var uglify      = require("gulp-uglify");
var sass        = require("gulp-sass");
var plumber     = require("gulp-plumber");
var rename      = require("gulp-rename");
var sourcemaps  = require("gulp-sourcemaps");
var minifycss   = require("gulp-minify-css");

//added for dev (it takes a lot of time to gulp it)
gulp.task("libs", function() {
    var libPath     = "static/scripts/libs/";
    return gulp.src([libPath+"jquery-1.11.2.js"])
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err.message);
                this.emit("end");
            }
        }))
        .pipe(concat("production.lib.js"))
        .pipe(gulp.dest("public/scripts/build/"))
        .pipe(rename({suffix: ".min"}))
        .pipe(uglify())
        .pipe(gulp.dest("public/scripts/build/"))
})

gulp.task("scripts", function() {
    var buildPath   = "public/scripts/build/";
    var path        = "static/scripts/";
    return gulp.src([
        path+"head.js", path+"App.js", path+"Calculus.js", path+"Function.js", path+"Unit.js", path+"tail.js"])
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err.message);
                this.emit("end");
            }
        }))
        .pipe(concat("production.js"))
        .pipe(gulp.dest(buildPath))
        .pipe(rename({suffix: ".min"}))
        .pipe(uglify())
        .pipe(gulp.dest(buildPath))
})

gulp.task("styles", function() {

    gulp.src("static/styles/main.sass")
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err.message);
                this.emit("end");
            }
        }))
        .pipe(sass())
        .pipe(rename({
            suffix: ".min",
            basename: "production"
        }))
        .pipe(minifycss({debug: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("public/styles/build"));

})

gulp.task("default", ["styles", "scripts"], function() {
})
