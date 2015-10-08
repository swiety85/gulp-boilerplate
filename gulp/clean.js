var gulp = require('gulp'),
    // utils methods
    utils = require('./utils');

/**
 * Config params:
 * - src: path to files that needs to be deleted
 * @param config
 */
module.exports = function (taskName, config, depTasks) {

    gulp.task(taskName, depTasks, function (done) {
        return utils.clean(config.src, done);
    });
};