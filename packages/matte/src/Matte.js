import Maskable from '../../../src/utils/maskable/Maskable'

export default {
  name: 'v-matte',
  props: {
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
      mask: null,
      uuid: null
    }
  },
  created () {
    this.uuid = Math.random().toString(32).substring(6, 16).toUpperCase()
    if (!this.mask) {
      this.mask = new Maskable(this.zIndex)
    }
  },
  mounted () {
    this.mask.register(this.uuid, this)
    this.$nextTick(() => {
      this.mask.open(this.uuid)
    })
  },
  beforeDestroy () {
    this.mask.deregister(this.uuid)
    this.mask = null
  },
  methods: {
    setZIndex (zIndex) {
     this.$emit('layerChange',zIndex)
    },
    handleClick (e) {
      e.stopPropagation()
      if (this.closeOnMaskClick) {
        this.mask.close(this.uuid)
        this.$emit('matteClick', e)
      }
    }
  },
  render (h) {
    return h('div', {
      staticClass: "component mux-matte",
      style: {
        zIndex: this.zIndex
      },
      on: {
        click: e => {
          this.handleClick(e)
        }  
      }
    })
  }
}