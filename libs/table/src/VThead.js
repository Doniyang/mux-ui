"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _VColgroup = _interopRequireDefault(require("./VColgroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default2 = _vue.default.extend({
  name: 'VThead',
  props: {
    colums: {
      type: Array,
      default: () => []
    },
    colgroup: {
      type: Array,
      default: () => []
    },
    cellMinWidth: {
      type: Number,
      default: 60
    },
    skin: {
      type: String,
      default: ''
    },
    barWidth: {
      type: Number,
      default: 0
    },
    scrollPosX: {
      type: Number,
      default: 0
    }
  },
  methods: {
    genWrapContext() {
      return this.$createElement('div', {
        staticClass: 'v-table-header-inner',
        style: {
          MsTransform: "translate(-".concat(this.scrollPosX, "px,0)"),
          MozTransform: "translate(-".concat(this.scrollPosX, "px,0)"),
          WebkitTransform: "translate(-".concat(this.scrollPosX, "px,0)"),
          OTransform: "translate(-".concat(this.scrollPosX, "px,0)"),
          transform: "translate(-".concat(this.scrollPosX, "px,0)")
        }
      }, [this.genTableContext()]);
    },

    genTableContext() {
      return this.$createElement('table', {
        staticClass: 'v-table-wrap',
        attrs: {
          skin: this.skin
        }
      }, [this.genColController(), this.genTHeadContext()]);
    },

    genColController() {
      return this.$createElement(_VColgroup.default, {
        props: {
          colums: this.colums,
          colgroup: this.colgroup,
          gutter: true,
          barWidth: this.barWidth,
          cellMinWidth: this.cellMinWidth
        }
      });
    },

    genTHeadContext() {
      return this.$createElement('thead', {}, this.genHeadChildrenContext());
    },

    genHeadChildrenContext() {
      return this.$scopedSlots.default ? [this.$scopedSlots.default({
        colums: this.colums,
        colgroup: this.colgroup
      })] : [this.colgroup.length > 0 ? this.genRowContext(this.colgroup) : null, this.genRowContext(this.colums)];
    },

    genRowContext(props) {
      return this.$createElement('tr', {}, this.genColContext(props));
    },

    genColContext(colums) {
      return colums.map((item, index) => this.$createElement('th', {
        staticClass: 'v-text-' + (item.align || 'center'),
        attrs: {
          colspan: item.colspan || 1,
          rowspan: item.rowspan || 1
        },
        key: "TH_".concat(index)
      }, [this.genContentWrap(item.text)]));
    },

    genContentWrap(text) {
      return this.$createElement('div', {
        staticClass: 'v-table-cell'
      }, text);
    }

  },

  render(h) {
    return h('div', {
      staticClass: 'v-table-header--wrap'
    }, [this.genWrapContext()]);
  }

});

exports.default = _default2;