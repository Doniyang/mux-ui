import Vue from 'vue'
import VThead from './VThead'
import VTbody from './VTbody'
import VTfoot from './VTfoot'
import ScrollBar from '../util/ScroolBar'
export default Vue.extend({
  name: 'VTable',
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
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: '数据加载中...'
    },
    noDataText: {
      type: String,
      default: '暂无数据'
    },
    full: {
      type: Boolean,
      default: false
    },
    fixedHeader: {
      type: Boolean,
      default: false
    },
    skin: {
      type: String,
      default: ''
    },
    allowScrollX: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: false
    },
    footerRole: {
      type: String,
      default: 'table'
    }
  },
  data () {
    return {
      scroll: null,
      barwidth: 0,
      posX: 0
    }
  },
  mounted () {
    this.scroll = new ScrollBar(this.$el, '.v-table-container', width => {
      this.barwidth = width
    })
    window.addEventListener('resize', this.handleResize.bind(this), false)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize.bind(this), false)
    if (this.scroll) this.scroll.distory()
    this.scroll = null
  },
  methods: {
    handleResize () {
      if (this.scroll) {
        this.barwidth = this.scroll.getBarWidth()
      } else {
        this.scroll = new ScrollBar(this.$el, '.v-table-container', width => {
          this.barwidth = width
        })
      }
    },
    genHeaderContext () {
      const scopedOpts = {}
      if (this.$scopedSlots.header) {
        scopedOpts.default = props => this.$scopedSlots.header(Object.assign(props, { dataItems: this.dataItems }))
      }
      return this.$createElement(VThead, {
        props: {
          colums: this.colums,
          skin: this.skin,
          colgroup: this.colgroup,
          cellMinWidth: this.cellMinWidth,
          barWidth: this.barwidth,
          scrollPosX: this.posX
        },
        scopedSlots: scopedOpts
      })
    },
    genBodyContext () {
      const scopedOpts = {}
      const slots = [{ scoped: 'process', slot: 'loading' }, { scoped: 'default', slot: 'body' }, { scoped: 'empty', slot: 'noData' }]
      slots.forEach(item => {
        this.genSlotContext(scopedOpts, item.scoped, item.slot)
      })
      this.colgroup.forEach(item => {
        if (item.slotable) {
          this.genSlotContext(scopedOpts, item.slot, item.slot)
        }
      })
      this.colums.forEach(item => {
        if (item.slotable) {
          this.genSlotContext(scopedOpts, item.slot, item.slot)
        }
      })
      return this.$createElement(VTbody, {
        props: {
          colums: this.colums,
          skin: this.skin,
          dataItems: this.dataItems,
          colgroup: this.colgroup,
          cellMinWidth: this.cellMinWidth,
          allowScrollX: this.allowScrollX,
          loadingState: this.loading,
          loadingStateText: this.loadingText,
          noDataText: this.noDataText
        },
        on: {
          scrollPosX: posx => {
            this.posX = posx
          }
        },
        scopedSlots: scopedOpts
      })
    },
    genSlotContext (context, scoped, slot) {
      if (this.$scopedSlots[slot]) {
        context[scoped] = props => this.$scopedSlots[slot](props)
      }
    },
    genFooterContext () {
      if (this.$scopedSlots.footer) {
        return this.$createElement(VTfoot, {
          props: {
            skin: this.skin,
            role: this.footerRole
          }
        }, this.$scopedSlots.footer({
          colums: this.colums,
          dataItems: this.dataItems
        })
        )
      } else {
        return null
      }
    }
  },
  render (h) {
    return h(
      'div',
      {
        staticClass: 'components table v-table-wrap',
        class: {
          'v-table-full--wrap': this.full,
          'v-table-fixed-header': this.fixedHeader,
          'v-table-scroll-cross': this.allowScrollX,
          'v-table--is-stripe': this.stripe
        }
      },
      [this.genHeaderContext(), this.genBodyContext(), this.genFooterContext()]
    )
  }
})
