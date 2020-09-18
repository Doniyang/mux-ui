"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: "v-button",
  functional: true,
  props: {
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "normal",

      validator(v) {
        return ["small", "normal", "large"].includes(v);
      }

    },
    color: {
      type: String,
      default: "default",

      validator(v) {
        return ["default", "primary", "danger", "error"].includes(v);
      }

    }
  },

  render(h, context) {
    var classMap = ["mux-btn-" + context.props.color, "mux-btn-" + context.props.size, {
      "mux-btn--is-disabled": context.props.disabled,
      "mux-btn--is-block": context.props.block,
      "mux-btn--is-plain": context.props.plain,
      "mux-btn--is-rounded": context.props.rounded
    }];
    var attrs = {
      disabled: context.props.disabled
    };
    return h("button", _objectSpread({}, context.data, {
      class: classMap,
      attrs: attrs,
      staticClass: 'component mux-btn'
    }), context.children);
  }

};
exports.default = _default;