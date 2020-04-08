export default {
  name: 'v-avatar',
  props: {
    src: {
      type: String,
      default: '',
      required: true
    },
    alt: {
      type: String,
      default: 'avatar'
    },
    size: {
      type: [Number, String],
      default: 30
    },
    flat: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isPlaceholder: true
    }
  },
  methods: {
    genImageContext () {
      return this.$createElement('img', {
        staticClass: 'mux-avatar-image',
        attrs: {
          src: this.src,
          alt: this.alt
        },
        on: {
          error: e => {
            e.stopPropagation()
            this.isPlaceholder = true
          }
        }
      })
    },
    genPlaceholderContext () {
      return this.$createElement('span',{
        staticClass:'mux-avatar-placeholder'
      },this.alt.slice(-2)) 
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'component mux-avtar',
      class: {
        'mux-avatar-shadow': !this.flat
      },
      style: {
        width: isNaN(this.size) ? this.size : (this.size + 'px'),
        height: isNaN(this.size) ? this.size : (this.size + 'px')
      }
    }, [this.genImageContext(), this.isPlaceholder ? this.genPlaceholderContext() : null])
  }

}