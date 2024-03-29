export default {
  name: "v-button",
  functional: true,
  props: {
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    ghost:{
      type:Boolean,
      default:false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "normal",
      validator (v) {
        return ["small", "normal", "large"].includes(v);
      }
    },
    color: {
      type: String,
      default: "default",
      validator (v) {
        return ["default", "primary", "danger", "error"].includes(v);
      }
    }
  },
  render (h, context) {
    const classMap = [
      "mux-btn-" + context.props.color,
      "mux-btn-" + context.props.size,
      {  
        "mux-btn--is-ghost":context.props.ghost,
        "mux-btn--is-disabled": context.props.disabled,
        "mux-btn--is-block": context.props.block,
        "mux-btn--is-plain": context.props.plain,
        "mux-btn--is-rounded": context.props.rounded
      }
    ];
    const attrs = { disabled: context.props.disabled };
    return h("button", { ...context.data, class: classMap, attrs: attrs, staticClass: 'component mux-btn' }, context.children);
  }
};
