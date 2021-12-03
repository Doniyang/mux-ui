"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: 'VPanel',
  inject: ['smartTable'],
  props: {
    osnap: {
      type: Number,
      default: 0
    },
    tag: {
      type: String,
      default: 'div'
    },
    full: {
      type: Boolean,
      default: false
    }
  },

  created() {
    var _this = this;

    window.addEventListener('resize', function onResize(e) {
      e.stopPropagation();

      _this.updateClientHeight();
    }, false);
  },

  updated() {
    this.$nextTick(() => {
      this.updateClientHeight();
    });
  },

  mounted() {
    this.$nextTick(() => {
      this.updateClientHeight();
    });
  },

  beforeDestroy() {
    var _this = this;

    window.removeEventListener('resize', function onResize(e) {
      e.stopPropagation();

      _this.updateClientHeight();
    }, false);
  },

  methods: {
    updateClientHeight() {
      var {
        height
      } = this.$el.getBoundingClientRect();
      this.smartTable.setClientHeight(this.osnap, height);
    }

  },

  render(h) {
    return h(this.tag, {
      class: {
        'mux-table-panel--is-full': this.full,
        'mux-table-panel--has-free-scrollbar': this.hasXYBar
      },
      on: {
        resize: e => {
          e.stopPropagation();
          this.updateClientHeight();
        }
      }
    }, this.$slots.default);
  }

};
exports.default = _default;