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
  name: 'VColgroup',

  render(h, context) {
    var {
      props
    } = context;
    return h('colgroup', {}, [props.selectable ? h('col', {
      staticStyle: {
        width: _Table.default.pixel(props.checkboxSize)
      },
      attrs: {
        name: 'col-checkbox',
        align: 'center',
        width: props.checkboxSize
      }
    }) : null, props.columns.map((d, dx) => h('col', {
      staticStyle: {
        width: _Table.default.pixel(d.width)
      },
      attrs: {
        name: 'c-col-' + dx,
        align: d.align,
        width: d.width
      }
    })), props.gutter ? h('col', {
      staticStyle: {
        width: _Table.default.pixel(props.barWidth)
      },
      attrs: {
        name: 'col-gutter',
        align: 'center',
        width: props.barWidth
      }
    }) : null].flat());
  }

};
exports.default = _default2;