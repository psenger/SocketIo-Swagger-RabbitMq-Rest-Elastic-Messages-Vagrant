/**
 * Created by philip a senger on 1/10/15.
 */
/* jshint strict: true */
/* global console, require, module, process */
var redis = require("redis" ),
    JwtStrategy = require('passport-jwt').Strategy,
    passport = require('passport' ),
    Promise = require("bluebird"),
    client = redis.createClient(6379,'192.168.33.10');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

// var getAsync = Promise.promisify(client.get);
var redisGet = Promise.promisify(client.get, {context: client});

var opts = {
    secretOrKey: 'MonkeyButt',
    issuer: "accounts.examplesoft.com",
    audience: "yoursite.net",
    ignoreExpiration: false
};

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // connect to redis with a password
    console.log ('Calling Redis');
    //client.auth ( 'passwordpasswordpasswordpassword', function ( err, reply ) {
    //    console.log ('Calling Redis err ', err );
    //    console.log ('Calling Redis reply ', reply );
    //    if ( ! err ) {
    //        // attempt to pull the user object from redis based on the user id
    //        client
    //            .getAsync ( jwt_payload.id )
    //            .then ( function ( result ) {
    //                return new Promise ( function ( resolve, reject ) {
    //                    if ( result != null ) {
    //                        resolve ( JSON.parse ( result ) );
    //                    } else {
    //                        resolve ( null );
    //                    }
    //                } );
    //            } )
    //            .then ( function ( result ) {
    //                return new Promise ( function ( resolve, reject ) {
    //                    if ( result == null ) {
    //                        // go get the user from the database. if we cant find the ud we would reject here.
    //                        result = {
    //                            "id": jwt_payload.id ,
    //                            "index": 0,
    //                            "guid": "b463d4d2-bc22-482a-ade4-41ce4f0602f2",
    //                            "isActive": false,
    //                            "balance": "$1,516.52",
    //                            "picture": "http://placehold.it/32x32",
    //                            "age": 24,
    //                            "eyeColor": "blue",
    //                            "name": "Shepard Walter",
    //                            "gender": "male",
    //                            "company": "KOG",
    //                            "email": "shepardwalter@kog.com",
    //                            "phone": "+1 (921) 552-2703",
    //                            "address": "420 Pulaski Street, Bodega, Oklahoma, 2629",
    //                            "about": "Nisi nisi consectetur aliquip sunt. Id culpa esse commodo veniam sint non ad dolor enim magna minim elit voluptate fugiat. Proident ut qui amet eiusmod reprehenderit anim ut consequat in ipsum esse amet elit esse. Anim cupidatat enim ex cillum. Nostrud labore nulla ad mollit non ex sit. Non magna fugiat sit sit ea pariatur nulla enim consequat fugiat velit. Cupidatat adipisicing dolore amet aliquip occaecat ipsum minim duis voluptate.\r\n",
    //                            "registered": "2015-08-06T04:30:22 -10:00",
    //                            "latitude": 61.599863,
    //                            "longitude": -80.232748,
    //                            "tags": [
    //                                "sunt",
    //                                "proident",
    //                                "dolore",
    //                                "velit",
    //                                "tempor",
    //                                "labore",
    //                                "velit"
    //                            ],
    //                            "friends": [
    //                                {
    //                                    "id": 0,
    //                                    "name": "Franks Bradley"
    //                                },
    //                                {
    //                                    "id": 1,
    //                                    "name": "Thelma Cervantes"
    //                                },
    //                                {
    //                                    "id": 2,
    //                                    "name": "Mcdonald Ochoa"
    //                                }
    //                            ],
    //                            "greeting": "Hello, Shepard Walter! You have 7 unread messages.",
    //                            "favoriteFruit": "strawberry"
    //                        };
    //                    }
    //                    resolve ( result );
    //                } );
    //            } )
    //            .then ( function ( result ) {
    //                // store the user in redis
    //                if ( result != null ) {
    //                    client.set ( result.id, JSON.stringify ( result ), null, 10234 );
    //                    done ( null, result );
    //                } else {
    //                    done ( null, false );
    //                }
    //            } )
    //            .catch ( function ( err ) {
    //                done ( err, false );
    //            } );
    //    }
    //});
    // attempt to pull the user object from redis based on the user id
    client.getAsync ( jwt_payload.id )
        .then ( function ( result ) {
            return new Promise ( function ( resolve, reject ) {
                if ( result != null ) {
                    resolve ( JSON.parse ( result ) );
                } else {
                    resolve ( null );
                }
            } );
        } )
        .then ( function ( result ) {
            return new Promise ( function ( resolve, reject ) {
                if ( result == null ) {
                    // go get the user from the database. if we cant find the ud we would reject here.
                    result = {
                        "id": jwt_payload.id ,
                        "index": 0,
                        "guid": "b463d4d2-bc22-482a-ade4-41ce4f0602f2",
                        "isActive": false,
                        "balance": "$1,516.52",
                        "picture": "http://placehold.it/32x32",
                        "age": 24,
                        "eyeColor": "blue",
                        "name": "Shepard Walter",
                        "gender": "male",
                        "company": "KOG",
                        "email": "shepardwalter@kog.com",
                        "phone": "+1 (921) 552-2703",
                        "address": "420 Pulaski Street, Bodega, Oklahoma, 2629",
                        "about": "Nisi nisi consectetur aliquip sunt. Id culpa esse commodo veniam sint non ad dolor enim magna minim elit voluptate fugiat. Proident ut qui amet eiusmod reprehenderit anim ut consequat in ipsum esse amet elit esse. Anim cupidatat enim ex cillum. Nostrud labore nulla ad mollit non ex sit. Non magna fugiat sit sit ea pariatur nulla enim consequat fugiat velit. Cupidatat adipisicing dolore amet aliquip occaecat ipsum minim duis voluptate.\r\n",
                        "registered": "2015-08-06T04:30:22 -10:00",
                        "latitude": 61.599863,
                        "longitude": -80.232748,
                        "tags": [
                            "sunt",
                            "proident",
                            "dolore",
                            "velit",
                            "tempor",
                            "labore",
                            "velit"
                        ],
                        "friends": [
                            {
                                "id": 0,
                                "name": "Franks Bradley"
                            },
                            {
                                "id": 1,
                                "name": "Thelma Cervantes"
                            },
                            {
                                "id": 2,
                                "name": "Mcdonald Ochoa"
                            }
                        ],
                        "greeting": "Hello, Shepard Walter! You have 7 unread messages.",
                        "favoriteFruit": "strawberry"
                    };
                }
                resolve ( result );
            } );
        } )
        .then ( function ( result ) {
            // store the user in redis
            if ( result != null ) {
                client.set ( result.id, JSON.stringify ( result ), null, 10234 );
                done ( null, result );
            } else {
                done ( null, false );
            }
        } )
        .catch ( function ( err ) {
            done ( err, false );
        } );
    //User.findOne({id: jwt_payload.sub}, function(err, user) {
    //    if (err) {
    //        return done(err, false);
    //    }
    //    if (user) {
    //        done(null, user);
    //    } else {
    //        done(null, false);
    //        // or you could create a new account
    //    }
    //});
}));

module.exports.authenticate = passport.authenticate('jwt', { session: false } );
//module.exports.authenticate = function(){
//    return passport.authenticate('jwt', { session: false } );
//};

module.exports.signature = opts;

module.exports.passport = passport;
