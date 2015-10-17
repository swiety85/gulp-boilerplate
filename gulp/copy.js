var gulp = require('gulp'),
// all gulp plugins installed by npm
    gp = require('gulp-load-plugins')({lazy: true}),
// utils methods
    utils = require('./utils');

/**
 * Config params:
 * - src: path to files to copy
 * - dest: path to directory that will store copied directory
 * @param config
 */
module.exports = function (taskName, config, depTasks) {

    gulp.task(taskName, depTasks, function () {
        utils.log('Copying '+taskName);

        return gulp.src(config.src)
            .pipe(gulp.dest(config.dest));
    });
};