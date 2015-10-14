var gulp = require('gulp'),
    // all gulp plugins installed by npm
    gp = require('gulp-load-plugins')({lazy: true}),
    // utils methods
    utils = require('./utils'),
    // task arguments
    args = require('yargs').argv;

/**
 * Config params:
 * - src: path to files that needs to be validated by jshint
 * @param config
 */
module.exports = function (taskName, config, depTasks) {

    gulp.task(taskName, depTasks, function () {
        utils.log('Linting: '+config.src);

        return gulp
            .src(config.src)
            .pipe(gp.if(args.verbose, gp.print()))
            .pipe(gp.jshint())
            .pipe(gp.jshint.reporter('jshint-stylish', {verbose: true}))
            .pipe(gp.jshint.reporter('fail'));
    });
};