import gulp from 'gulp';
import iife from 'gulp-iife';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import runSequence from 'run-sequence';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import del from 'del';
import tests from './test';
import {
  componentName,
  tempDirectory,
  sourceDirectory,
  libDirectory,
  testDirectory,
  scriptSourceFiles,
  styleSourceFiles,
  lintFiles,
  scriptsToConcat,
} from './gulp-config';

gulp.task('clean', function(done) {
  return del(tempDirectory);
});

gulp.task('move', function(done) {
  done();
});

gulp.task('build-src-scripts', function() {
  return gulp.src(scriptSourceFiles)
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./'));
});


gulp.task('process-scripts', function(done) {
  runSequence('lint', 'test', 'build-src-scripts', done);
});

gulp.task('build', function(done) {
  runSequence('process-scripts', done);
});

gulp.task('watch', function () {

  // watch JavaScript files
  gulp.watch(scriptSourceFiles, ['process-scripts']);

  // watch test files and re-run unit tests when changed
  gulp.watch('test/**/*.js', ['test']);

});

gulp.task('lint', function () {
  return gulp.src(lintFiles)
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
