var gulp = require('gulp'),
    // all gulp plugins installed by npm
    gp = require('gulp-load-plugins')({lazy: true}),
    // utils methods
    utils = require('./utils');

/**
 * Config params:
 * - index: path to index.html
 * - src: path to client source files
 * @param config
 */
module.exports = function (taskName, config, depTasks) {
    var indexDir = config.index.split('/').slice(0, -1).join('/');

    gulp.task(taskName, depTasks, function () {
        utils.log('Wire up app files to the html');
        return gulp
            .src(config.index)
            .pipe(gp.inject(gulp.src(config.src)))
            .pipe(gulp.dest(indexDir));
    });
};