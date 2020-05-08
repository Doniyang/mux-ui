export default {
  name: "v-sticky",
  functional: true,
  props: {
    top: {
      type: [Number, String],
      default: 0,
    },
    left: {
      type: [Number, String],
      default: "auto",
    },
    right: {
      type: [Number, String],
      default: "auto",
    },
    bottom: {
      type: [Number, String],
      default: "auto",
    },
  },
  render(h, context) {
    const styles = {
      top: isNaN(context.props.top)
        ? context.props.top
        : context.props.top + "px",
      left: isNaN(context.props.left)
        ? context.props.left
        : context.props.left + "px",
      right: isNaN(context.props.right)
        ? context.props.right
        : context.props.right + "px",
      bottom: isNaN(context.props.bottom)
        ? context.props.bottom
        : context.props.bottom + "px",
    };
    return h(
      "div",
      {
        ...context.data,
        staticStyle: styles,
        staticClass:'component mux-sticky'
      },
      context.children
    );
  },
};
