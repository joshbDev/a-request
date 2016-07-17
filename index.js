'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SUCCESS = 'SUCCESS';
var FAILED = 'FAILED';
var GET = 'GET';
var POST = 'POST';
var DONE = 4;
var OK = [200, 299];

function get(url) {
  return new _promise2.default(function (resolve, reject) {
    makeCall(GET, url).then(function (_ref) {
      var response = _ref.response;
      var status = _ref.status;

      var result = status === SUCCESS ? resolve(response) : reject(response);
    });
  });
}

function post(url, postData) {
  var objectToSend = {
    postData: postData
  };
  return new _promise2.default(function (resolve, reject) {
    makeCall(POST, url, objectToSend).then(function (_ref2) {
      var response = _ref2.response;
      var status = _ref2.status;

      var result = status === SUCCESS ? resolve(response) : reject(response);
    });
  });
}

function makeCall() {
  var type = arguments.length <= 0 || arguments[0] === undefined ? GET : arguments[0];
  var url = arguments[1];
  var data = arguments[2];

  return new _promise2.default(function (resolve) {
    var request = new XMLHttpRequest();
    request.open(type, url);
    if (data && data.setHeaders && data.setHeaders.length) {
      data.setHeaders.forEach(function (header) {
        for (var item in header) {
          request.setRequestHeader(item, header[item]);
        }
      });
    }
    request.send(data && data.postData);
    request.onreadystatechange = function () {

      if (request.readyState === DONE) {
        if (request.status >= OK[0] && request.status <= OK[1]) {
          resolve({
            response: request.responseText,
            status: SUCCESS
          });
        }
        resolve({
          response: request.status,
          status: FAILED
        });
      }
    };
  });
}

module.exports = { get: get, post: post };