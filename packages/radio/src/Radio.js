export default {
  name: 'v-radio',
  model:{event:'change'},
  props: {
    label: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'XRadio'
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: String,
    radioValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      radioInGroup:false,
      defaultChecked: false,
      uuid: Math.random().toString(32).substring(4, 9).toUpperCase()
    }
  },
  created () {
    this.updateCheckedState(this.value)
  },
  computed: {
    isCkecked () {
      return this.checked || this.defaultChecked
    },
    radioId () {
      return this.id || 'RADIO-' + this.uuid
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (nv, ov) {
        if (nv !== ov) this.updateCheckedState(nv)
      }
    }
  },
  methods: {
    updateCheckedState (value) {
      return this.defaultChecked = value === this.radioValue
    },
    setRadioInGroup(flag){
      this.radioInGroup = flag
    },
    genRadioWrapContext () {
      return this.$createElement('div', {
        staticClass: 'mux-radio-box'
      }, [this.genRadioContext()])
    },
    genRadioContext () {
      return this.$createElement('input', {
        staticClass: 'mux-radio-block',
        attrs: {
          type: 'radio',
          id: this.radioId,
          name: this.name,
          checked: this.isCkecked,
          disabled: this.disabled
        },
        domProps: {
          value: this.radioValue
        },
        on: {
          change: e => {
            e.stopPropagation()
            const target = e.target || e.srcElement
            if (target.checked) {
              this.$emit('change', target.value)
              if(this.radioInGroup){this.$parent.$emit('change', target.value)}
            }
          }
        }
      })
    },
    genRadioLabelContext () {
      return this.$createElement('div', {
        staticClass: 'mux-radio-label-wrap'
      }, [this.genLabelSlotContext()])
    },
    genLabelSlotContext () {
      return this.$scopedSlots.label ? this.$scopedSlots.label({ id: this.radioId }) : this.$createElement('label', {
        staticClass: 'mux-radio-label',
        attrs: {
          for: this.radioId
        }
      }, this.label)
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'component mux-radio'
    }, [this.genRadioWrapContext(), this.genRadioLabelContext()])
  }
}