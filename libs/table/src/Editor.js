"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default2 = {
  name: 'v-editor',
  props: {
    position: {
      type: String,
      default: 'center',

      validator(v) {
        return ['left', 'center', 'right'].indexOf(v) > -1;
      }

    },
    value: {
      type: [Array, Object],
      default: () => []
    },
    fieldKey: {
      type: [Number, String]
    }
  },

  data() {
    return {
      edit: ''
    };
  },

  beforeMount() {
    this.edit = this.value[this.fieldKey];
  },

  watch: {
    value: {
      handler(val) {
        this.edit = val[this.fieldKey];
      },

      deep: true,
      immediate: false
    }
  },
  methods: {
    handleInput(e) {
      var target = e.currentTarget || e.target || e.srcElement;
      this.edit = target.value;
    },

    handleClick(e, isCommit) {
      e.stopPropagation();

      if (isCommit) {
        this.$emit('commit', {
          data: this.value,
          key: this.fieldKey,
          value: this.edit
        });
      }

      this.$emit('close', {
        target: this.$el,
        value: this.edit,
        commit: isCommit
      });
    },

    genEditorContext() {
      return this.$createElement('div', {
        staticClass: 'h-box item-align-center'
      }, [this.genInputContext(), this.genBtnContext(true, 'primary', 'check'), this.genBtnContext(false, 'error', 'close')]);
    },

    genInputContext() {
      return this.$createElement('input', {
        staticClass: 'editor-field',
        domProps: {
          value: this.edit
        },
        on: {
          input: e => {
            this.handleInput(e);
          },
          change: e => {
            this.handleInput(e);
          }
        }
      });
    },

    genBtnContext(env, color, icon) {
      return this.$createElement('a-button', {
        class: {
          'mx-2': env
        },
        props: {
          ghost: true,
          size: 'small',
          type: color
        },
        on: {
          click: e => {
            this.handleClick(e, env);
          }
        }
      }, [this.genIconContext(icon)]);
    },

    genIconContext(icon) {
      return this.$createElement('a-icon', {
        type: icon
      }, null);
    }

  },

  render(h) {
    return h('div', {
      staticClass: 'component mux-editor',
      class: ['mux-editor--is-' + this.position],
      domProps: {
        ariaLabel: this.edit
      }
    }, [this.genEditorContext()]);
  }

};
exports.default = _default2;