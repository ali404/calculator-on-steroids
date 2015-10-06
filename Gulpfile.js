//"use strict";

var gulp        = require("gulp");
var concat      = require("gulp-concat");
var uglify      = require("gulp-uglify");
var sass        = require("gulp-sass");
var plumber     = require("gulp-plumber");
var rename      = require("gulp-rename");
var sourcemaps  = require("gulp-sourcemaps");
var minifycss   = require("gulp-minify-css");

gulp.task("scripts", function() {
    var path        = "public/javascript/";
    var buildPath   = path + "build/";
    var libPath     = path + "libs/";
    return gulp.src([
        libPath+"jquery-1.11.2.js", libPath+"material.js",
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

    gulp.src("./sass/main.sass")
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err.message);
                this.emit("end");
            }
        }))
        .pipe(sass())
        .pipe(rename({
            suffix: ".min",
            basename: "production.css"
        }))
        .pipe(minifycss({debug: true}))
        .pipe(gulp.dest("./public/build/css"));

});

gulp.task("default", ["styles", "scripts"], function() {
    //nothing
    console.log("nothing");
})
