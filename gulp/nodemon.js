var gulp = require('gulp'),
    config = require('./../gulp.config')(),
    browserSync = require('browser-sync'),
    args = require('yargs').argv,
    // all gulp plugins installed by npm
    gp = require('gulp-load-plugins')({lazy: true}),
    // utils methods
    utils = require('./utils'),
    port = process.env.PORT || config.defaultPort;

/**
 * Config params:
 * - server: path to main node server file
 * - restartTasks: List of tasks to be executed on every server restart
 * - port: (optional) port under which server is running
 * - idDev: (default=true)
 * @param config
 */
module.exports = function (taskName, config, depTasks) {
    var port = process.env.PORT || config.port;

    if(config.isDev === undefined) {
        config.isDev = true;
    }

    gulp.task(taskName, depTasks, function () {
        var serverDir = config.server.split('/').slice(0, -1).join('/');
            nodeOptions = {
                script: config.server,
                delayTime: 1,
                env: {
                    'PORT': port,
                    'NODE_ENV': config.isDev ? 'dev' : 'build'
                },
                watch: [serverDir]
            };

        return gp.nodemon(nodeOptions)
            .on('restart', config.restartTasks || [], function (env) {
                utils.log('*** nodemon restarted');
                utils.log('files changed on restart:\n'+env);

                setTimeout(function () {
                    browserSync.notify('reloading now...');
                    browserSync.reload({stream: false});
                }, config.browserReloadDelay);
            })
            .on('start', function () {
                utils.log('*** nodemon started');
                startBrowserSync(config.isDev);
            })
            .on('crash', function () {
                utils.log('*** nodemon crashed');
            })
            .on('exit', function () {
                utils.log('*** nodemon exited cleanly');
            });

    });
};

/**
 * Initialize BrowserSync plugin
 */
function startBrowserSync(isDev) {

    if(!isDev) {
        gulp.watch(
            [config.allLess, config.allClientJs, config.allHtmlTpl, config.index],
            ['optimize', browserSync.reload]);
    }

    if(args.nosync || browserSync.active) {
        return;
    }

    console.log('==============================', port);
    var options = {
        proxy: 'localhost:' + port,
        port: 3001,
        files: isDev ? [
            config.src + '**/*.js',
            config.src + 'index.html',
            config.src + 'scripts/**/*.tpl.html',
            config.temp
        ] : [],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-browser-sync',
        notify: true,
        reloadDelay: 1000
    };

    utils.log('Starting browser-sync on port:' + port);

    browserSync(options);
}