const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const babelPreset = require('babel-preset-env');
const webserver = require('gulp-webserver');


const sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed'
};

gulp.task('sass', () => {
    return gulp.src('./assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('babel', () => {
    return gulp.src('./assets/js/**/*.js')
        .pipe(babel({
            'presets': [
                ['env', {
                    'targets': {
                        'browsers': ['last 15 versions', 'safari >= 7']
                    }
                }]
            ]
        }))
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('serve', () => {
    return gulp.src("./")
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            open: true, 
        }))
});

gulp.task('watch', ['sass', 'babel'], () => {
    gulp.watch('./assets/scss/**/*.scss', ['sass']);
    gulp.watch('./assets/js/**/*.js', ['babel']);
})

gulp.task('default', ['watch']);