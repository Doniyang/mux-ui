import Vue from 'vue'
import Manager from './manager.js'
import Mask from './mask.js'
let idSeed = 1
const MaskConstructor = Vue.extend(Mask)
const createInstance = (options) => {
  return new MaskConstructor({
    el: document.createElement('div'),
    propsData: options
  })
}
const maskManager = new Manager()
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 2018
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      maskId: 'MASK-1',
      opening: false,
      closing: false
    }
  },
  created () {
    const maskID = 'MASK-' + (idSeed++)
    const vm = createInstance({ zIndex: this.zIndex - 1 })
    this.maskId = maskID
    maskManager.register(maskID, vm)
  },
  beforeMount () {
    const vm = maskManager.getInstance(this.maskId)
    if (vm) {
      vm.open()
    }
  },
  mounted () {
    let self = this
    const vm = maskManager.getInstance(this.maskId)
    vm.$on('click', self.onClickModal)
  },
  destroyed () {
    const vm = maskManager.getInstance(this.maskId)
    if (vm) {
      vm.close()
    }
    maskManager.deregister(this.maskId)
  },
  watch: {
    value (nv, ov) {
      if (nv === ov) { return }
      if (nv) {
        this.willOpen()
      } else {
        this.willClose()
      }
    }
  },
  methods: {
    onClickModal () {
      if (this.closeOnClickModal) {
        this.value = false
      }
    },
    willOpen () {
      this.closing = false
      if (!this.opening) {
        this.openModal()
      }
    },
    willClose () {
      this.opening = false
      if (!this.closing) {
        this.closeModal()
      }
    },
    openModal () {
      this.opening = true
      maskManager.createModal(this.maskId)
    },
    closeModal () {
      this.closing = false
      maskManager.removeModal(this.maskId)
    }
  }
}
