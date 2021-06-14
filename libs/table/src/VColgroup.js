"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Table = _interopRequireDefault(require("./utils/Table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default2 = {
  functional: true,
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    colgroup: {
      type: Array,
      default: () => []
    },
    gutter: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: false
    },
    checkboxSize: {
      type: [Number, String],
      default: 70
    },
    barWidth: {
      type: Number,
      defalut: 0
    }
  },
  name: "VColgroup",

  render(h, context) {
    var {
      props
    } = context;

    var columns = _Table.default.make(props.colgroup, props.columns);

    return h("colgroup", {}, [props.selectable ? h("col", {
      attrs: {
        name: "col-checkbox",
        align: "center",
        width: props.checkboxSize
      }
    }) : null, ...columns.map((d, dx) => h("col", {
      attrs: {
        name: "c-col-" + dx,
        align: d.align,
        width: d.width
      }
    })), props.gutter ? h("col", {
      attrs: {
        name: "col-gutter",
        align: "center",
        width: props.barWidth
      }
    }) : null]);
  }

};
exports.default = _default2;