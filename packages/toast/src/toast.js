import Vue from 'vue'
import ToastComponent from './Toast.vue'
export default class Toast {
  constructor (opttions = {}) {
    this.initToastComponent(opttions)
  }
  initToastComponent (opttions) {
    const ToastConstructor = Vue.extend(ToastComponent)
    const data = {
      text: opttions.text || '',
      visible: opttions.visible || false
    }
    const duration = opttions.timeout || 3000
    let vm = new ToastConstructor({
      el: document.createElement('div'),
      propsData: data
    })
    document.body.appendChild(vm.$el)
    vm.$nextTick(() => {
      vm.visible = true
      setTimeout(() => {
        vm.visible = false
        document.body.removeChild(vm.$el)
      }, duration)
    })
  }
}
