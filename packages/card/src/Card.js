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
    genHeaderContext () {
      return this.$createElement('header', {
        staticClass: 'mux-card-header'
      }, [this.genSlotContext('header', this.header)])
    },
    genMainContext () {
      return this.$createElement('main', {
        staticClass: 'mux-card-main'
      }, [this.genSlotContext('default', this.content)])
    },
    genFooterContext () {
      return this.$createElement('footer', {
        staticClass: 'mux-card-footer'
      }, [this.genSlotContext('footer', this.footer)])
    },
    genSlotContext (slot, text) {
      return this.$scopedSlots[slot] ? this.$scopedSlots[slot]() : text
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'component mux-card'
    }, [this.genHeaderContext(), this.genMainContext(), this.genFooterContext()])
  }
}