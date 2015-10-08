var gulp = require('gulp'),
// all gulp plugins installed by npm
    gp = require('gulp-load-plugins')({lazy: true}),
// utils methods
    utils = require('./utils'),
// task arguments
    args = require('yargs').argv;
/**
 * Config params:
 * - src: path to files that needs to be deleted
 * @param config
 */
module.exports = function (taskName, config, depTasks) {

    /**
     * Bump the version
     * --type=pre will bump the prerelease version *.*.*-x
     * --type=patch or no flag will bump the patch version *.*.x
     * --type=minor will bump the minor version *.x.*
     * --type=major will bump the major version x.*.*
     * --version=1.2.3 will bump to a specific version and ignore other flags
     */
    gulp.task(taskName, depTasks, function () {
        var options = {},
            msg = 'Bumping version',
            type = args.type,
            version = args.version;

        if(version) {
            options.version = version;
            msg += ' to ' + version;
        }
        else {
            options.type = type;
            msg += ' for a ' + type;
        }
        utils.log(msg);

        return gulp.src(config.src)
            .pipe(gp.bump(options))
            .pipe(gp.print())
            .pipe(gulp.dest('./'));
    });
};