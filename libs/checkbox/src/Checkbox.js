"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default2 = {
  name: 'v-checkbox',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    name: {
      type: String
    },
    id: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    partial: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    checkboxValue: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      uuid: Math.random().toString(32).substring(4, 9).toUpperCase()
    };
  },

  computed: {
    checkboxId() {
      return this.id || 'CHECKBOX-' + this.uuid;
    },

    isChecked() {
      return this.checked || this.value.indexOf(this.checkboxValue) > -1;
    }

  },
  methods: {
    handleChange(e) {
      var target = e.target || e.srcElement;
      var currentValue = [...this.value];
      this.$emit('change', e);
      target.checked ? currentValue.push(target.value) : currentValue = currentValue.filter(v => v !== target.value);
      this.$emit('input', currentValue);
    },

    genCheckboxWrapContext() {
      return this.$createElement('div', {
        staticClass: 'mux-checkbox-box'
      }, [this.genCheckboxContext()]);
    },

    genCheckboxContext() {
      return this.$createElement('input', {
        staticClass: 'mux-checkbox-block',
        class: {
          'mux-checkbox--is-partial': this.partial,
          'mux-checkbox--is-checked': this.isChecked
        },
        attrs: {
          type: 'checkbox',
          name: this.name,
          id: this.checkboxId,
          checked: this.isChecked,
          disabled: this.disabled
        },
        domProps: {
          value: this.checkboxValue
        },
        on: {
          change: e => {
            this.handleChange(e);
          }
        }
      });
    },

    genCheckboxLabelContext() {
      return this.$createElement('div', {
        staticClass: 'mux-checkbox-label-wrap'
      }, [this.genLabelSlotContext()]);
    },

    genLabelSlotContext() {
      return this.$scopedSlots.label ? this.$scopedSlots.label({
        id: this.checkboxId
      }) : this.$createElement('label', {
        staticClass: 'mux-checkbox-label',
        attrs: {
          for: this.checkboxId
        }
      }, this.label);
    }

  },

  render(h) {
    return h('div', {
      staticClass: 'component mux-checkbox'
    }, [this.genCheckboxWrapContext(), this.genCheckboxLabelContext()]);
  }

};
exports.default = _default2;