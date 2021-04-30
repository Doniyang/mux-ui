import VColgroup from "./VColgroup"

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
    handleChange (isSelected) {
      this.$emit("change", isSelected)
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
      const groupList = [this.columns]
      const sortList = new Set(this.colgroup.map(it => it.weight).sort((a, b) => a - b))
      sortList.forEach(weight => {
        groupList.unshift(this.colgroup.filter(d => d.weight === weight))
      })
      return groupList.reduce((current, next) => {
        if (next.length > 0) { current.push(this.genRowContext(next, this.genColContext)) }
        return current
      }, [])
    },
    genRowContext (cols, callback) {
      const children = []
      if (this.selectable) {
        children.push(this.genColCheckboxContext())
      }
      return this.$createElement("tr", {}, cols.reduce((accum, current, dx) => {
        accum.push(callback.apply(this, [current, dx]))
        return accum
      }, children))
    },
    genColContext (item, key) {
      return this.$createElement("th", {
        staticClass: "v-text-" + (item.align || "center"),
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
        staticClass: "v-table-cell",
        class: { "v-table-cell-ellipsis": this.sealed },
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
      return this.$createElement("th", {
        staticClass: "v-text-center",
        class: this.checkboxClass,
        attrs: {
          rowspan: Math.max(1, ...this.colgroup.map(item => item.rowspan))
        },
        key: "TH_CHECKBOX"
      }, [this.genCheckboxWrapContext()])
    },
    genCheckboxWrapContext () {
      return this.$createElement("div", {
        staticClass: "v-table-cell v-table-checkbox",
        domProps: { role: "checkbox" }
      }, [this.genCheckboxContext()])
    },
    genCheckboxContext () {
      return this.$createElement("v-checkbox", {
        props: {
          hideDetails: true,
          color: "primary",
          multiple: false,
          inputValue: this.value,
          indeterminate: this.indeterminate
        },
        on: {
          change: val => {
            console.log(this)
            this.handleChange(val)
          }
        }
      })
    },
    genTextContext (text, sortable) {
      return this.$createElement("span", {
        class: { "v-table-cell-cursor": sortable }
      }, text)
    },
    genSortContext () {
      return this.$createElement("span", {
        staticClass: "v-table-sort v-table-cell-cursor"
      }, [this.genIconContext(false), this.genIconContext(true)])
    },
    genIconContext (isDesc) {
      return this.$createElement("i", {
        staticClass: "v-table-icon",
        class: { "v-table-icon-asc": !isDesc, "v-table-icon-desc": isDesc }
      })
    },
    genSlotContext (slot, props) {
      return this.$scopedSlots[slot].call(this, props)
    }
  },
  render (h) {
    return h("table", {
      staticClass: "v-table-box",
      attrs: {
        skin: this.skin,
        size: this.size,
        cellpadding: 0,
        cellspacing: 0,
        border: 0
      },
      class: { "v-table--is-fix": this.sealed }
    }, [this.genColgroupContext(), this.genTHeadContext()])
  }
}
