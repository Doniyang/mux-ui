export default {
	name:'v-checkbox',
	props:{
		value:{
			type:Array,
			default:()=>[]
		},
		name:{
			type:String,
			required:true
		},
		id:{
			type:String,
			default:''
		},
		checked: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
         },
         label:{
         	type:String,
         	default:''
         },
         checkboxValue:{
         	type:String,
         	default:''
         }
	},
    methods:{
       genCheckboxWrapContext(){
             return this.$createElement('div',{
             	staticClass:'mux-checkbox-box'
             },[this.genCheckboxContext()])
       },
       genCheckboxContext(){
          return this.$createElement('input',{
          	staticClass:'mux-checkbox-block',
          	attrs:{
          		type:'checkbox',
          		name:this.name,
          		id:this.checkboxId,
          		checked:this.checked,
          		disabled:this.disabled
          	},
          	domProps:{
          		value:this.checkboxValue
          	}
          })
       },
       genCheckboxLabelContext(){
          return this.$createElement('div',{
          	staticClass:'mux-checkbox-label-wrap'
          },[this.genLabelSlotContext()]) 
       },
       genLabelSlotContext(){
          return this.$scopedSlots.label?this.$scopedSlots.label():this.$createElement('label',{
             	staticClass:'mux-checkbox-label',
               attrs:{
                 for:this.radioId
               }
             },this.label)  
       }
    },  
    render(h){
    	return h('div',{
    		staticClass:'component mux-checkbox'
    	},[this.genCheckboxWrapContext(),this.genCheckboxLabelContext()])
    } 
}