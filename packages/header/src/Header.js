export default {
  name: 'v-header',
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    back: {
      type: [Object, Boolean],
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    more: {
      type: [Boolean, Object],
      default: false
    }
  },
  methods: {
    handleClick (e) {
      e.stopPropagation()
      const backOpts = Object.assign({}, { preventDefault: false }, this.back)
      backOpts.preventDefault ? this.$emit('backClick', e) : (this.$router && this.$router.back())
    },
    genWrapContext () {
      return this.$createElement('div', {
        staticClass: 'mux-header-wrap',
        class: {
          'mux-header-wrap--is-fixed': this.fixed
        }
      }, [this.back ? this.genBackContext() : null, this.genTitleWrapContext(), this.more ? this.genMoreContext() : null])
    },
    genBackContext () {
      return this.$createElement('div', {
        staticClass: 'mux-header-back',
        on: {
          click: e => { this.handleClick(e) }
        }
      }, [this.genBackSlotContext()])
    },
    genBackSlotContext () {
      return this.$scopedSlots.back ? this.$scopedSlots.back() : this.$createElement('span', {
        staticClass: 'mux-header-back-box'
      }, [this.genBackIconContext(), this.genBackTxtContext()])
    },
    genBackIconContext () {
      return this.$scopedSlots.backicon ? this.$scopedSlots.backicon() : this.$createElement('span', {
        staticClass: 'mux-header-back-icon'
      })
    },
    genBackTxtContext () {
      const backTxt = Object.assign({}, { text: '' }, this.back)
      return this.$scopedSlots.backtext ? this.$scopedSlots.backtext() : this.$createElement('span', {
        staticClass: 'mux-header-back-text'
      }, backTxt.text)
    },
    genTitleWrapContext () {
      return this.$createElement('div', {
        staticClass: 'mux-header-main'
      }, [this.genTitleContext()])
    },
    genTitleContext () {
      return this.$scopedSlots.title ? this.$scopedSlots.title() : this.$createElement('h4', {
        staticClass: 'mux-header-title'
      }, this.title)
    },
    genMoreContext () {
      return this.$createElement('div', {
        staticClass: 'mux-header-more',
        on: {
          click: e => { this.$emit('moreClick', e) }
        }
      }, [this.genMoreSlotContext()])
    },
    genMoreSlotContext () {
      const moreTxt = Object.assign({}, { text: '' }, this.more)
      return this.$scopedSlots.more ? this.$scopedSlots.more() : this.$createElement('span', {
        staticClass: 'mux-header-more-text'
      }, moreTxt.text)
    }
  },
  render (h) {
    return h('header', {
      staticClass: 'component mux-header',
      class: { 'mux-header--is-fixed': this.fixed }
    }, [this.genWrapContext()])
  }
}