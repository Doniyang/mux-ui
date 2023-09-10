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
    }
  },
  data(){
    return {
      roll:null,
      rowIndex: 0
    }
  },
  mounted(){
     this.roll = new IRoll(this.$el.firstElementChild, {})
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
        this.rowIndex = Math.round (absY / 44);
        this.roll.scrollToElement('.mux-picker-roll-item[aria-rowindex="'+this.rowIndex+'"]',300)
        this.$emit('columnchange',this.rowIndex,this.colIndex)
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