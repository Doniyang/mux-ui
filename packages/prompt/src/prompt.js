import Vue from 'vue'
import Prompt from './Prompt.vue'
const PromptConstructor = Vue.extend(Prompt)
export default function (options) {
  const initInstance = (data) => new PromptConstructor({
    el: document.createElement('div'),
    propsData: data
  })
  const defaults = {
    title: '提示',
    placeHolder: '请输入',
    inputType: 'text',
    validate: (val) => val.trim() === '',
    closeOnClickModal: false
  }
  return new Promise((resolve, reject) => {
    const defaultCallBack = (action, value) => {
      action === 'prompt' ? resolve(value) : reject(action)
    }
    const vm = initInstance(Object.assign({}, defaults, options))
    vm.callBack = defaultCallBack
    if (!vm.visible) {
      document.body.appendChild(vm.$el)
      vm.$nextTick(() => {
         vm.visible = true
      })
    }
  })
}
