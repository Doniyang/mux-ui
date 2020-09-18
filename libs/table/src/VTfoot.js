"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _vue.default.extend({
  name: 'VTfoot',
  props: {
    skin: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: 'table'
    }
  },
  methods: {
    genTabeContext() {
      return this.$createElement('table', {
        staticClass: 'v-table-wrap',
        attrs: {
          skin: this.skin,
          role: this.role
        }
      }, [this.genTFootContext()]);
    },

    genTFootContext() {
      return this.$createElement('tfoot', {}, this.$slots.default);
    }

  },

  render(h) {
    return h('div', {
      staticClass: 'v-table-footer--wrap'
    }, [this.genTabeContext()]);
  }

});

exports.default = _default;