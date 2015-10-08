var gulp = require('gulp'),
// all gulp plugins installed by npm
    gp = require('gulp-load-plugins')({lazy: true}),
// utils methods
    utils = require('./utils');

/**
 * Config params:
 * - src: path to image files that needs to be optimize and moved
 * - dest: path to directory that will save optimized image files
 * - optimizationLevel: (default=4) optimization level (gulp-imagemin)
 * @param config
 */
module.exports = function (taskName, config, depTasks) {

    gulp.task(taskName, depTasks, function () {
        utils.log('Copying and compressing images');

        return gulp.src(config.src)
            .pipe(gp.imagemin({optimizationLevel: config.optimizationLevel || 4}))
            .pipe(gulp.dest(config.dest));
    });
};