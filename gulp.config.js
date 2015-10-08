module.exports = function () {

    var wiredep = require('wiredep'),
        root = './',
        testsPath = './tests/',
        clientPath = './src/client/',
        serverPath = './src/server/',
        reportPath = './report/',
        bowerFiles = wiredep({devDependencies: true})['js'],
        allClientJs = clientPath+'**/*.js',
        allServerJs = serverPath+'**/*.js',
        config = {
            root: root,
            build: './build/',
            browserReloadDelay: 5000,

            src: clientPath,

            temp: './_tmp/',
            reportPath: reportPath,

            index: clientPath+'index.html',
            // all js files to compile
            allJs: [
                allClientJs, allServerJs
            ],
            allClientJs: allClientJs,
            allServerJs: allServerJs,
            // all less files to compile
            allLess: clientPath + 'styles/**/*.less',
            allFonts: './bower_components/font-awesome/fonts/**/*.*',
            allImages: clientPath + 'images/**/*.*',
            allHtmlTpl: clientPath + 'scripts/**/*.tpl.html',

            // packages
            packages: [
                './package.json',
                './bower.json'
            ],

            // template cache
            templateCache: {
                file: 'templates.js',
                options: {
                    module: 'app',
                    standAlone: false,
                    root: 'scripts/'
                }
            },

            // Karma and testing settings
            specHelpers: [testsPath + 'client/testHelpers/*.js'],
            serverIntegrationSpecs: [root + '/client/tests/server-integration/**/*.spec.js'],

            // bower config
            bower: {
                json: require('./bower.json'),
                directory: './bower_components/',
                ignorePath: '../..'
            },
            defaultPort: 3000,
            nodeServer: './src/server/app.js',
            server: serverPath + 'app.js'
        };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    };

    config.karma = getKarmaOptions();

    return config;

    ////////////////

    function getKarmaOptions() {
        var options = {
            files: [].concat(
                bowerFiles,
                config.specHelpers,
                clientPath + '**/*.module.js',
                clientPath + '**/*.js',
                testsPath + 'client/scripts/**/*.js',
                config.temp + config.templateCache.file,
                config.serverIntegrationSpecs
            ),
            exclude: [],
            coverage: {
                dir: reportPath + 'coverage',
                reporters: [
                    {type: 'html', subdir: 'report-html'},
                    {type: 'lcov', subdir: 'report-lcov'},
                    {type: 'text-summary'}
                ]
            },
            preprocessors: {}
        };
        options.preprocessors[clientPath + 'scripts/**/*.js'] = ['coverage'];
        return options;
    }
};