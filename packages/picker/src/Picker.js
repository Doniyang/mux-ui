import Button from '../../button'
import Panel from './Panel'
import Overlay from '../../overlay'
export default {
  name: 'mux-picker',
  props:{
    value:{
      type:Array,
      default:()=>[]
    },
    title:{
      type:String,
      default:''
    },
    columns:{
      type:Array,
      default:()=>[]
    },
    alias:{
      type:Object,
      default:()=>({key:'key',value:'value'})
    }
  },
  data(){
    return {
      isVisible:false,
      selection:[],
      storage:[],
      nextZIndex:1
    }
  },
  beforeMount(){
    this.updateStorage(this.columns)
    this.updateSelection(this.value)
  },
  beforeDestroy(){
    this.selection = []
    this.storage = []
  },
  watch:{
    columns:{
      handler(val){this.updateStorage(val)},
      deep:true
    },
    value:{
      handler(val){this.updateSelection(val)},
      deep:true
    }
  },
  methods:{
    updateState(isVisible){
      this.isVisible = isVisible
    },
    updateStorage(columns){
      //colums中所有的项都不是数组->单选
      if(columns.every(cols=> Array.isArray(cols) === false)){
        this.storage = [columns]
      } 
      //colums中所有的项都是数组->练级选择
      else if(columns.every(cols=> Array.isArray(cols))){
         this.storage = columns.slice(0) 
      }  
      else{
        throw new Error('colums is Array with same item.'); 
      }  
    },
    close(){
       this.$refs.PickerMask.close() 
    },
    handleClick(e,evt){
      e.stopPropagation()
      this.updateState(false)
      this.close()
      if(evt==='change'){
        this.$emit(evt, this.getIndexArrayOfSelection())
      } else{
        this.$emit(evt) 
      } 
    },
    updateSelection(selection){
       this.selection = selection
    },
    getIndexArrayOfSelection(){
       return [this.selection,Array.from({length:this.storage.length},()=>0)].flat().slice(0,this.storage.length) 
    },
    genOverlayContext () {
      return this.$createElement(Overlay, {
        props: {
          zIndex: 2023,
          closeOnMaskClick: true
        },
        on: {
          change: zIndex => this.nextZIndex = zIndex,
          close: e => {
            e.stopPropagation()
            this.updateState(false)
          }
        },
        ref:'PickerMask'
      })
    },
    genFieldContext(){
      return this.$createElement('div',{
        staticClass:'mux-picker-field',
        on: {
          click: e => { 
            e.stopPropagation()
            this.updateState(true)
          }
        }
      },[ this.$scopedSlots.default?this.$scopedSlots.default():null])
    },
    genFadeContext(){
      return this.$createElement('transition',{
        props:{
          name:'fade'
        }
     },[this.isVisible?this.genPickerContext():null]) 
    },
    genPickerContext(){
        return this.$createElement('div',{
          style:{zIndex:this.nextZIndex },
          staticClass:'mux-picker-container'
        },[this.genOverlayContext(), this.genPickerHeaderContext(),this.genPickerContentContext()]) 
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
      return this.storage.map((cols,dx)=>this.$createElement(Panel,{
        props:{
          columns: cols,
          colIndex: dx,
          alias:this.alias,
          selectionIndex:this.selection[dx]
        },
        on:{
          columnchange: (rowIndex,colIndex) => {
            let selection = this.getIndexArrayOfSelection()
            selection.splice(colIndex,1,rowIndex)
            this.selection = selection
             this.$emit('change:column',rowIndex,colIndex)
           }
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
       },this.title)    
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
    genButtonContext(text,color,evt){
       return this.$createElement(Button,{
        props:{
          ghost:true,
          size:'small',
          color:color
        },
        on:{ click:(e)=>this.handleClick(e,evt)}
       },text)   
    }
  },
  render(h){
     return h('div',{
      staticClass:'component mux-picker'
     },[this.genFieldContext(),this.genFadeContext()])
  }
}