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
      roll:null
    }
  },
  mounted(){
     this.roll = new IRoll(this.$el.firstElementChild, {})      
  },
  methods:{
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