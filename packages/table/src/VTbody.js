import Table from "./utils/Table"
import VColgroup from "./VColgroup"
import Editor from "./Editor"
import Checkbox from "../../checkbox"
export default {
  name: "VTbody",
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
    columns: {
      type: Array,
      default: () => []
    },
    dataItems: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: "数据正在努力加载中..."
    },
    noDataText: {
      type: String,
      default: ""
    },
    selectable: {
      type: Boolean,
      default: false
    },
    checkboxSize: {
      type: [Number, String],
      default: 70
    },
    selectKey: {
      type: String,
      default: "id"
    },
    value: {
      type: Array,
      default: () => []
    },
    sealed: {
      type: Boolean,
      default: false
    },
    activeIndex: {
      type: Number,
      default: -1
    },
    fillWidth:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    handleCloseClick (e) {
      const { target, value, commit } = e
      const parent = target.parentElement || target.parentNode
      if (commit) {
        const previous = target.previousSibling || target.previousElementSibling
        previous.innerText = value
      }
      parent.ariaModal = "false"
    },
    handleClick (e, cfg, item) {
      if (cfg.clickable) { this.$emit("click:cell", item) }
      if (cfg.editable) {
        const target = e.currentTarget || e.target || e.srcElement
        target.ariaModal = "true"
      }
    },
    genColgroupContext () {
      return this.$createElement(VColgroup, {
        props: {
          columns: this.columns,
          colgroup: this.colgroup,
          gutter: false,
          selectable: this.selectable,
          checkboxSize: this.checkboxSize
        }
      })
    },
    genTBodyContext () {
      return this.$createElement("tbody", {}, [this.genTBodyChildrenContext()])
    },
    genTBodyChildrenContext () {
      const columns = Table.make(this.colgroup, this.columns)
      const props = {
        columns: columns,
        loading: this.loading,
        loadingText: this.loadingText,
        dataItems: this.dataItems,
        noDataText: this.noDataText
      }
      return this.$scopedSlots.default ? [this.genSlotContext("default", props)] : this.genItemsContext(props)
    },
    genItemsContext (props) {
      const { columns, loading, dataItems, noDataText, loadingText } = props
      if (loading) {
        return [this.genRowContext(columns.length, loadingText, null, "loading", this.genLoadingContext)]
      }
      if (dataItems.length === 0) {
        return [this.genRowContext(columns.length, noDataText, null, "empty", this.genNoDataContext)]
      }
      return dataItems.map((item, dx) => this.genRowContext(item, columns, {
        ariaRowIndex: dx,
        ariaBusy: dx === this.activeIndex
      }, "ROW_" + dx, this.genColContext))
    },
    genRowContext (row, col, props, key, callback) {
      return this.$createElement("tr", {
        key: key,
        domProps: props
      }, callback.apply(this, [row, col]))
    },
    genColContext (row, cols) {
      const children = []
      if (this.selectable) {
        children.push(this.genColCheckboxContext(row, this.selectKey))
      }
      return cols.reduce((accum, current, dx, ary) => {
        accum.push(this.genColItemContext(row, current, dx, ary.length - 1))
        return accum
      }, children)
    },
    genColItemContext (row, item, dx, max) {
      return this.$createElement("td", {
        staticClass: "mux-text-" + item.align,
        class: {
          "mux-table-cell--is-editable": item.editable
        },
        domProps: {
          ariaColIndex: dx,
          ariaModal: "false"
        },
        on: {
          click: e => {
            this.handleClick(e, item, row)
          }
        },
        key: `TD_${dx}`
      }, [item.slotable ? this.genSlotContext(item.slot, { item: row }) : this.genCellContext(item.formator(row, item.field)), item.editable ? this.genEditContext(row, item.field, dx, max) : null])
    },
    genColCheckboxContext (row, key) {
      return this.$createElement("td", {
        staticClass: "mux-text-center",
        key: "TD_CHECKBOX"
      }, [this.genCheckboxWrapContext(row, key)])
    },
    genCheckboxWrapContext (row, key) {
      return this.$createElement("div", {
        staticClass: "mux-table-cell mux-table-cell--is-checkbox",
        domProps: { role: "checkbox" }
      }, [this.genCheckboxContext(row, key)])
    },
    genCheckboxContext (row, key) {
      return this.$createElement(Checkbox, {
        props: {
          checkboxValue: row[key],
          value: this.value
        },
        on: {
          input: val => {
            this.$emit("change", val)
          }
        }
      })
    },
    genEditContext (row, field, index, max) {
      return this.$createElement(Editor, {
        props: {
          value: row,
          fieldKey: field,
          position: index === 0 ? "left" : (index === max ? "right" : "center")
        },
        on: {
          commit: data => {
            this.$emit("cell:input", data)
          },
          close: e => {
            this.handleCloseClick(e)
          }
        }
      })
    },
    genLoadingContext (colspan, txt) {
      return [this.$createElement("td", {
        staticClass: "mux-text-center mux-table--is-loading",
        attrs: {
          colspan: colspan
        }
      }, this.$scopedSlots.process ? this.genSlotContext("process", { loadingText: txt }) : [this.genCellContext(txt)])]
    },
    genNoDataContext (colspan, txt) {
      return [this.$createElement("td", {
        staticClass: "mux-text-center mux-table--is-empty",
        attrs: {
          colspan: colspan
        }
      }, this.$scopedSlots.empty ? this.genSlotContext("empty", { noDataText: txt }) : [this.genCellContext(txt)])]
    },
    genCellContext (txt) {
      return this.$createElement("div", {
        staticClass: "mux-table-cell",
        class: { "mux-table-cell-ellipsis": this.sealed }
      }, txt)
    },
    genSlotContext (slot, props) {
      return this.$scopedSlots[slot].call(this, props)
    }
  },
  render (h) {
    return h("table", {
      staticClass: "mux-table-meta",
      class:{'mux-table--is-fill-width':this.fillWidth},
      attrs: {
        skin: this.skin,
        size: this.size,
        cellpadding: 0,
        cellspacing: 0,
        border: 0
      }
    }, [this.genColgroupContext(), this.genTBodyContext()])
  }

}
