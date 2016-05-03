(function() {
  var gulp = require("gulp"),
      sass = require("gulp-sass"),
      autoprefixer = require("gulp-autoprefixer"),
      browserSync = require("browser-sync").create();

  gulp.task("default", function() {
    gulp.watch("./application/scss/**/*.scss", ["styles"]);
  });

  gulp.task("styles", function() {
    gulp.src('./application/scss/**/*.scss')
      .pipe(sass().on("error", sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./application/css'));
  });

  gulp.task("browser", function() {
    browserSync.init({
      server: {
        baseDir: "./application"
      }
    });

    browserSync.stream();
  });

})();
