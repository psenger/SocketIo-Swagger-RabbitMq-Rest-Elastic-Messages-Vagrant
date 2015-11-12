/* jshint strict: true */
/* global console, require, module, process */
"use strict";

var express = require ( 'express' ),
    bodyParser = require ( 'body-parser' ),
    routes = require ( './routes' ),
    latency = require ( 'response-time' ),
    http = require('http' ),
    app = express (),
    auth = require('./auth');

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

function notFoundHandler ( req, res, next ) {
   // sendErrorMessage ( res, 404, "Not Found" );
    var err = new Error('Not Found');
    err.code = 404;
    next(err);
}

function sendErrorMessage(res, code, message) {
    return res.status(code).json({
        code: code,
        message: message || http.STATUS_CODES[code]
    });
}

function errorHandler(err, req, res, next) {
    if ( err instanceof Error && err.code && err.message ) {
        return sendErrorMessage(res, err.code, err.message );
    }
    return sendErrorMessage(res, 500);
}

app.disable ( 'x-powered-by' );
app.enable ( 'etag', 'strict' );
app.disable ( 'etag' );
app.use ( auth.passport.initialize() );
app.use ( bodyParser.json () );
app.use ( latency () );
app.use ( '/', routes( auth ) );
app.use ( logErrors );
app.use ( notFoundHandler );
app.use ( errorHandler );
app.listen ( 3000, function () {
    console.log ( 'Express server listening on port 3000' );
} );
