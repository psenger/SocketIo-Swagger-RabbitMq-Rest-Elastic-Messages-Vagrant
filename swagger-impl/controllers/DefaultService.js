'use strict';

exports.channelsGet = function(mode) {

  var examples = {};
  
  examples['application/json'] = [ {
  "rel" : "aeiou",
  "id" : "aeiou",
  "href" : "aeiou",
  "desc" : "aeiou"
} ];
  

  
  if(Object.keys(examples).length > 0)
    return examples[Object.keys(examples)[0]];
  
}
exports.channelsPost = function(body) {

  var examples = {};
  

  
}
exports.channelsIdPut = function(id, body) {

  var examples = {};
  

  
}
