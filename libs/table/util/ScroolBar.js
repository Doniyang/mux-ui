"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Raf = require("./Raf");

class ScrollBar {
  constructor(dom, selector, callback) {
    this.RID = null;
    this.init(dom, selector, callback);
  }

  init(dom, selector, callback) {
    this.RID = (0, _Raf.requestAnimationFrame)(() => {
      this.setScrollElement(dom, selector, callback);
    });
  }

  setScrollElement(dom, selector, callback) {
    var el = dom.querySelector(selector);

    if (el != null) {
      callback(el.offsetWidth - el.clientWidth);
      if (this.RID) (0, _Raf.cancelAnimationFrame)(this.RID);
      this.init(dom, selector, callback);
    } else {
      if (this.RID) (0, _Raf.cancelAnimationFrame)(this.RID);
      this.init(dom, selector, callback);
    }
  }

  getBarWidth() {
    return this.barWidth;
  }

  distory() {
    if (this.RID) (0, _Raf.cancelAnimationFrame)(this.RID);
  }

}

exports.default = ScrollBar;