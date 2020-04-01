export default {
	name:'mx-cell',
	props:{

	},
	methods:{
        genCellContext(){

        },
        genArrowContext(){
        	
        }  
	},
	render(h){
       return h('div',{
       	staticClass:'component mux-cell-wrap'
       },[this.genCellContext(),this.genArrowContext()])
	}
}