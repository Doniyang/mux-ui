"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: "v-sticky",
  functional: true,
  props: {
    top: {
      type: [Number, String],
      default: 0
    },
    left: {
      type: [Number, String],
      default: "auto"
    },
    right: {
      type: [Number, String],
      default: "auto"
    },
    bottom: {
      type: [Number, String],
      default: "auto"
    }
  },

  render(h, context) {
    var styles = {
      top: isNaN(context.props.top) ? context.props.top : context.props.top + "px",
      left: isNaN(context.props.left) ? context.props.left : context.props.left + "px",
      right: isNaN(context.props.right) ? context.props.right : context.props.right + "px",
      bottom: isNaN(context.props.bottom) ? context.props.bottom : context.props.bottom + "px"
    };
    return h("div", _objectSpread({}, context.data, {
      staticStyle: styles,
      staticClass: 'component mux-sticky'
    }), context.children);
  }

};
exports.default = _default;