"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Cell = _interopRequireDefault(require("../../cell/src/Cell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'v-fold',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    genHeaderContext() {
      return this.$createElement(_Cell.default, {
        props: {
          arrow: true
        },
        scopedSlots: {
          icon: () => this.genIconWrapContext()
        }
      }, [this.genTitleWrapContext()]);
    },

    genTitleWrapContext() {
      return this.$createElement('div', {
        staticClass: 'mux-fold-header',
        on: {
          click: e => {
            e.stopPropagation();
            this.$emit('input', !this.value);
          }
        }
      }, [this.genTitleContext()]);
    },

    genTitleContext() {
      return this.$scopedSlots.title ? this.$scopedSlots.title() : this.$createElement('span', {
        staticClass: 'mux-fold-title'
      }, this.title);
    },

    genIconWrapContext() {
      return this.$createElement('div', {
        staticClass: 'mux-fold-arrow',
        class: {
          'mux-fold-rotate': this.value
        },
        on: {
          click: e => {
            e.stopPropagation();
            this.$emit('input', !this.value);
          }
        }
      }, [this.genIconContext()]);
    },

    genIconContext() {
      return this.$createElement('i', {
        staticClass: 'mux-fold-icon'
      });
    },

    genTransitionContext() {
      return this.$createElement('transition', {
        props: {
          name: 'fade'
        }
      }, [this.genMainContext()]);
    },

    genMainContext() {
      return this.$createElement('main', {
        staticClass: 'mux-fold-container',
        directives: [{
          name: 'show',
          value: this.value
        }]
      }, this.$slots.default);
    }

  },

  render(h) {
    return h('div', {
      staticClass: 'component mux-fold'
    }, [this.genHeaderContext(), this.genTransitionContext()]);
  }

};
exports.default = _default;