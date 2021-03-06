"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dialog = _interopRequireDefault(require("../../dialog"));

var _button = _interopRequireDefault(require("../../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default2 = {
  name: 'v-alert',
  props: {
    title: {
      type: String,
      default: '提示'
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
    message: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: '确定'
    }
  },
  methods: {
    genMsgContext() {
      return this.$createElement('p', {
        staticClass: 'mux-alert-content'
      }, this.message);
    },

    genAlertBtnContext() {
      return this.$createElement('div', {
        staticClass: 'mux-alert-btnarea'
      }, [this.genBtnContext()]);
    },

    genBtnContext() {
      return this.$createElement(_button.default, {
        props: {
          block: true,
          plain: false
        },
        on: {
          click: e => {
            e.stopPropagation();
            this.$emit('confirm');
            this.$refs.Alert.close();
            this.$emit('input', false);
          }
        }
      }, this.btnText);
    }

  },

  render(h) {
    return h(_dialog.default, {
      staticClass: 'component mux-alert',
      props: {
        title: this.title,
        zIndex: this.zIndex,
        value: this.value,
        transition: this.transition,
        closeOnMaskClick: false
      },
      scopedSlots: {
        footer: () => this.genAlertBtnContext(),
        default: () => this.genMsgContext()
      },
      ref: 'Alert',
      on: {
        input: v => {
          this.$emit('input', v);
        }
      }
    });
  }

};
exports.default = _default2;