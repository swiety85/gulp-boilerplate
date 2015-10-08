var gulp = require('gulp'),
// all gulp plugins installed by npm
    gp = require('gulp-load-plugins')({lazy: true}),
// utils methods
    utils = require('./utils');

/**
 * Config params:
 * - src: path to template files that needs to be concatenated to single file
 * - dest: path to directory that will save file with templates
 * - fileName: template cache file name
 * - options: options of template cache gulp module - gulp-angular-templatecache
 * @param config
 */
module.exports = function (taskName, config, depTasks) {

    gulp.task(taskName, depTasks, function () {
        utils.log('Creating AngularJS $templateCache');

        return gulp.src(config.src)
            .pipe(gp.minifyHtml({empty: true}))
            .pipe(gp.angularTemplatecache(
                config.fileName,
                config.options
            ))
            .pipe(gulp.dest(config.dest));
    });
};