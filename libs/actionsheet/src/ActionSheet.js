"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _matte = _interopRequireDefault(require("../../matte"));

var _button = _interopRequireDefault(require("../../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default2 = {
  name: 'v-actionsheet',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    value: {
      type: Boolean,
      default: false
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

  data() {
    return {
      nextZIndex: 2021
    };
  },

  methods: {
    genContext() {
      return this.$createElement('div', {
        staticClass: 'component mux-actionsheet',
        style: {
          zIndex: this.nextZIndex
        }
      }, [this.genWrapContext(), this.genMatteContext()]);
    },

    genMatteContext() {
      return this.$createElement(_matte.default, {
        props: {
          zIndex: this.zIndex,
          closeOnMaskClick: this.closeOnMaskClick
        },
        ref: 'Mask',
        on: {
          layerChange: zIndex => this.nextZIndex = zIndex,
          matteClick: e => {
            e.stopPropagation();
            this.$emit('input', false);
          }
        }
      });
    },

    genWrapContext() {
      return this.$createElement('ul', {
        staticClass: 'mux-actionsheet--wrap'
      }, [this.genItemContext(), this.cancel ? this.genCancelContext() : null]);
    },

    genItemContext() {
      return this.items.map((item, index) => {
        return this.$createElement('li', {
          staticClass: 'mux-actionsheet-item',
          key: "actionsheet".concat(index)
        }, item.name || item);
      });
    },

    genCancelContext() {
      return this.$createElement('li', {
        staticClass: 'mux-actionsheet-btn'
      }, [this.genButtonContext()]);
    },

    genButtonContext() {
      return this.$createElement(_button.default, {
        props: {
          block: true
        },
        on: {
          click: e => {
            e.stopPropagation();
            this.$refs.Mask.close();
            this.$emit('input', false);
          }
        }
      }, this.cancel.text || '取消');
    }

  },

  render(h) {
    return h('transition', {
      props: {
        name: this.transition
      }
    }, [this.value ? this.genContext() : null]);
  }

};
exports.default = _default2;