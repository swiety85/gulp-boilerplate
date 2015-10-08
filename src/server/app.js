'use strict';

var connect = require('connect'),
    path = require('path'),
    logger = require('morgan'),
    serveStatic = require('serve-static'),

    rootDir = path.join(__dirname, '..', '..'),
    clientDir = path.join(rootDir, 'src', 'client'),
    buildDir = path.join(rootDir, 'build'),

    port = process.env.PORT,
    environment = process.env.NODE_ENV;

if(!port || port === 'undefined') {
    port = 3000;
}


if(environment === 'build') {
    console.log('*** BUILD ***');
    connect()
        //.use(logger())
        .use(serveStatic(buildDir))
        .use('/*', serveStatic(path.join(buildDir, 'index.html')))
        .listen(port);
}
else {
    console.log('*** DEV ***');
    connect()
        //.use(logger())
        .use(serveStatic(rootDir))
        .use(serveStatic(clientDir))
        .use('/*', serveStatic(path.join(clientDir, 'index.html')))
        .listen(port);
}

console.log('Listening on port: ' + port);

