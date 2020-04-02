"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelAnimationFrame = exports.requestAnimationFrame = void 0;

var requestAnimationFrame = function () {
  var lastTime = 0;
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}();

exports.requestAnimationFrame = requestAnimationFrame;

var cancelAnimationFrame = function () {
  return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelRequestAnimationFrame || function (id) {
    window.clearTimeout(id);
  };
}();

exports.cancelAnimationFrame = cancelAnimationFrame;