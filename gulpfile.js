const gulp = require('gulp');
const sass = require('gulp-sass');

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src('assets/sass/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest("assets/css"))
});


// Watch Sass & Serve
gulp.task('watch', function() {
  gulp.watch('assets/sass/*.scss', gulp.series('sass'));
});

// Default Task
gulp.task('default', gulp.series('watch'));
