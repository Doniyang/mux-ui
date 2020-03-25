import Vue from 'vue'
import VColgroup from './VColgroup'

export default Vue.extend({
  name: "VTbody",
  props: {
    colums: {
      type: Array,
      default: () => []
    },
    colgroup: {
      type: Array,
      default: () => []
    },
    dataItems: {
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
    noDataText: {
      type: String,
      default: ''
    },
    loadingState: {
      type: Boolean,
      default: false
    },
    loadingStateText: {
      type: String,
      default: '数据加载中...'
    },
    allowScrollX: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick (isClickable, data) {
      if (isClickable) {
        this.$emit('cellClick', data)
      }
    },
    handleScroll (e) {
      const target = e.target || e.srcElement
      if (this.allowScrollX) {
        this.$emit('scrollPosX', target.scrollLeft)
      }
    },
    genWrapContext () {
      return this.$createElement('div', {
        staticClass: 'v-table-container',
        on: {
          scroll: e => {
            this.handleScroll(e)
          }
        }
      }, [this.genTabeContext()])
    },
    genTabeContext () {
      return this.$createElement('table', {
        staticClass: 'v-table-wrap',
        attrs: {
          skin: this.skin,
          cellpadding: 0,
          cellspacing: 0,
          border: 0
        }
      }, [this.genColController(), this.genTBodyContext()])
    },
    genColController () {
      return this.$createElement(VColgroup, {
        props: {
          colums: this.colums,
          colgroup: this.colgroup,
          gutter: false,
          cellMinWidth: this.cellMinWidth
        }
      })
    },
    genTBodyContext () {
      return this.$createElement('tbody', {
      }, this.genBodyChildrenContext())
    },
    genBodyChildrenContext () {
      let colums = this.makeColums(this.colgroup, this.colums)
      const props = {
        colums: colums,
        loadingState: this.loadingState,
        loadingStateText: this.loadingStateText,
        dataItems: this.dataItems,
        noDataText: this.noDataText
      }
      return this.$scopedSlots.default ? [this.$scopedSlots.default(props)] : this.genRowContext(props)
    },
    makeColums (colgroup, colums) {
      let copyColums = [...colums]
      return colgroup.length > 0 ? colgroup.reduce((previous, current) => {
        current.hasOwnProperty('colspan') ? Array.prototype.push.apply(previous, copyColums.splice(0, current.colspan)) : previous.push(current)
        return previous
      }, []) : colums;
    },
    genRowContext (props) {
      const { dataItems, colums, loadingState, loadingStateText, noDataText } = props
      if (loadingState) {
        return [this.$createElement('tr', {}, [this.genLoaingStateContext(colums.length, loadingStateText)])]
      }
      if (dataItems.length === 0) {
        return [this.$createElement('tr', {}, [this.genNoDataContext(colums.length, noDataText)])]
      }
      return dataItems.map((item, index) => this.$createElement('tr', {
        key: `ROW_${index}`
      }, this.genColContext(colums, item)))
    },
    genColContext (colums, opts) {
      return colums.map((item, index) => this.$createElement('td', {
        staticClass: 'v-text-' + (item.align || 'center'),
        class: {
          'v-editable-wrap': item.editable
        },
        on: {
          click: () => {
            this.handleClick(item.clickable, opts)
          }
        },
        key: `TD_${index}`
      }, [item.slotable && item.slot ? this.genSlotContext(item.slot, { item: opts }) : this.genContentWrap(opts[item.field], item.formator)]))
    },
    genContentWrap (text, formator) {
      let format = formator || function (txt) { return txt };
      return this.$createElement('div', {
        staticClass: 'v-table-cell'
      }, format(text))
    },
    genSlotContext (slot, props) {
      return this.$createElement('div', {
        staticClass: 'v-table-cell'
      }, [this.$scopedSlots[slot] ? this.$scopedSlots[slot](props) : null])
    },
    makeColspan (colums, colgroup) {
      return Math.max(colgroup.reduce((previous, current) => {
        return current.hasOwnProperty('colspan') ? (previous + current.colspan) : (previous + 1)
      }, 0), colums.length)
    },
    genLoaingStateContext (colspan, text) {
      let children = this.$scopedSlots.process ? [this.$scopedSlots.process({ loadingStateText: text })] : [this.genContentWrap(text)]
      const span = Math.max(colspan, this.makeColspan(this.colums, this.colgroup))
      return this.$createElement('td', {
        staticClass: 'v-text-center v-loading-wrap',
        attrs: {
          colspan: span
        }
      }, children)
    },
    genNoDataContext (colspan, text) {
      let children = this.$scopedSlots.empty ? [this.$scopedSlots.empty({ noDataText: text })] : [this.genContentWrap(text)]
      const span = Math.max(colspan, this.makeColspan(this.colums, this.colgroup))
      return this.$createElement('td', {
        staticClass: 'v-text-center v-empty-wrap',
        attrs: {
          colspan: span
        }
      }, children)
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'v-table-body--wrap'
    }, [this.genWrapContext()])
  }
})