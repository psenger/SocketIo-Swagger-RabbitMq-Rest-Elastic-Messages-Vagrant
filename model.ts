/* jshint strict: true */
/* global console, require, module, process */

class Message {
    constructor( public code:number = 0, public message:string = '', public fields:string[] = [] ){
    }
}

module.exports.Message = Message;

class Channel {
    constructor( public id:string = null, public desc:string = '', public href:string = '', public rel:string='' ){
    }
}

module.exports.Channel = Channel;