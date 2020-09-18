"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelAnimationFrame = exports.requestAnimationFrame = void 0;

var requestAnimationFrame = (() => {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

exports.requestAnimationFrame = requestAnimationFrame;

var cancelAnimationFrame = (() => {
  return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (id) {
    window.clearTimeout(id);
  };
})();

exports.cancelAnimationFrame = cancelAnimationFrame;