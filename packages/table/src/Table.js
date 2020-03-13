export default {
  functional:true,
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    useCheckbox:{
      type:Boolean,
      default:true
    }
  },
  render(createElement,context){
    console.log(context)
    return createElement('table',{...context.data},context.children)
  }
}
