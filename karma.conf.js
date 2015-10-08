module.exports = function (config) {
    var gulpConfig = require('./gulp.config')();

    config.set({
        //  Base path, that will be used to resolve all relative paths defined in files and exclude.
        // If basePath is a relative path, it will be resolved to the __dirname of the configuration file.
        basePath: './',
        // frameworks to use
        // some available: https://www.npmjs.com/browse/keyword/karma-adapter
        frameworks: ['jasmine'],
        // List of files/patterns to load in the browser.
        files: gulpConfig.karma.files,
        // list of files to exclude
        exclude: gulpConfig.karma.exclude,

        //proxies: {
        //    '/': 'http://localhost:8888/'
        //},

        // A map of preprocessors to use. See config/preprocessors for more.
        preprocessors: gulpConfig.karma.preprocessors,

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            dir: gulpConfig.karma.coverage.dir,
            reporters: gulpConfig.karma.coverage.reporters
        },
        // web server port
        port: 9876,

        // Enable or disable watching files and executing the tests whenever one of these files changes.
        autoWatch: true,

        browsers: ['PhantomJS'],

        // Enable or disable colors in the output (reporters and logs).
        colors: true,
        // Hostname to be used when capturing browsers.
        hostname: 'localhost',
        // Level of logging.
        //logLevel: config.LOG_INFO,

        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher'
        ]

    });
};