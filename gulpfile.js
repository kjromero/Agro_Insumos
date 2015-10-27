var autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync'),
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  reload = browserSync.reload

var path = {
    dist: 'www/dist/',
    sass: 'content/sass/',
    allsass: 'content/sass/**/*.sass',
    excpartialsass: '!content/sass/**/_*.sass',
    components: 'content/components/'
  }

  gulp.task('sass', function () {
    return gulp.src([ path.allsass, path.excpartialsass ] )
      .pipe(sass({
        indentedSyntax: true
      }))
      .on('error', swallowError)
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
      .pipe(gulp.dest( path.dist + 'css' ))
      .pipe(reload({ stream:true }))
  })
  gulp.task('html', function () {
    return gulp.src('www/**/*.html')
      .pipe(reload({ stream:true }))
  })

  gulp.task('watch', ['production'], function() {
    gulp.watch( path.allsass, ['sass'])
    gulp.watch(['content/fonts/**/*'], ['assets:fonts'])
    gulp.watch(['content/img/**/*'], ['assets:img'])
    gulp.watch('www/**/*.html', ['html'])
  })

  gulp.task('server', function() {
    browserSync({
      notify: false,
      server: {
         baseDir: "./www/"
      }
    })
  })

  gulp.task('assets:fonts', function () {
    return gulp.src('content/fonts/**/*')
            .pipe(gulp.dest('www/dist/fonts'))
  })

  gulp.task('assets:img', function () {
    return gulp.src('content/img/**/*')
            .pipe(gulp.dest('www/dist/img'))
  })

  gulp.task('default', ['server', 'watch'])
  gulp.task('production', ['sass', 'assets:fonts', 'assets:img'])


  /**
   * Swallow errors preventing the watch to stop
   * @param  {Error} error
   */
  function swallowError (error) {
    //If you want details of the error in the console
    console.log( error.toString() )
    this.emit('end')
  }