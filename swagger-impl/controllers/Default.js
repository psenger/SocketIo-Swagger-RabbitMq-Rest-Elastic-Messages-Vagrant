'use strict';

var url = require('url');


var Default = require('./DefaultService');


module.exports.channelsGet = function channelsGet (req, res, next) {
  var mode = req.swagger.params['mode'].value;
  

  var result = Default.channelsGet(mode);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.channelsPost = function channelsPost (req, res, next) {
  var body = req.swagger.params['body'].value;
  

  var result = Default.channelsPost(body);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};

module.exports.channelsIdPut = function channelsIdPut (req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  

  var result = Default.channelsIdPut(id, body);

  if(typeof result !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result || {}, null, 2));
  }
  else
    res.end();
};
