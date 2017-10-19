//http://rcdevlabs.github.io/2015/02/17/googlemaps-api-1-3-criando-um-mapa-simples/
var gulp = require('gulp')
, connect = require('gulp-connect-multi')();
var cors1 = require('cors');

var cors = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
};

  
gulp.task('arquivos', function(){
 gulp.src(['./src/**/**/*.*'])
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload())
  })
  
gulp.task('servidor', connect.server({
 	root: ['build'],
 	port: 1337,
 	livereload: true,
 	open: {
    browser: 'chrome' //ou firefox ou safari... se for OSX é 'Google Chrome'
  },
  middleware: function() {
    return [cors];
  }
}))

gulp.task('watch', function(){
    gulp.watch(['src/**/**'], ['arquivos']);
})


gulp.task('default', ['arquivos', 'servidor', 'watch']);
