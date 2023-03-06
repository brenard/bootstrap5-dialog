// Gulpfile.js

"use strict";

const gulp = require("gulp");
const eslint = require("gulp-eslint");
const clean = require("gulp-clean");
const minify = require("gulp-minify");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");

gulp.task("lint", function() {
    return gulp.src(["src/js/bootstrap-dialog.js"])
      .pipe(eslint())
      .pipe(eslint.format());
});

gulp.task("clean", function() {
    return gulp.src(["dist/*"]).pipe(clean({ allowEmpty: true }));
});

gulp.task("dist-js", function() {
    return gulp
      .src(["src/js/bootstrap-dialog.js"])
      .pipe(gulp.dest("dist/js"))
      .pipe(minify({ noSource: true, ext: ".min.js" }))
      .pipe(gulp.dest("dist/js"));
});

gulp.task("dist-css", function() {
    return gulp
      .src(["src/css/bootstrap-dialog.css"])
      .pipe(gulp.dest("dist/css"))
      .pipe(rename("bootstrap-dialog.min.css"))
      .pipe(minifyCSS())
      .pipe(gulp.dest("dist/css"));
});

gulp.task("dist", gulp.series("dist-js", "dist-css"));

gulp.task("default", gulp.series("clean", "dist"));
