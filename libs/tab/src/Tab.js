"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tabSlider = _interopRequireDefault(require("../../tab-slider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: "v-tab",
  props: {
    hideSlider: {
      type: Boolean,
      default: false
    },
    sliderSize: {
      type: Number,
      default: 70
    },
    site: {
      type: String,
      default: "bottom",

      validator(v) {
        return ["top", "bottom"].indexOf(v) > -1;
      }

    },
    fillCell: {
      type: Boolean,
      default: false
    },
    maxCell: {
      type: Number,
      default: 6
    }
  },

  provide() {
    return {
      MuxTab: this
    };
  },

  data() {
    return {
      left: 0,
      width: 0
    };
  },

  methods: {
    updateState(vnode) {
      this.updateChildState(vnode._uid);
      this.updateSliderPosition(vnode.$el);
    },

    updateChildState(uid) {
      this.$children.forEach(vnode => {
        if (vnode._uid != uid && vnode.isActived) {
          vnode.updateActivedState(false);
        }
      });
    },

    updateSliderPosition(el) {
      var {
        width,
        left
      } = el.getBoundingClientRect();
      this.setSliderSite(left, Math.max(0, width - this.sliderSize), this.fillCell);
      this.setSliderSize(width, this.sliderSize, this.fillCell);
    },

    setSliderSite(cleft, pd, isfill) {
      var {
        left
      } = this.$el.getBoundingClientRect();
      this.left = cleft - left + (isfill ? 0 : pd / 2);
    },

    setSliderSize(cwidth, dwidth, isfill) {
      this.width = isfill ? cwidth : dwidth;
    },

    genTabContext() {
      return this.$createElement("div", {
        staticClass: "mux-tabs-container"
      }, this.$slots.default);
    },

    genTabBarContext() {
      return this.$createElement(_tabSlider.default, {
        staticClass: "mux-tabs-slider",
        class: ["mux-tabs-slider--is-" + this.site],
        style: {
          left: this.left + "px",
          width: this.width + "px"
        }
      });
    }

  },

  render(h) {
    return h("div", {
      staticClass: "component mux-tabs"
    }, [this.genTabContext(), this.hideSlider ? null : this.genTabBarContext()]);
  }

};
exports.default = _default;