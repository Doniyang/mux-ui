export default {
  name: "v-editor",
  props: {
    position: {
      type: String,
      default: "center",
      validator (v) {
        return ["left", "center", "right"].indexOf(v) > -1
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
  data () {
    return {
      editVal: ""
    }
  },
  beforeMount () {
    this.editVal = this.value[this.fieldKey]
  },
  watch: {
    value: {
      handler (val) {
        this.editVal = val[this.fieldKey]
      },
      deep: true,
      immediate: false
    }
  },
  methods: {
    handleInput (e) {
      const target = e.currentTarget || e.target || e.srcElement
      this.editVal = target.value
    },
    handleClick (e, isCommit) {
      e.stopPropagation()
      if (isCommit) {
        this.$emit("commit", { data: this.value, key: this.fieldKey, value: this.editVal })
      }
      this.$emit("close", { target: this.$el, value: this.editVal, commit: isCommit })
    },
    genEditorContext () {
      return this.$createElement("div", {
        staticClass: "h-box vc"
      }, [this.genInputContext(), this.genBtnContext(true, "primary", "mdi-check"), this.genBtnContext(false, "error", "mdi-close")])
    },
    genInputContext () {
      return this.$createElement("input", {
        staticClass: "mux-editor-field",
        domProps: {
          value: this.editVal
        },
        on: {
          input: e => { this.handleInput(e) },
          change: e => { this.handleInput(e) }
        }
      })
    },
    genBtnContext (env, color, icon) {
      return this.$createElement("v-btn", {
        class:{'mx-2':env},
        props: {
          icon: true,
          small: true,
          color: color
        },
        on: {
          click: e => { this.handleClick(e, env) }
        }
      }, [this.genIconContext(icon)])
    },
    genIconContext (icon) {
      return this.$createElement("v-icon", {}, icon)
    }
  },
  render (h) {
    return h("div", {
      staticClass: "component mux-editor",
      class: [this.position],
      domProps: {
        ariaLabel: this.editVal
      }
    }, [this.genEditorContext()])
  }
}
