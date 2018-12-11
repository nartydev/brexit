const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src('assets/sass/*.scss')
        .pipe(sass({
          outputStyle: 'compressed'
        }))
        .pipe(autoprefixer())
        .pipe(minify())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest("assets/css"))
});

gulp.task('js', function() {
    return gulp.src(source + '/assets/js/*.js')
        .pipe(uglify())
        .pipe(concat('global.min.js'))
        .pipe(gulp.dest('assets/js'));
});


// Watch Sass & Serve
gulp.task('watch', function() {
  gulp.watch('assets/sass/*.scss', gulp.series('sass', 'js'));
});

// Default Task
gulp.task('default', gulp.series('watch'));
