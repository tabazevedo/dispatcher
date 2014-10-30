gulp = require 'gulp'
livescript = require 'gulp-livescript'
mocha = require 'gulp-mocha'
util = require 'gulp-util'

gulp.task 'default', ->
  gulp.src 'src/index.ls'
    .pipe livescript!
    .on 'error' util.log
    .pipe gulp.dest 'lib/'

gulp.task 'test', ['default'], ->
  gulp.src 'test/**/*.ls', read: false
    .pipe mocha reporter: 'dot' ui: 'tdd'