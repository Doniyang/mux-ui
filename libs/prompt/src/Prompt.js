"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dialog = _interopRequireDefault(require("../../dialog"));

var _button = _interopRequireDefault(require("../../button"));

var _Field = _interopRequireDefault(require("../../field/src/Field"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default2 = {
  name: 'v-confirm',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    type: {
      type: String,
      default: 'text'
    },
    rules: {
      type: Array,
      default: () => []
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
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    }
  },

  data() {
    return {
      formvalue: '',
      formvalid: false,
      formmsg: ''
    };
  },

  methods: {
    handleClick(type) {
      type === 'cancel' ? this.handleCancelClick() : this.handleConfirmClick();
    },

    handleConfirmClick() {
      var result = this.rules.map(fn => fn(this.formvalue));
      this.formmsg = result.find(item => typeof item === 'string');
      this.formvalid = result.some(item => item === true);

      if (!this.formvalid) {
        this.$emit('confirm');
        this.$refs.Confirm.close();
        this.$emit('input', false);
      }
    },

    handleCancelClick() {
      this.$emit('cancel');
      this.$refs.Confirm.close();
      this.$emit('input', false);
    },

    genFieldContext() {
      return this.$createElement(_Field.default, {
        props: {
          type: this.type,
          value: this.formvalue,
          plain: true,
          rounded: true,
          invalid: this.formvalid,
          message: this.formmsg
        },
        on: {
          input: v => {
            this.formvalue = v;
          }
        }
      });
    },

    genPrompBtnContext() {
      return [this.genBtnareaContext('default', 'cancel', this.cancelBtnText), this.genDividerContext(), this.genBtnareaContext('primary', 'confirm', this.confirmBtnText)];
    },

    genDividerContext() {
      return this.$createElement('div', {
        staticClass: 'mux-prompt-divider'
      });
    },

    genBtnareaContext(color, type, text) {
      return this.$createElement('div', {
        staticClass: 'mux-prompt-' + type
      }, [this.genBtnContext(color, type, text)]);
    },

    genBtnContext(color, type, text) {
      return this.$createElement(_button.default, {
        props: {
          color: color,
          block: true,
          plain: true
        },
        on: {
          click: e => {
            e.stopPropagation();
            this.handleClick(type);
          }
        }
      }, text);
    }

  },

  render(h) {
    return h(_dialog.default, {
      staticClass: 'component mux-prompt',
      props: {
        title: this.title,
        zIndex: this.zIndex,
        value: this.value,
        transition: this.transition,
        closeOnMaskClick: true
      },
      scopedSlots: {
        footer: () => this.genPrompBtnContext(),
        default: () => this.genFieldContext()
      },
      ref: 'Confirm',
      on: {
        input: v => {
          this.$emit('input', v);
        }
      }
    });
  }

};
exports.default = _default2;