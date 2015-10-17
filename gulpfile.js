'use strict';

var gulp = require('gulp'),
    // gulp configuration object
    config = require('./gulp.config')(),
    // custom tasks
    requiredir = require("requiredir"),
    tasks = requiredir("./gulp"),
    // utils methods
    utils = require('./gulp/utils');



// help
gulp.task('help', require('gulp-task-listing'));

// listing available tasks
gulp.task('default', ['help']);

// run unit tests - close after testing is done
tasks.test('test', {
    singleRun: true,
    serverIntegrationSpecs: config.serverIntegrationSpecs,
    nodeServer: config.nodeServer
}, ['lint', 'templatecache']);

// run unit tests - don't close task and listen for changes to rerun task again
tasks.test('autotest', {
    singleRun: false,
    serverIntegrationSpecs: config.serverIntegrationSpecs,
    nodeServer: config.nodeServer
}, ['lint', 'templatecache']);

// build process
gulp.task('build', ['optimize', 'images', 'fonts'], function () {
    utils.log('Building everything');

    var msg = {
        title: 'gulp build',
        subtitle: 'Deployed to build folder',
        message: 'Running ´gulp serve-build´'
    };
    utils.clean(config.temp);
    utils.log(msg);
    utils.notify(msg);
});

// optimizing js, css, html
tasks.optimize('optimize', {
    index: config.index,
    templateCache: config.temp + config.templateCache.file,
    build: config.build
}, ['inject', 'test']);

/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
tasks.bump('bump', {
    src: config.packages
});

// delete old build js files and js in temp dir
tasks.clean('clean-code', {src: [].concat(
    config.temp + '**/*.js',
    config.build + '**/*.html',
    config.build + 'scripts/**/*.js'
)});

// angular template cache
tasks.templatecache('templatecache', {
    src: config.allHtmlTpl,
    fileName: config.templateCache.file,
    options: config.templateCache.options,
    dest: config.temp
}, ['clean-code']);

// delete old fonts in build folder
tasks.clean('clean-fonts', {src: config.build + 'fonts/**/*.*'});

// copy fonts to build dir
tasks.copy('fonts', {
    src: config.allFonts,
    dest: config.build+ 'fonts'
}, ['clean-fonts']);

// delete old images from build dir
tasks.clean('clean-images', {path: config.build + 'images/**/*.*'});

// optimize and move images to build dir
tasks.images('images', {
    src: config.allImages,
    dest: config.build+ 'images'
}, ['clean-images']);

// jshint
tasks.lint('lint', {
    src: config.allJs
});

// LESS to CSS
tasks.styles('styles', {
    src: config.allLess,
    dest: config.temp
});

// bind index.html with dependencies (scripts and styles files)
tasks.wiredep('wiredep', {
    index: config.index,
    src: config.src + '**/*.js'
});

// inject all files (js and css) to index.html
tasks.inject('inject', {
    index: config.index,
    src: config.temp + '**/*.css'
}, ['wiredep', 'styles', 'templatecache']);

// run server and watch for server changes - use source files (dev-mode)
tasks.nodemon('serve-dev', {
    server: config.nodeServer,
    restartTasks: ['lint']
}, ['inject', 'less-watcher']);

// run server and watch for server changes - use distribution files from build folder (prod-mode)
tasks.nodemon('serve-build', {
    server: config.nodeServer,
    restartTasks: ['lint'],
    isDev: false
}, ['build']);





/////////////////////////////////////////////// watchers

// LESS watcher
gulp.task('less-watcher', function () {
    gulp.watch(config.allLess, ['styles']);
});