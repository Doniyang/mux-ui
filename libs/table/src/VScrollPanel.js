"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Raf = require("./utils/Raf");

var _default = {
  name: "VScrollPanel",
  inject: ["smartTable"],
  props: {
    height: {
      type: [Number, String],
      default: 0
    },
    maxHeight: {
      type: [Number, String]
    }
  },

  data() {
    return {
      rafId: null,
      stamp: 0
    };
  },

  mounted() {
    this.updateScrollBar();
  },

  beforeDestroy() {
    if (this.rafId) {
      (0, _Raf.cancelAnimationFrame)(this.rafId);
    }
  },

  methods: {
    updateScrollBar() {
      this.rafId = (0, _Raf.requestAnimationFrame)(this.setParentScrollBar.bind(this));
    },

    setParentScrollBar(time) {
      var el = this.$el;
      this.stamp = time;

      if (el) {
        this.smartTable.setScrollbar(el.offsetHeight - el.clientHeight, el.offsetWidth - el.clientWidth);
      }

      if (this.rafId) {
        (0, _Raf.cancelAnimationFrame)(this.rafId);
      }

      this.updateScrollBar();
    }

  },

  render(h) {
    return h("div", {
      style: {
        height: isNaN(this.height) ? this.height : this.height + "px",
        maxHeight: isNaN(this.maxHeight) ? this.maxHeight : this.maxHeight + "px"
      }
    }, this.$slots.default);
  }

};
exports.default = _default;