import Table from "./utils/Table"
import VColgroup from "./VColgroup"
import Checkbox from "../../checkbox"

export default {
  name: "VThead",
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
    fillWidth:{
      type:Boolean,
      default:false
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
    handleSort (e, data) {
      e.stopPropagation()
      if (!data.sortable) {
        return false
      }
      const target = e.currentTarget || e.target || e.srcElement
      const description = target.ariaSort === "desc" ? "asc" : "desc"
      target.ariaSort = description
      this.$emit("sort:update", { sortKey: data.field, sortDirection: description })
    },
    handleChange (e) {
      const target = e.target || e.srcElement;
      this.$emit("change", target.checked)
    },
    genColgroupContext () {
      return this.$createElement(VColgroup, {
        props: {
          columns: this.columns,
          colgroup: this.colgroup,
          gutter: this.gutter,
          selectable: this.selectable,
          checkboxSize: this.checkboxSize,
          barWidth: this.barWidth
        }
      })
    },
    genTHeadContext () {
      return this.$createElement("thead", {}, this.genHeaderChildrenContext())
    },
    genHeaderChildrenContext () {
      return this.$scopedSlots.default ? [this.genSlotContext("default", {
        colgroup: this.colgroup,
        columns: this.columns
      })] : this.genItemsContext()
    },
    genItemsContext () {
      return Table.group(this.colgroup,this.columns).reduce((current, next,idx) => {
        if (next.length > 0) { current.push(this.genRowContext(next,idx===0,this.genColContext)) }
        return current
      }, [])
    },
    genRowContext (cols,scalable,callback) {
      const children = []
      if (this.selectable && scalable) {
        children.push(this.genColCheckboxContext())
      }
      return this.$createElement("tr", {}, cols.reduce((accum, current, dx) => {
        accum.push(callback.apply(this, [current, dx]))
        return accum
      }, children))
    },
    genColContext (item, key) {
      return this.$createElement("th", {
        staticClass: "mux-text-" + (item.align || "center"),
        style: item.style,
        class: item.class,
        attrs: {
          colspan: item.colspan,
          rowspan: item.rowspan
        },
        key: `TH_${key}`
      }, [this.genCellContext(item)])
    },
    genCellContext (item) {
      return this.$createElement("div", {
        staticClass: "mux-table-cell",
        class: { "mux-table-cell-ellipsis": this.sealed },
        domProps: {
          ariaSort: "none"
        },
        on: {
          click: (e) => {
            this.handleSort(e, item)
          }
        }
      }, [this.genTextContext(item.text, item.sortable), item.sortable ? this.genSortContext() : null])
    },
    genColCheckboxContext () {
      const sortList = new Set(this.colgroup.map(it => it.weight));
      const rowspan = sortList.size +(this.columns.length?1:0);
      return this.$createElement("th", {
        staticClass: "mux-text-center",
        class: this.checkboxClass,
        attrs: {
          rowspan: rowspan
        },
        key: "TH_CHECKBOX"
      }, [this.genCheckboxWrapContext()])
    },
    genCheckboxWrapContext () {
      return this.$createElement("div", {
        staticClass: "mux-table-cell mux-table-cell--is-checkbox",
        domProps: { role: "checkbox" }
      }, [this.genCheckboxContext()])
    },
    genCheckboxContext () {
      return this.$createElement(Checkbox, {
        props: {
          checked:this.value,
          partial: this.indeterminate
        },
        on: {
          change: e => {
            this.handleChange(e)
          }
        }
      })
    },
    genTextContext (text, sortable) {
      return this.$createElement("span", {
        class: { "mux-table-cell-cursor": sortable }
      }, text)
    },
    genSortContext () {
      return this.$createElement("span", {
        staticClass: "mux-table-sort mux-table-cell-cursor"
      }, [this.genIconContext(false), this.genIconContext(true)])
    },
    genIconContext (isDesc) {
      return this.$createElement("i", {
        staticClass: "mux-table-icon",
        class: { "mux-table-icon-asc": !isDesc, "mux-table-icon-desc": isDesc }
      })
    },
    genSlotContext (slot, props) {
      return this.$scopedSlots[slot].call(this, props)
    }
  },
  render (h) {
    return h("table", {
      staticClass: "mux-table-meta",
      attrs: {
        skin: this.skin,
        size: this.size,
        cellpadding: 0,
        cellspacing: 0,
        border: 0
      },
      class: { "mux-table--is-fix": this.sealed,'mux-table--is-fill-width':this.fillWidth }
    }, [this.genColgroupContext(), this.genTHeadContext()])
  }
}
