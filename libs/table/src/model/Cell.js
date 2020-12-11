"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Cell {
  constructor(width, options) {
    this.text = null;
    this.field = null;
    this.width = width;
    this.align = 'center';
    this.style = null;
    this.class = null;
    this.colspan = 1;
    this.rowspan = 1;
    this.slot = null;
    this.editable = false;
    this.sort = false;
    this.fixed = false;
    this.slotable = false;

    this.formator = txt => txt;

    for (var key in options) {
      this.set(this, key, options[key]);
    }
  }

  set(context, key, value) {
    context[key] = value;
  }

}

exports.default = Cell;