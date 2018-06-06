import Vue from 'vue'
import AlertComponent from './Alert.vue'

export default function (options) {
  const AlertConstructor = Vue.extend(AlertComponent)
  const initInstance = (data) => {
    return new AlertConstructor({
      el: document.createElement('div'),
      propsData: data
    })
  }
  const defaults = {
    closeOnClickModal: false
  }
  return new Promise((resolve, reject) => {
    const vm = initInstance(Object.assign({},defaults,options))
    const defaultCallBack = (action) => {
      resolve(action)
    }
    vm.callBack = defaultCallBack
    if (!vm.visible) {
      document.body.appendChild(vm.$el)
      vm.$nextTick(() => {
        vm.visible = true
      })
    }
  })
}
