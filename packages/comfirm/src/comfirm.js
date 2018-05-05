import Vue from 'vue'
import Comfirm from './Comfirm.vue'
export default function (options) {
  const ComfirmConstructor = Vue.extend(Comfirm)
  const initInstance = (data) => {
    return new ComfirmConstructor({
      el: document.createElement('div'),
      propsData: data
    })
  }
  const defaults = {
    closeOnClickModal: true
  }
  return new Promise((resolve, reject) => {
    const defaultCallBack = action => {
      action === 'comfirm' ? resolve(action) : reject(action)
    }
    const vm = initInstance(Object.assign({}, defaults, options))
    vm.callBack = defaultCallBack
    if (!vm.value) {
      document.body.appendChild(vm.$el)
      Vue.nextTick(() => {
        vm.value = true
      })
    }
  })
}
