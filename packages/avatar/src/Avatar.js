export default {
	name:'v-avatar',
	props:{
       src:{
       	type:String,
       	default:'',
       	required:true
       },
       alt:{
       	type:String,
       	default:'avatar'
       },
       size:{
       	type:[Number,String],
       	default:30
       },
       flat:{
       	type:Boolean,
       	default:false
       }
	},
    data(){
    	return {
    		isPlaceholder:true
    	}
    },
    methods:{
    	genContext(){
    		return [this.genImageContext(),this.isLoadSuccess?:this.genE]
    	}
    },
	render(h){
		return h('div',{

		},[])
	}

}