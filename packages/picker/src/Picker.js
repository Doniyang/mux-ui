import Button from '../../button'
import Panel from './Panel'
export default {
  name: 'mux-picker',
  props:{
    columns:{
      type:Number,
      default:1
    },
    dataItems:{
      type:Array,
      default:[]
    },
  },
  data(){
    return {
      storage:[]
    }
  },
  beforeMount(){
    this.initStorage(this.dataItems,this.columns)  
  },
  methods:{
    initStorage(ary,len){
      this.storage = Array.from({length:len},(v,k)=>k===0?ary:[])
    },
    updateStorage(ary,start){
      if(start>= this.columns|| this.storage.length<=start){ return false }
      this.storage.splice(start,1,ary)   
    },
    handleClick(e,is){},
    genPickerContext(){
        return this.$createElement('div',{
          staticClass:'component mux-picker'
        },[this.genPickerHeaderContext(),this.genPickerContentContext()]) 
    },
    genPickerHeaderContext(){
       return this.$createElement('header',{
        staticClass:'mux-picker-header'
       },[this.genCancelContext(),this.genTitileContext(),this.genConfirmContext()])   
    },

    genPickerContentContext(){
        return this.$createElement('main',{
          staticClass:'mux-picker-body',
          attrs:{ role:'body' },
          domProps:{ role:'body' }
        },[this.genPickerWrapContext(), this.genMaskContext(), this.genDividerContext()])   
    },
    genPickerWrapContext(){
       return this.$createElement('div',{
        staticClass:'mux-picker-wrap'
       },this.genScrollPanelContext())
    }, 
    genScrollPanelContext(){
      return this.storage.map((ary,dx)=>this.$createElement(Panel,{
        props:{
          dataItems:ary,
          level:dx+1
        }
      }))
    },
    genDividerContext(){
      return this.$createElement('div',{
        staticClass:'mux-picker-divider'
      })
    },
    genMaskContext(){
      return this.$createElement('div',{
        staticClass:'mux-picker-mask'
      })
    }, 
    genTitileContext(){
       return this.$createElement('div',{
        staticClass:'mux-picker-title'
       },'title')    
    },
    genCancelContext(){
      return this.$createElement('div',{
        staticClass:'mux-picker-cancel',
        attrs:{role:'cancel'} 
      },[this.genButtonContext('取消','default','close')])
    },
    genConfirmContext(){
      return this.$createElement('div',{
        staticClass:'mux-picker-confirm',
        attrs:{role:'cancel'} 
      },[this.genButtonContext('确认','primary','change')])
    },
    genButtonContext(text,color,is){
       return this.$createElement(Button,{
        props:{
          ghost:true,
          size:'small',
          color:color
        },
        on:{click:(e)=>this.handleClick(e,is)}
       },text)   
    }
  },
  render(h){
     return h('transition',{
        props:{
          name:'fade'
        }
     },[this.genPickerContext()]) 
  }
}