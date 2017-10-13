//http://rcdevlabs.github.io/2015/02/17/googlemaps-api-1-3-criando-um-mapa-simples/
var gulp = require('gulp')
, connect = require('gulp-connect-multi')();
  
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
  }
}))

gulp.task('watch', function(){
    gulp.watch(['src/**/**'], ['arquivos']);
})


gulp.task('arquivos_prd', function(){
  gulp.src(['./src/**/**/*.*'])
     .pipe(gulp.dest('./build'))
   })
gulp.task('servidor_prd', connect.server({
  root: ['build'],
  port: 1337,
  open: {
      browser: 'none'
  }

}))

gulp.task('default', ['arquivos', 'servidor', 'watch']);
gulp.task('runprd', ['arquivos_prd']);
