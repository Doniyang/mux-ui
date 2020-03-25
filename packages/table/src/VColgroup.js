import Vue from 'vue'
export default Vue.extend({
  name: 'VColgroup',
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
      type: Number
    },
    gutter:{
      type:Boolean,
      default:false
    },
    barWidth:{
      type:Number,
      default:0
    }
  },
  methods: {
    genColContext () {
      return this.colgroup.length > 0 ? this.genColgroupContext() : this.genColumsContext()
    },
    genColgroupContext () {
      let colgroup = this.colgroup.reduce((previous, current) => {
        current.hasOwnProperty('colspan')?Array.prototype.push.apply(previous,Array.from({ length: current.colspan }, item => ({ width: current.width }))):previous.push(current)
        return previous
      }, [])
      return colgroup.map((it, index, ary) => {
        let wid = Math.max(10, 100 / ary.length)
        return this.$createElement('col', {
          attrs: {
            name: 'g-col-' + index,
            align: 'center',
            width: it.width ? it.width : (wid + '%')
          }
        })
      })
    },
    genColumsContext () {
      return this.colums.map((item, index) => {
        return this.$createElement('col', {
          attrs: {
            name: 'g-col-' + index,
            align: item.align || 'center',
            width: item.width || this.cellMinWidth
          }
        })
      })
    },
    genBarContext(){
      return this.$createElement('col',{
        attrs:{
          name:'gutter',
          width:this.barWidth
        }
      })
    }
  },
  render (h) {
    return h('colgroup', {}, [...this.genColContext(),this.gutter&&this.barWidth>0?this.genBarContext():null])
  }
})