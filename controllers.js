/**
 * Created by Philip A Senger on 28/09/15.
 */
/* jshint strict: true */
/* global console, require, module, process */
var models = require ( './model.js' ),
    jwt = require ( 'jsonwebtoken' );

/**
 * Get a token.
 * @param signature
 * @param req
 * @param res
 * @param next
 */
module.exports.getToken = function getToken ( signature, req, res, next ) {
    var user = {
        "sub": "1234567890",               // Subject - Registered Claim Name
        "id": 10234,                       // I want to reduce the hits to the database to fill in the identity, so I will use Redis to cache.
        "iss": "accounts.examplesoft.com", // Issuer - Registered Claim Name
        "exp": "9999999999",               // Expiration Time - Registered Claim Name
        "aud": "yoursite.net"              // Audience - Registered Claim Name
    };
    var token = jwt.sign ( user, signature.secretOrKey, {
        expiresInMinutes: 1440 // expires in 24 hours
    } );
    res.status ( 200 ).json ( { token: token, expires: 1440 } );
};

/**
 * Middleware used to enforce roles.
 * @param roles
 * @param req
 * @param res
 * @param next
 */
module.exports.permit = function getToken ( roles, req, res, next ) {
    if ( !req._passport ) {
        return this.error ( new Error ( 'passport.initialize() middleware not in use' ) );
    }

};

module.exports.createChannel = function getChannels ( req, res, next ) {
    console.log ( 'getChannels: req.param.id : ' + req.param.id );
    var Channel = models.Channel;
    var channel = new Channel ();
    res.status ( 200 ).json ( [ channel ] );
};

module.exports.getChannels = function getChannels ( req, res, next ) {
    console.log ( 'getChannels: req.param.id : ' + req.param.id );
    var Channel = models.Channel;
    var channel = new Channel ();
    res.status ( 200 ).json ( [ channel ] );
};

module.exports.putChannel = function putChannel ( req, res, next ) {
    console.log ( 'putChannel: req.param.id : ' + req.param.id );
    var Channel = models.Channel;
    var channel = new Channel ();
    res.status ( 200 ).json ( [ channel ] );
};