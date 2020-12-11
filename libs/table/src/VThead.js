"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _VColgroup = _interopRequireDefault(require("./VColgroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default2 = {
  name: "VThead",
  props: {
    colgroup: {
      type: Array,
      default: () => []
    },
    sealed: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => []
    },
    gutter: {
      type: Boolean,
      default: false
    },
    barWidth: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleSort(e, data) {
      e.stopPropagation();

      if (!data.sortable) {
        return false;
      }

      var target = e.currentTarget || e.target || e.srcElement;
      var description = target.ariaSort === 'desc' ? 'asc' : 'desc';
      target.ariaSort = description;
      this.$emit('sort:update', {
        sortKey: data.field,
        sortDirection: description
      });
    },

    genColgroupContext() {
      return this.$createElement(_VColgroup.default, {
        props: {
          columns: this.columns,
          colgroup: this.colgroup,
          gutter: this.gutter,
          barWidth: this.barWidth
        }
      });
    },

    genTHeadContext() {
      return this.$createElement('thead', {}, this.genHeaderChildrenContext());
    },

    genHeaderChildrenContext() {
      return this.$scopedSlots.default ? [this.genSlotContext('default', {
        colgroup: this.colgroup,
        columns: this.columns
      })] : this.genItemsContext();
    },

    genItemsContext() {
      return [this.colgroup, this.columns].reduce((current, next) => {
        if (next.length > 0) {
          current.push(this.genRowContext(next, this.genColContext));
        }

        return current;
      }, []);
    },

    genRowContext(cols, callback) {
      return this.$createElement('tr', {}, [].map.call(cols, (item, dx) => callback.apply(this, [item, dx])));
    },

    genColContext(item, key) {
      return this.$createElement('th', {
        staticClass: "mux-text-" + (item.align || "center"),
        style: item.style,
        class: item.class,
        attrs: {
          colspan: item.colspan,
          rowspan: item.rowspan
        },
        key: "TH_".concat(key)
      }, [this.genCellContext(item)]);
    },

    genCellContext(item) {
      return this.$createElement("div", {
        staticClass: "mux-table-cell",
        class: {
          'mux-table-cell-ellipsis': this.sealed
        },
        domProps: {
          ariaSort: 'none'
        },
        on: {
          click: e => {
            this.handleSort(e, item);
          }
        }
      }, [this.genTextContext(item.text, item.sortable), item.sortable ? this.genSortContext() : null]);
    },

    genTextContext(text, sortable) {
      return this.$createElement('span', {
        class: {
          'mux-table-cell-cursor': sortable
        }
      }, text);
    },

    genSortContext() {
      return this.$createElement('span', {
        staticClass: 'mux-table-sort mux-table-cell-cursor'
      }, [this.genIconContext(false), this.genIconContext(true)]);
    },

    genIconContext(isDesc) {
      return this.$createElement('i', {
        staticClass: 'mux-table-icon',
        class: {
          "mux-table-icon-asc": !isDesc,
          'mux-table-icon-desc': isDesc
        }
      });
    },

    genSlotContext(slot, props) {
      return this.$scopedSlots[slot].call(this, props);
    }

  },

  render(h) {
    return h("table", {
      staticClass: "mux-table-wrap",
      attrs: {
        cellpadding: 0,
        cellspacing: 0,
        border: 0
      }
    }, [this.genColgroupContext(), this.genTHeadContext()]);
  }

};
exports.default = _default2;