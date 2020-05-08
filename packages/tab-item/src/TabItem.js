export default {
  props: {
    actived: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isActived: false,
    };
  },
  inject: ["MuxTab"],
  watch: {
    isActived(nv, ov) {
      if (nv !== ov) {
        this.updateParentState();
      }
    },
  },

  created() {
    this.isActived = this.actived;
  },
  methods: {
    handleClick(e) {
      e.stopPropagation();
      this.updateActivedState(true);
    },
    updateParentState() {
      this.MuxTab.updateState(this);
    },
    updateActivedState(isActived) {
      this.isActived = isActived;
    },
  },
  render(h) {
    return h(
      "div",
      {
        staticClass: "component mux-tab-item",
        class: {
          "mux-tab-item--is-actived": this.isActived,
        },
        domProps:{
          ariaSelected:this.isActived
        },
        on: {
          click: (e) => {
            this.handleClick(e);
          },
        },
      },
      this.$slots.default
    );
  },
};
