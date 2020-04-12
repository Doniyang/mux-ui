export default {
	name:'v-radio-group',
	props:{
		block: {
            type: Boolean,
            default: false
        },
        value: String,
        reverse:{
    	    type:Boolean,
    		default:false
    	}
	},
    mounted(){
    	this.$nextTick(()=>{
    		this.updateChildrenNode(this.value)
    	})
    },
    watch:{
    	value:{
    		immediate: true,
    		handler(nv,ov){
    			if(nv!==ov)this.updateChildrenNode(nv)	
    		}
    	}
    },  
    methods:{
        updateChildrenNode(value){
        	if (this.$children.length > 0) {
                this.$children.forEach(vm => { vm.$emit('input',value) })
            }
        } 
    },   
	render(h){
      return h('div',{
      	staticClass:'component mux-radio-group',
      	class:{
      		'mux-radio-group--is-block':this.block,
      		'mux-radio-group--is-reverse':this.reverse
      	}
      },this.$slots.default) 
	}
}