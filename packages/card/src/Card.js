export default {
  name: 'v-card',
  props: {
    header: {
      type: String
    },
    content: {
      type: String,
    },
    footer: {
      type: String
    }
  },
  methods: {
    genContext (tag, children) {
      return this.$createElement(tag, {
        staticClass: 'mux-card-' + tag
      }, children)
    },
    genSlotContext (slot, text) {
      return this.$scopedSlots[slot] ? this.$scopedSlots[slot]() : text
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'component mux-card'
    }, [this.genContext('footer', [this.genSlotContext('header', this.header)]), this.genContext('main', [this.genSlotContext('default', this.content)]), this.genContext('footer', [this.genSlotContext('footer', this.footer)])])
  }
}