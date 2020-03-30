export default {
  name: "mx-button",
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
        return ["default", "primary", "danger"].includes(v);
      }
    }
  },
  render (h, context) {
    const classMap = [
      "mux-btn-" + context.props.color,
      "mux-btn-" + context.props.size,
      {
        "mux-btn--is-disabled": context.props.disabled,
        "mux-btn--is-block": context.props.block,
        "mux-btn--is-plain": context.props.plain
      }
    ];
    const attrs = { disabled: context.props.disabled };
    return h(
      "button",
      { ...context.data, class: classMap, attrs: attrs },
      context.children
    );
  }
};
