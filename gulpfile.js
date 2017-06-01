const gulp = require('gulp'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload;

gulp.task('css-server', function () {
  browserSync({
    server: {
      baseDir: 'public'
    }
  })

  gulp.watch(['css/**/*.css', 'js/**/*.js'], { cwd: 'public'}, reload);
})