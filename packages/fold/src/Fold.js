import Cell from "../../cell/src/Cell"

export default {
  name:'v-fold',
  props:{
    title:{
      type:String,
      default:''
    },
    value:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    genHeaderContext(){
      return this.$createElement(Cell,{
        props:{
          arrow:true
        },
        scopedSlots:{
          icon:()=>this.genIconWrapContext()
        }
      },[this.genTitleWrapContext()])
    },
    genTitleWrapContext(){
      return this.$createElement('div',{
        staticClass:'mux-fold-header',
        on:{
          click:e=>{
            e.stopPropagation();
            this.$emit('input',!this.value)
          }
        }
      },[this.genTitleContext()])
    },
    genTitleContext(){
      return this.$scopedSlots.title?this.$scopedSlots.title():this.$createElement('span',{
        staticClass:'mux-fold-title'
      },this.title)
    },
    genIconWrapContext(){
      return this.$createElement('div',{
        staticClass:'mux-fold-arrow',
        class:{
          'mux-fold-rotate':this.value 
        },
        on:{
          click:e=>{
            e.stopPropagation();
            this.$emit('input',!this.value)
          }
        }  
      },[this.genIconContext()])
    },
    genIconContext(){
      return this.$createElement('i',{
        staticClass:'mux-fold-icon'
      })
    },
    genTransitionContext(){
      return this.$createElement('transition',{
        props:{
        name:'fade'
       }
      },[this.genMainContext()])
    },
    genMainContext(){
     return this.$createElement('main',{
        staticClass:'mux-fold-container',
        directives:[{name:'show',value:this.value}]
      },this.$slots.default)
    }
  }, 
  render(h){
    return h('div',{
      staticClass:'component mux-fold'
    },[this.genHeaderContext(),this.genTransitionContext()])
  }
}