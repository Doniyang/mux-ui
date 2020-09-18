"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _matte = _interopRequireDefault(require("../../matte"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  props: {
    title: {
      type: String
    },
    value: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 2020
    },
    transition: {
      type: String,
      default: 'mux-bounce'
    },
    closeOnMaskClick: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      nextZIndex: 1
    };
  },

  methods: {
    close() {
      this.$refs.DialogMask.close();
    },

    genWrapContext() {
      return this.$createElement('div', {
        staticClass: 'component mux-dialog',
        style: {
          zIndex: this.nextZIndex
        }
      }, [this.genMatteContext(), this.genContext('header', [this.genTitleContext()]), this.genContext('main', [this.genSlotContext('default', '')]), this.genContext('footer', [this.genSlotContext('footer', '')])]);
    },

    genMatteContext() {
      return this.$createElement(_matte.default, {
        props: {
          zIndex: this.zIndex,
          closeOnMaskClick: this.closeOnMaskClick
        },
        on: {
          layerChange: zIndex => this.nextZIndex = zIndex,
          matteClick: e => {
            e.stopPropagation();
            this.$emit('input', false);
          }
        },
        ref: 'DialogMask'
      });
    },

    genContext(tag, children) {
      return this.$createElement(tag, {
        staticClass: 'mux-dialog-' + tag
      }, children);
    },

    genTitleContext() {
      return this.$createElement('h4', {
        staticClass: 'mux-dialog-title'
      }, [this.genSlotContext('title', this.title)]);
    },

    genSlotContext(slot, text) {
      return this.$scopedSlots[slot] ? this.$scopedSlots[slot]() : this.$createElement('span', {}, text);
    }

  },

  render(h) {
    return h('transition', {
      props: {
        name: this.transition
      }
    }, [this.value ? this.genWrapContext() : null]);
  }

};
exports.default = _default;