import Vue from 'vue'
import LoadingComponent from './Loading.vue'
export default class Loading {
  constructor (opttions = {}) {
    this.instance = null
    this.initIntance(opttions)
  }
  initIntance (opttions) {
    const LoadingConstructor = Vue.extend(LoadingComponent)
    const data = {
      text: opttions.text || '加载中...',
      visible: opttions.visible || false
    }
    this.instance = new LoadingConstructor({
      el: document.createElement('div'),
      propsData: data
    })
  }
  show () {
    const vm = this.instance
    document.body.appendChild(vm.$el)
    vm.$nextTick(() => {
      vm.show()
    })
  }
  close () {
    const vm = this.instance
    vm.close()
    document.body.removeChild(vm.$el)
  }
}
