import Matte from '../../matte'
import Button from '../../button'
export default {
  name: 'v-actionsheet',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    cancel: {
      type: [Boolean, Object],
      default: false
    },
    zIndex: {
      type: Number,
      default: 2020
    },
    closeOnMaskClick: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      nextZIndex: 2021,
      visible: true
    }
  },
  methods: {
    genContext () {
      return this.$createElement('div', {
        staticClass: 'component mux-actionsheet',
        style: {
          zIndex: this.nextZIndex
        }
      }, [this.genWrapContext(), this.genMatteContext()])
    },
    genMatteContext () {
      return this.$createElement(Matte, {
        props: {
          zIndex: this.zIndex,
          closeOnMaskClick: this.closeOnMaskClick
        },
        on: {
          layerChange: zIndex => this.nextZIndex = zIndex,
          matteClick: e => {
            e.stopPropagation()
            this.visible = false
          }
        }
      })
    },
    genWrapContext () {
      return this.$createElement('ul', {
        staticClass: 'mux-actionsheet--wrap',
      }, [this.genItemContext(), this.cancel ? this.genCancelContext() : null])
    },
    genItemContext () {
      return this.items.map((item, index) => {
        return this.$createElement('li', {
          staticClass: 'mux-actionsheet-item',
          key: `actionsheet${index}`
        }, item.name || item)
      })
    },
    genCancelContext () {
      return this.$createElement('li', {
        staticClass: 'mux-actionsheet-btn'
      }, [this.genButtonContext()])
    },
    genButtonContext () {
      return this.$createElement(Button, {
        props: {
          block: true
        },
        on: {
          click: e => {
            e.stopPropagation()
            this.visible = false
          }
        }
      }, this.cancel.text || '取消')
    }
  },
  render (h) {
    return h('transition', {
      props: {
        name: this.transition
      }
    }, [this.visible ? this.genContext() : null])
  }
}