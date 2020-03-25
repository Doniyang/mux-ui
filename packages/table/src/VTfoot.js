import Vue from 'vue'

export default Vue.extend({
  name:'VTfoot',
  props:{
    skin:{
      type:String,
      default:''
    },
    role:{
      type:String,
      default:'table'
    }
  },
  methods:{
    genTabeContext(){
      return this.$createElement('table',{
        staticClass:'v-table-wrap',
        attrs:{
          skin:this.skin,
          role:this.role
        }
      },[this.genTFootContext()])
    },
    genTFootContext(){
      return this.$createElement('tfoot',{
      },this.$slots.default)   
    }
  },
  render(h){
    return h('div',{
      staticClass:'v-table-footer--wrap'
    },[this.genTabeContext()])
  }
})