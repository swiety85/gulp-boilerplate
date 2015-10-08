var gulp = require('gulp'),
// all gulp plugins installed by npm
    gp = require('gulp-load-plugins')({lazy: true}),
// utils methods
    utils = require('./utils'),
// task arguments
    args = require('yargs').argv;
/**
 * Config params:
 * - index: path to index.html
 * - templateCache: path to file with cached angular templates
 * - build: path to build dir
 * @param config
 */
module.exports = function (taskName, config, depTasks) {

    // NODE_ENV=build node src/server/app.js
    gulp.task(taskName, depTasks, function () {
        utils.log('Optimizing js, css, html');

        var assets = gp.useref.assets({searchPath: './'}),
            cssFilter = gp.filter('**/*.css', {restore: true}),
            jsFilter = gp.filter('**/*.js', {restore: true});

        return gulp.src(config.index)
            .pipe(gp.plumber())
            .pipe(gp.inject(gulp.src(config.templateCache, {read: false}), {
                starttag: '<!-- inject:templates:js -->'
            }))
            .pipe(assets)
            .pipe(cssFilter)
            .pipe(gp.csso())
            .pipe(cssFilter.restore)
            .pipe(jsFilter)
            .pipe(gp.uglify())
            .pipe(jsFilter.restore)
            .pipe(gp.rev())// app.js --> app-1fve34j.js
            .pipe(assets.restore())
            .pipe(gp.useref())
            .pipe(gp.revReplace())
            //.pipe(gp.rev.manifest()) // does not work..
            .pipe(gulp.dest(config.build));
    });
};