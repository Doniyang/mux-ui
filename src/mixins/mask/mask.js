import '@/style/mask.less'
export default {
  props: {
    zIndex: {
      type: Number,
      default: 2017
    }
  },
  render (createElement) {
    return createElement('div', {
      staticClass: 'mux-mask',
      style: {
        zIndex: this.zIndex
      },
      on: {
        click: () => {
          this.$emit('click')
        }
      }
    })
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    open () {
      this.visible = true
    },
    close () {
      this.visible = false
    }
  }
}
