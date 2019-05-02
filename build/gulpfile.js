const gulp = require( 'gulp' )
const fs = require( 'fs' )
const zip = require( 'gulp-zip' )

gulp.task( 'default', () => {
  let version = JSON.parse( fs.readFileSync( '../code/manifest.json' ) ).version
  
  return gulp.src( '../code/**/*' )
    .pipe( zip( `reload-all-tabs-in-window-v${version}.zip` ) )
    .pipe( gulp.dest( '../releases/' ) )
} )
