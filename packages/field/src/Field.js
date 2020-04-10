export default {
  name: 'v-field',
  props: {
    type: {
      type: String,
      default: 'text',
      validator (v) {
        return ['email', 'number', 'password', 'search', 'tel', 'text', 'url'].indexOf(v) > -1
      }
    },
    attrs: Object,
    required: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'XFeild'
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    labelClass: {
      type: [String, Array],
      default: () => []
    },
    align: {
      type: String,
      default: 'left',
      validator (v) {
        return ['left', 'center', 'right'].indexOf(v) > -1
      }
    },
    plain: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    invalid: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      uuid: Math.random().toString(32).substring(4, 9).toUpperCase()
    }
  },
  methods: {
    genLabelWrapContext () {
      return this.$createElement('div', {
        staticClass: 'mux-field-label',
        class: [{
          'mux-field-required': this.required
        }, Array.isArray(this.labelClass) ? this.labelClass.join(' ') : this.labelClass]
      }, [this.genLabelContext()])
    },
    genLabelContext () {
      return this.$scopedSlots.label ? this.$scopedSlots.label({ label: this.label }) : this.$createElement('label', {
        attrs: {
          for: 'FIELD' + this.uuid
        }
      }, this.label)
    },
    genWrapContext () {
      return this.$createElement('div', {
        staticClass: 'mux-field-container',
        class: { 'mux-field-is-plain': this.plain, 'mux-field-is-rounded': this.rounded, 'mux-field-is-danger': this.invalid }
      }, [this.genInputWrapContext(), this.genCleanWrapContext()])
    },
    genInputWrapContext () {
      return this.$createElement('div', {
        staticClass: 'mux-field-box',
        class: ['mux-field-align-' + this.align]
      }, [this.genInputContext(), this.invalid ? this.genMsgContext() : null])
    },
    genInputContext () {
      return this.$createElement('input', {
        staticClass: 'mux-field-block',
        attrs: {
          id: 'FIELD' + this.uuid,
          type: this.type,
          name: this.name,
          required: this.required,
          disabled: this.disabled,
          readonly: this.readonly,
          placeholder: this.placeholder,
          ...this.attrs
        },
        domProps: {
          value: this.value,
        },
        on: {
          input: e => {
            const target = e.target || e.srcElement;
            this.$emit('input', target.value)
          }
        },
        ref: 'field'
      })
    },
    genMsgContext () {
      return this.$createElement('span', {
        staticClass: 'mux-field-help'
      }, this.message)
    },
    genCleanWrapContext () {
      return this.$createElement('div', {
        staticClass: 'mux-field-cleanbox'
      }, [(!!this.value && this.clearable && !this.readonly) ? this.genCleanIconContext() : null])
    },
    genCleanIconContext () {
      return this.$createElement('i', {
        staticClass: 'mux-field-clear-icon',
        on: {
          click: e => {
            e.stopPropagation()
            this.$emit('input', '');
            this.$refs.field.focus();
          }
        }
      })
    },
    genAppendWrapContext () {
      return this.$createElement('div', {
        staticClass: 'mux-field-append'
      }, [this.$scopedSlots.append ? this.$scopedSlots.append() : null])
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'component mux-field'
    }, [this.genLabelWrapContext(), this.genWrapContext(), this.genAppendWrapContext()])
  }
}