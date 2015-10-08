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
    var options = {
            bowerJson: require('./../bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        };

    gulp.task(taskName, depTasks, function () {
        utils.log('Wire up bower JS and CSS (and app JS) to the html');

        var wiredep = require('wiredep').stream,
            indexDir = config.index.split('/').slice(0, -1).join('/');

        return gulp
            .src(config.index)
            .pipe(wiredep(options))
            .pipe(gp.inject(gulp.src(config.src)))
            .pipe(gulp.dest(indexDir));
    });
};