import Vue from 'vue'
import Prompt from './Prompt.vue'
const PromptConstructor = Vue.extend(Prompt)
export default function (options) {
  const initInstance = (data) => ({
    el: document.createElement('div'),
    propsData: data
  })
  const defaults = {
       title:'提示',
       placeHolder:'请输入',
       inputType:'text',
       validate:(val)=>val.trim() ==='',
       closeOnClickModal:false	
  }
}
