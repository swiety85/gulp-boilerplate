var gulp = require('gulp'),
    // all gulp plugins installed by npm
    gp = require('gulp-load-plugins')({lazy: true}),
    // utils methods
    utils = require('./utils'),
    // clean task
    clean = require('./clean');

/**
 * Config params:
 * - src: path to LESS files that needs to be compiled to CSS
 * - dest: path to directory that will save compiled CSS
 * @param config
 */
module.exports = function (taskName, config, depTasks) {
    clean('clean-styles', {
        path: config.dest
    }, depTasks);

    gulp.task(taskName, ['clean-styles'], function () {
        utils.log('Compiling: LESS --> CSS');

        utils.log(config.dest);
        return gulp
            .src(config.src)
            .pipe(gp.debug())
            .pipe(gp.plumber())
            .pipe(gp.less())
            .pipe(gp.autoprefixer({browsers: ['last 2 versions', '> 5%']}))
            .pipe(gulp.dest(config.dest));
    });
};