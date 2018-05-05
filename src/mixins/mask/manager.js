export default class Mask {
  constructor () {
    this.instance = {}
  }
  register (id, instance) {
    this.instance[id] = instance
  }
  deregister (id) {
    this.instance[id] = null
    delete this.instance[id]
  }
  getInstance (id) {
    return this.instance[id]
  }
  createModal (id) {
    const vm = this.getInstance(id)
    if (vm) {
      document.body.appendChild(vm.$el)
    }
  }
  removeModal (id) {
    const vm = this.getInstance(id)
    if (vm) {
      document.body.removeChild(vm.$el)
    }
  }
}
