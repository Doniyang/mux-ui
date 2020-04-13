export default{
	name:'v-switch',
	props:{
		onValue:{
			type:[String,Boolean,Number],
			default:true
		},
		offValue:{
			type:[String,Boolean,Number],
			default:false
		},
		disabled:{
			type:Boolean,
			default:false
		},
		readonly:{
			type:Boolean,
			default:false
		},
		value:{
			type:[String,Number,Boolean],
			default:true
		}
	},
    methods:{
        genInputContext(){
        	return this.$createElement('input',{
        		attrs:{
        			type:'checkbox'
        		}
        	})
        }
    },
	render(h){
		return h('label',{
			staticClass:"component mux-switch",
			class:{
				'mux-switch--is-actived':this.value===this.onValue
			},
			attrs:{
				role:'switch'
			}
		})
	}
}