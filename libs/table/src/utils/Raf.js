"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelAnimationFrame = exports.requestAnimationFrame = void 0;

var requestAnimationFrame = function () {
  var start = 0;
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) {
    var now = Date.now();
    var delay = Math.max(0, 16.7 - (now - start));
    var tId = window.setTimeout(function () {
      fn(now + delay);
    }, delay);
    start = now + delay;
    return tId;
  };
}();

exports.requestAnimationFrame = requestAnimationFrame;

var cancelAnimationFrame = function () {
  return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function (id) {
    window.clearTimeout(id);
  };
}();

exports.cancelAnimationFrame = cancelAnimationFrame;