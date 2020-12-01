"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _VThead = _interopRequireDefault(require("./VThead"));

var _VTbody = _interopRequireDefault(require("./VTbody"));

var _Table = _interopRequireDefault(require("./utils/Table"));

var _VPanel = _interopRequireDefault(require("./VPanel"));

var _VScrollPanel = _interopRequireDefault(require("./VScrollPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default2 = {
  name: 'v-table',
  props: {
    colgroup: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    dataItems: {
      type: Array,
      default: () => []
    },
    skin: {
      type: String,
      default: 'default',

      validator(v) {
        return ['default', 'row', 'line', 'none'].indexOf(v) > -1;
      }

    },
    cellMinWidth: {
      type: Number,
      default: 60
    },
    caption: {
      type: String,
      default: ''
    },
    stripe: {
      type: Boolean,
      default: false
    },
    fixedHeader: {
      type: Boolean,
      default: false
    },
    hScroll: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: '数据在努力加载中...'
    },
    full: {
      type: Boolean,
      default: false
    },
    noDataText: {
      type: String,
      default: '暂无数据'
    },
    height: {
      type: [Number, String],
      default: 0
    }
  },

  provide() {
    return {
      smartTable: this
    };
  },

  data() {
    return {
      scrollbar: {
        height: 0,
        width: 0
      },
      wrapHeight: 0,
      captionHeight: 0,
      headerHeight: 0,
      pagiantionHeight: 0
    };
  },

  methods: {
    setClientHeight(osnap, height) {
      switch (osnap) {
        case 0:
          {
            this.wrapHeight = height;
            break;
          }

        case 1:
          {
            this.captionHeight = height;
            break;
          }

        case 2:
          {
            this.headerHeight = height;
            break;
          }

        case 3:
          {
            this.pagiantionHeight = height;
            break;
          }

        default:
          break;
      }
    },

    setScrollbar(height, width) {
      this.$set(this.scrollbar, 'height', height);
      this.$set(this.scrollbar, 'width', width);
    },

    handleScroll(e) {
      var target = e.target || e.srcElement;
      var headerEle = this.$refs.tHeader.$el;
      var fixedLeftEle = this.$refs.fixedBodyLeft;
      var fixedRightEle = this.$refs.fixedBodyRight;

      if (headerEle) {
        headerEle.scrollLeft = target.scrollLeft;
      }

      if (fixedLeftEle) {
        fixedLeftEle.scrollTop = target.scrollTop;
      }

      if (fixedRightEle) {
        fixedRightEle.scrollTop = target.scrollTop;
      }
    },

    genPagiantionContext() {
      return this.$scopedSlots.pagination ? this.$createElement(_VPanel.default, {
        props: {
          osnap: 3,
          full: false
        },
        staticClass: "mux-table-pagination"
      }, this.$scopedSlots.pagination()) : null;
    },

    genCaptionContext() {
      return this.$createElement(_VPanel.default, {
        props: {
          osnap: 1,
          full: false
        },
        staticClass: "mux-table-caption"
      }, this.$scopedSlots.caption ? this.$scopedSlots.caption() : this.caption);
    },

    genMainContext() {
      var colgroup = _Table.default.makeCell(this.colgroup, this.cellMinWidth);

      var columns = _Table.default.makeCell(this.columns, this.cellMinWidth);

      console.log(colgroup);
      return this.$createElement("main", {
        staticClass: "mux-table-container",
        class: {
          "v-table--is-stripe": this.stripe,
          "v-table-fixed-header": this.fixedHeader,
          "v-table-is-xscroll": this.hScroll
        }
      }, [this.genHeaderContext(colgroup, columns), this.genBodyContext(colgroup, columns), !_Table.default.has(this.$scopedSlots, ['header', 'body']) && !!this.dataItems.length && (_Table.default.isFixed(colgroup, false) || _Table.default.isFixed(columns, false)) ? this.genFixedTableContext(colgroup, columns, false) : null, !_Table.default.has(this.$scopedSlots, ['header', 'body']) && !!this.dataItems.length && (_Table.default.isFixed(colgroup, true) || _Table.default.isFixed(columns, true)) ? this.genFixedTableContext(colgroup, columns, true) : null]);
    },

    genHeaderContext(colgroup, columns) {
      var scopeSlots = {};
      this.genSlotContext('header', 'default', (key, vnode) => scopeSlots[key] = vnode);
      return this.$createElement(_VPanel.default, {
        staticClass: 'v-table-header',
        props: {
          osnap: 2,
          full: false,
          tag: 'header'
        },
        attrs: {
          role: 'header'
        },
        ref: 'tHeader'
      }, [this.genTHeadContext({
        colgroup: colgroup,
        columns: columns,
        gutter: this.scrollbar.width > 0,
        barWidth: this.scrollbar.width
      }, scopeSlots)]);
    },

    genBodyContext(colgroup, columns) {
      var scopedOpts = {};
      var slots = [{
        scoped: "process",
        slot: "loading"
      }, {
        scoped: "default",
        slot: "body"
      }, {
        scoped: "empty",
        slot: "noData"
      }];
      slots.forEach(item => {
        this.genSlotContext(item.slot, item.scoped, (scoped, vnode) => {
          scopedOpts[scoped] = vnode;
        });
      });
      colgroup.forEach(item => {
        if (item.slotable) {
          this.genSlotContext(item.slot, item.slot, (scoped, vnode) => {
            scopedOpts[scoped] = vnode;
          });
        }
      });
      columns.forEach(item => {
        if (item.slotable) {
          this.genSlotContext(item.slot, item.slot, (scoped, vnode) => {
            scopedOpts[scoped] = vnode;
          });
        }
      });
      return this.$createElement(_VScrollPanel.default, {
        staticClass: 'v-table-body',
        props: {
          height: this.wrapHeight - this.pagiantionHeight - this.captionHeight - this.headerHeight
        },
        nativeOn: {
          scroll: e => {
            this.handleScroll(e);
          }
        },
        attrs: {
          role: 'body'
        }
      }, [this.genTBodyContext({
        skin: this.skin,
        colgroup: colgroup,
        columns: columns,
        dataItems: this.dataItems,
        loading: this.loading,
        loadingText: this.loadingText,
        noDataText: this.noDataText,
        activeIndex: this.activeIndex
      }, scopedOpts)]);
    },

    genTHeadContext(props, slots) {
      return this.$createElement(_VThead.default, {
        props: props,
        scopedSlots: slots
      });
    },

    genTBodyContext(props, slots) {
      return this.$createElement(_VTbody.default, {
        props: props,
        scopedSlots: slots
      });
    },

    genFixedTableContext(colgroup, columns, rtl) {
      var fixedColgroup = _Table.default.makeFrozenCols(colgroup, rtl);

      var fixedColumns = _Table.default.makeFrozenCols(columns, rtl);

      var width = [...fixedColgroup, ...fixedColumns].reduce((curent, next) => curent + (next.colspan === 1 ? next.width : 0), 0);
      return this.$createElement('div', {
        staticClass: 'v-table-container--is-fixed',
        style: {
          left: rtl ? undefined : 0,
          right: rtl ? this.scrollbar.width + 'px' : undefined,
          width: width + 'px',
          bottom: this.scrollbar.height + 'px'
        }
      }, [this.genFixedTheadContext(fixedColgroup, fixedColumns), this.genFixedTBodyContext(fixedColgroup, fixedColumns, rtl)]);
    },

    genFixedTheadContext(colgroup, columns) {
      return this.$createElement('div', {
        staticClass: 'v-table-header--wrap'
      }, [this.genTHeadContext({
        colgroup: colgroup,
        columns: columns,
        gutter: false
      }, null)]);
    },

    genFixedTBodyContext(colgroup, columns, rtl) {
      var scopedOpts = {};
      colgroup.forEach(item => {
        if (item.slotable) {
          this.genSlotContext(item.slot, item.slot, (scoped, vnode) => {
            scopedOpts[scoped] = vnode;
          });
        }
      });
      columns.forEach(item => {
        if (item.slotable) {
          this.genSlotContext(item.slot, item.slot, (scoped, vnode) => {
            scopedOpts[scoped] = vnode;
          });
        }
      });
      return this.$createElement('div', {
        staticClass: 'v-table-body--wrap',
        style: {
          height: this.wrapHeight - this.pagiantionHeight - this.captionHeight - this.headerHeight - this.scrollbar.height + 'px'
        },
        ref: 'fixedBody' + (rtl ? 'Right' : 'Left')
      }, [this.genTBodyContext({
        skin: this.skin,
        colgroup: colgroup,
        columns: columns,
        dataItems: this.dataItems,
        activeIndex: this.activeIndex
      }, scopedOpts)]);
    },

    genSlotContext(slot, key, callback) {
      if (this.$scopedSlots[slot]) {
        callback.apply(this, [key, props => this.$scopedSlots[slot].call(this, props)]);
      }
    }

  },

  render(h) {
    return h(_VPanel.default, {
      staticClass: "component mux-table",
      style: {
        height: this.full ? undefined : isNaN(this.height) ? this.height : this.height + 'px'
      },
      props: {
        full: this.full,
        osnap: 0
      }
    }, [this.genCaptionContext(), this.genMainContext(), this.genPagiantionContext()]);
  }

};
exports.default = _default2;