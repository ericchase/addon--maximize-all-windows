const gulp = require( 'gulp' )
const fs = require( 'fs' )
const zip = require( 'gulp-zip' )

gulp.task( 'default', () => {
  let name = 'maximize-all-windows-on-startup-(minimal)'
  let version = JSON.parse( fs.readFileSync( '../code/manifest.json' ) ).version
  
  return gulp.src( '../code/**/*' )
    .pipe( zip( `${name}-v${version}.zip` ) )
    .pipe( gulp.dest( '../releases/' ) )
} )
