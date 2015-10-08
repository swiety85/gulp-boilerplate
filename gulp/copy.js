var gulp = require('gulp'),
// all gulp plugins installed by npm
    gp = require('gulp-load-plugins')({lazy: true}),
// utils methods
    utils = require('./utils');

/**
 * Config params:
 * - src: path to all font files
 * - dest: path to directory that will save file with templates
 * @param config
 */
module.exports = function (taskName, config, depTasks) {

    gulp.task(taskName, depTasks, function () {
        utils.log('Copying '+taskName);

        return gulp.src(config.src)
            .pipe(gulp.dest(config.dest));
    });
};