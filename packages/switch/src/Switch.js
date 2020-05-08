export default {
  name: "v-switch",
  props: {
    onValue: {
      type: [String, Boolean, Number],
      default: true,
    },
    offValue: {
      type: [String, Boolean, Number],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number, Boolean],
      default: true,
    },
  },
  computed:{
    isChecked(){
      return this.value === this.onValue
    }
  },
  methods: {
    handleChange(e) {
      const target = e.target || e.srcElement;
      this.$emit('input', target.checked?this.onValue:this.offValue)
    },
    genInputContext() {
      return this.$createElement("input", {
        staticClass: "mux-switch-box",
        attrs: {
          type: "checkbox",
          disabled: this.disabled,
          readonly: this.readonly,
          checked:this.isChecked
        },
        on: {
          change: (e) => {
            this.handleChange(e)
          },
        },
      });
    },
  },
  render(h) {
    return h(
      "label",
      {
        staticClass: "component mux-switch",
        class: {
          "mux-switch--is-actived": this.isChecked,
        },
        attrs: {
          role: "switch",
        },
        domProps:{
          ariaChecked:this.isChecked
        }
      },
      [this.genInputContext()]
    );
  },
};
