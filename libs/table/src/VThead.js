"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _VColgroup = _interopRequireDefault(require("./VColgroup"));

var _checkbox = _interopRequireDefault(require("../../checkbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default2 = {
  name: 'VThead',
  props: {
    skin: {
      type: String
    },
    size: {
      type: String
    },
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
    selectable: {
      type: Boolean,
      default: false
    },
    checkboxSize: {
      type: [Number, String],
      default: 70
    },
    checkboxClass: {
      type: [String, Array],
      default: () => []
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    },
    fillWidth: {
      type: Boolean,
      default: false
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

    handleChange(e) {
      var target = e.target || e.srcElement;
      this.$emit('change', target.checked);
    },

    genColgroupContext() {
      return this.$createElement(_VColgroup.default, {
        props: {
          columns: this.columns,
          gutter: this.gutter,
          selectable: this.selectable,
          checkboxSize: this.checkboxSize,
          barWidth: this.barWidth
        }
      });
    },

    genTHeadContext() {
      return this.$createElement('thead', {}, this.genHeaderChildrenContext());
    },

    genHeaderChildrenContext() {
      return this.$scopedSlots.default ? this.genSlotContext('default', {
        colgroup: this.colgroup,
        columns: this.columns
      }) : this.genItemsContext();
    },

    genItemsContext() {
      return this.colgroup.reduce((current, next, idx) => {
        if (next.length) {
          current.push(this.genRowContext(next, idx === 0, this.genColContext));
        }

        return current;
      }, []);
    },

    genRowContext(cols, scalable, callback) {
      var children = [];

      if (this.selectable && scalable) {
        children.push(this.genColCheckboxContext());
      }

      return this.$createElement('tr', cols.reduce((accum, current, dx) => {
        accum.push(callback.apply(this, [current, dx]));
        return accum;
      }, children));
    },

    genColContext(item, key) {
      return this.$createElement('th', {
        staticClass: 'mux-text-align-' + (item.align || 'center'),
        style: item.style,
        class: item.class,
        domProps: {
          ariaColIndex: key
        },
        attrs: {
          colspan: item.colspan,
          rowspan: item.rowspan
        },
        key: "TH_".concat(key)
      }, [this.genCellContext(item)]);
    },

    genCellContext(item) {
      return this.$createElement('div', {
        staticClass: 'mux-table-cell',
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

    genColCheckboxContext() {
      return this.$createElement('th', {
        staticClass: 'mux-text-align-center',
        class: this.checkboxClass,
        attrs: {
          rowspan: Math.max(this.colgroup.length, 1)
        },
        key: 'TH_CHECKBOX'
      }, [this.genCheckboxWrapContext()]);
    },

    genCheckboxWrapContext() {
      return this.$createElement('div', {
        staticClass: 'mux-table-cell mux-table-cell--is-checkbox',
        domProps: {
          role: 'checkbox'
        }
      }, [this.genCheckboxContext()]);
    },

    genCheckboxContext() {
      return this.$createElement(_checkbox.default, {
        props: {
          checked: this.value,
          partial: this.indeterminate
        },
        on: {
          change: e => {
            this.handleChange(e);
          }
        }
      });
    },

    genTextContext(text, sortable) {
      return this.$createElement('span', {
        domProps: {
          title: text
        },
        class: {
          'mux-table-cell-cursor': sortable
        }
      }, text);
    },

    genSortContext() {
      return this.$createElement('span', {
        staticClass: 'table-sort table-cell-cursor'
      }, [this.genIconContext(false), this.genIconContext(true)]);
    },

    genIconContext(isDesc) {
      return this.$createElement('i', {
        staticClass: 'mux-table-icon',
        class: {
          'mux-table-icon-asc': !isDesc,
          'mux-table-icon-desc': isDesc
        }
      });
    },

    genSlotContext(slot, props) {
      return this.$scopedSlots[slot].call(this, props);
    }

  },

  render(h) {
    return h('table', {
      staticClass: 'mux-table-meta',
      attrs: {
        skin: this.skin,
        size: this.size,
        cellpadding: 0,
        cellspacing: 0,
        border: 0
      },
      class: {
        'mux-table--is-fix': this.sealed,
        'mux-table--is-fill-width': this.fillWidth
      }
    }, [this.genColgroupContext(), this.genTHeadContext()]);
  }

};
exports.default = _default2;