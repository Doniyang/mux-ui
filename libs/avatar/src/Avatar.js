"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
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
    },
    fit: {
      type: String,
      default: 'all',

      validator(v) {
        return ['width', 'height', 'all'].indexOf(v) > -1;
      }

    }
  },

  data() {
    return {
      isPlaceholder: false
    };
  },

  methods: {
    genImageContext() {
      return this.$createElement('img', {
        staticClass: 'mux-avatar-image',
        class: ['mux-avatar--fit-' + this.fit],
        attrs: {
          src: this.src,
          alt: this.alt
        },
        on: {
          error: e => {
            e.stopPropagation();
            this.isPlaceholder = true;
          }
        }
      });
    },

    genPlaceholderContext() {
      return this.$createElement('span', {
        staticClass: 'mux-avatar-placeholder'
      }, this.alt.slice(-2));
    }

  },

  render(h) {
    return h('div', {
      staticClass: 'component mux-avatar',
      class: {
        'mux-avatar-shadow': !this.flat
      },
      style: {
        width: isNaN(this.size) ? this.size : this.size + 'px',
        height: isNaN(this.size) ? this.size : this.size + 'px'
      }
    }, [this.genImageContext(), this.isPlaceholder ? this.genPlaceholderContext() : null]);
  }

};
exports.default = _default;