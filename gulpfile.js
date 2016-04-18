// /////////////////////////////////////////////////
// Required
// /////////////////////////////////////////////////

var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    plumber = require("gulp-plumber"),
    browserSync = require("browser-sync"),
    imageOptim = require('gulp-imageoptim'),
    reload = browserSync.reload;

// /////////////////////////////////////////////////
// Scripts Task
// /////////////////////////////////////////////////

gulp.task("scripts",function(){
    gulp.src(["atyabtabkha/public/js/**/*.js", '!atyabtabkha/public/js/**/*.min.js'])
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('atyabtabkha/public/js'))
    .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// Styles Task
// /////////////////////////////////////////////////

gulp.task("styles",function(){
    gulp.src("atyabtabkha/public/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass({
      style:"compressed"
    }))
    .pipe(gulp.dest("atyabtabkha/public/assets/css/"))
    .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// HTML Task
// /////////////////////////////////////////////////

gulp.task("html", function(){
    gulp.src("atyabtabkha/public/**/*.html")
    .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// Browser-Sync Task
// /////////////////////////////////////////////////
gulp.task('browser-sync', function(){
  browserSync({
    server:{
      baseDir:"./atyabtabkha/public/",
      // directory: true
    }
  });
});

// /////////////////////////////////////////////////
// Watch Task
// /////////////////////////////////////////////////

gulp.task("watch",function(){
  gulp.watch("atyabtabkha/public/js/**/*.js",['scripts']);
  gulp.watch("atyabtabkha/public/scss/**/*.scss",['styles']);
  gulp.watch("atyabtabkha/public/**/*.html",['html']);
});

// ////////////////////////////////////////
// Images Task
// /////////////////////////////////////////
gulp.task('images', function() {
    return gulp.src('atyabtabkha/assets/src/img/**/*')
        .pipe(imageOptim.optimize())
        .pipe(gulp.dest('atyabtabkha/assets/img'));
});

// /////////////////////////////////////////////////
// Default Task
// /////////////////////////////////////////////////
gulp.task("default",['styles','scripts', 'html', 'browser-sync', 'watch']);
