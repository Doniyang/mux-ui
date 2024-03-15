import { IRoll } from "@niyang-es/iroll";
export default {
  name:'Panel',
  props:{
    columns:{
      type:Array,
      default:()=>[]
    },
    colIndex:{
      type:Number,
      default:0
    },
    alias:{
      type:Object,
      default:()=>({key:'key',value:'value'})
    },
    selectionIndex:{
      type:Number,
      default:0
    }
  },
  data(){
    return {
      roll:null
    }
  },
  mounted(){
     this.roll = new IRoll(this.$el.firstElementChild, {})
     this.scrollTo(this.selectionIndex)
     this.roll.on("scroll:end",this.onScrollStop)
  },
  beforeDestroy(){
     this.roll.off("scroll:end",this.onScrollStop)
     this.roll.destory()
     this.roll = null
  },
  methods:{
     onScrollStop(e,pos){
        let absY = Math.abs(pos.y)
        let rowIndex = Math.round (absY / 44);
        this.scrollTo(rowIndex)
        this.$emit('columnchange',rowIndex,this.colIndex)
     },
     scrollTo(rowIndex){
        this.roll.scrollTo(0, rowIndex * 44 * -1,300)  
     },
     genPanelContext(){
       return this.$createElement('div',{
          staticClass:'mux-picker-panel-wrap'
       },[this.genPanelScrollContext()])
     },
     genPanelScrollContext(){
        return this.$createElement('ul',{
          staticClass:'mux-picker-roll',
          attrs:{ role: 'roll' },
          domProps: { role: 'roll' },                   
        },this.columns.map((col,index)=>this.genPanelScrollItemContext(col,index))) 
     },
     genPanelScrollItemContext(column,rowIndex){
      return this.$createElement('li',{
        staticClass:'mux-picker-roll-item',
        domProps:{ ariaRowIndex:  rowIndex, ariaColIndex: this.colIndex }
      },this.updatePanelScrollContent(column))
     },
     updatePanelScrollContent(data){
        return data[this.alias.value]?data[this.alias.value] : data
     }
  },
  render(h){
     return h('div',{
      staticClass:'mux-picker-panel',
      attrs:{role:'panel'},
      domProps:{role:'panel'}
     },[this.genPanelContext()])  
  }
}