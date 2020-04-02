"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: 'mx-cell',
  props: {},
  methods: {
    genCellContext() {},

    genArrowContext() {}

  },

  render(h) {
    return h('div', {
      staticClass: 'component mux-cell-wrap'
    }, [this.genCellContext(), this.genArrowContext()]);
  }

};
exports.default = _default;