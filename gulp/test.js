'use strict';

var gulp = require('gulp'),
    // utils methods
    utils = require('./utils'),
    // task arguments
    args = require('yargs').argv;

/**
 * Config params:
 * - singleRun
 * - nodeServer
 * - serverIntegrationSpecs
 * @param config
 */
module.exports = function (taskName, config, depTasks) {

    gulp.task(taskName, depTasks, function (done) {
        var child,
            fork = require('child_process').fork,
            KarmaServer = require('karma').Server,
            excludeFiles = [],
            serverSpecs = config.serverIntegrationSpecs;

        if (args.startServers) { // gulp test --startServers
            utils.log('Starting server');
            var savedEnv = process.env;
            savedEnv.NODE_ENV = 'dev';
            savedEnv.PORT = 8888;
            child = fork(config.nodeServer);
        } else {
            if (serverSpecs && serverSpecs.length) {
                excludeFiles = serverSpecs;
            }
        }

        new KarmaServer({
            configFile: __dirname + '/../karma.conf.js',
            excludeFiles: excludeFiles,
            singleRun: !!config.singleRun
        }, function (result) {

            utils.log('Karma completed!');
            if (child) {
                utils.log('Shutting down the child process');
                child.kill();
            }
            if(result === 1) {
                done('karma: tests fails with code ' + result);
            }
            else {
                done();
            }
        }).start();
    });
};