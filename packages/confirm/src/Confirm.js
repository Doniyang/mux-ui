import Dialog from "../../dialog"
import Button from '../../button'
export default {
  name:'v-confirm',
  props:{
    title: {
      type: String,
      default:'提示'
    },
    value:{
      type:Boolean,
      default:false
    },
    zIndex: {
      type: Number,
      default: 2020
    },
    transition: {
      type: String,
      default: 'mux-bounce'
    },
    message:{
      type:String,
      default:''
    },
    cancelBtnText:{
      type:String,
      default:'取消'
    },
    confirmBtnText:{
      type:String,
      default:'确定'
    }
  },
  methods:{
    genMsgContext(){
      return this.$createElement('p',{
        staticClass:'mux-confirm-content'
      },this.message)
    },
    genConfirmBtnContext(){
     return [this.genBtnareaContext('default','cancel',this.cancelBtnText),this.genDividerContext(),this.genBtnareaContext('primary','confirm',this.confirmBtnText)]
    },
    genDividerContext(){
      return this.$createElement('div',{
        staticClass:'mux-confirm-divider'
      })  
    },
    genBtnareaContext(color,type,text){
      return this.$createElement('div',{
        staticClass:'mux-confirm-'+type   
      },[this.genBtnContext(color,type,text)]) 
    },
    genBtnContext(color,type,text){
      return this.$createElement(Button,{
        props:{
          color:color,
          block:true,
          plain:true
        },
        on:{
          click:e=>{
            e.stopPropagation()
            this.$emit(type)
            this.$refs.Confirm.close()
            this.$emit('input',false)
          }
        }
      },text)  
    }
  },
  render(h){
    return h(Dialog,{
      staticClass:'component mux-confirm',
      props:{
        title: this.title,
        zIndex: this.zIndex,
        value:this.value,
        transition: this.transition,
        closeOnMaskClick:true
      },
      scopedSlots:{
        footer:()=>this.genConfirmBtnContext(),
        default:()=>this.genMsgContext()
      },
      ref:'Confirm',
      on:{
        input:v=>{this.$emit('input',v)}
      }
    })
  }
}