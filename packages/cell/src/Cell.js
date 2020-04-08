export default {
  name: 'mx-cell',
  props: {
    arrow: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'row',
      validator (v) {
        return ['row', 'column'].indexOf(v) > -1
      }
    },
    align: {
      type: String,
      default: 'start',
      validator(v){
        return ['start','end','center','baseline','stretch'].indexOf(v)>-1
      }
    },
    justify:{
      type:String,
      default:'start',
      validator(v){
        return ['start','end','center','between','around'].indexOf(v)>-1
      }
    }
  },
  methods: {
    genCellContext () {
      return this.$createElement('div', {
        staticClass: 'mux-cell-container',
        class: ['mux-cell-' + this.direction, 'mux-cell-item-' + this.align,'mux-cell-content-'+this.justify]
      }, this.$slots.default)
    },
    genArrowContext () {
      return this.$createElement('div', {
        staticClass: 'mux-cell-arrow',
        class: {
          'mux-cell-caret': !this.$scopedSlots.icon
        }
      }, [this.$scopedSlots.icon ? this.$scopedSlots.icon() : null])
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'component mux-cell'
    }, [this.genCellContext(), this.genArrowContext()])
  }
}