"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Table {
  static sealed(columns) {
    return columns.some(cell => cell.fixed);
  }

  static has(context, keymap) {
    var validator = false;
    keymap.forEach(key => {
      if (Object.prototype.hasOwnProperty.call(context, key)) {
        validator = true;
      }
    });
    return validator;
  }

  static parse(a, b) {
    return a === -1 ? b : a;
  }

  static isFunction(fn) {
    return typeof fn === 'function';
  }

  static checkAllState(selectList, dataItems, key) {
    var list = dataItems.map(item => item[key]);
    return !!list.length && list.every(li => selectList.includes(li)) && selectList.every(it => list.includes(it));
  }

  static checkSomeState(selectList, dataItems, key) {
    var list = dataItems.map(item => item[key]);
    return !!selectList.length && list.some(one => !selectList.includes(one));
  }

  static pixel(pixel) {
    return isNaN(pixel) ? pixel : pixel + 'px';
  }

}

exports.default = Table;