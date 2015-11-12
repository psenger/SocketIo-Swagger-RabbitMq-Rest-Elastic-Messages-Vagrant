/**
 * Created by philipsenger on 28/09/15.
 */
/* jshint strict: true */
/* global console, require, module, process */
"use strict";

var router = require ( 'express' ).Router (),
    controllers = require ( './controllers' ),
    curry = require('curry');

module.exports = function( auth ){

    var getTokenCallback = curry( controllers.getToken );
    // if I wanted to send to a login { failureRedirect: '/login', session: false }
    router.get  ( '/token/', getTokenCallback( auth.signature ) );
    router.post ( '/channels/', auth.authenticate, controllers.createChannel );
    router.get  ( '/channels/', auth.authenticate, controllers.getChannels );
    router.get  ( '/channels/:id/', controllers.getChannels );
    router.put  ( '/channels/:id/', controllers.putChannel );

    return router;
};