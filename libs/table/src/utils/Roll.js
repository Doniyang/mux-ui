"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(el, binding) {
  var {
    arg,
    value,
    modifiers
  } = binding;

  if (modifiers.enable) {
    if (arg === "horizontal") {
      el.scrollLeft = value;
    }

    if (arg === "vertical") {
      el.scrollTop = value;
    }
  }
}