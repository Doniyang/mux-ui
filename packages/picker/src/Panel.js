import { IRoll } from "@niyang-es/iroll";
export default {
  name:'Panel',
  props:{
    dataItems:{
      type:Array,
      default:()=>[]
    },
    level:{
      type:Number,
      default:0
    }
  },
  data(){
    return {
      roll:null,
      selectionIndex: 0
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
        this.selectionIndex = Math.round (absY / 44);
        this.roll.scrollToElement('.mux-picker-roll-item[aria-current="'+this.selectionIndex+'"]',300)   
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
        },this.dataItems.map(data=>this.genPanelScrollItemContext(data))) 
     },
     genPanelScrollItemContext(data){
      return this.$createElement('li',{
        staticClass:'mux-picker-roll-item'
      },data.label)
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