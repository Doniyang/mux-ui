"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Cell = _interopRequireDefault(require("../model/Cell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Table {
  static makeCell(ary, wdth) {
    return ary.map(cfg => new _Cell.default(wdth, cfg));
  }

  static isFixed(ary, rtl) {
    if (ary.length) {
      var index = rtl ? ary.length - 1 : 0;
      return ary[index].fixed;
    }

    return false;
  }

  static makeFrozenCols(ary, rtl) {
    if (ary.length) {
      var len = ary.length;
      var max = Math.ceil(len / 2);
      return rtl ? ary.slice(len - 1 - max, len).filter(item => item.fixed) : ary.slice(0, max).filter(item => item.fixed);
    }

    return [];
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

  static make(colgroup, columns) {
    if (colgroup.length) {
      var cols = [];
      var copyCols = columns.slice(0);
      colgroup.forEach(item => {
        if (item.colspan === 1) {
          Array.prototype.push.call(cols, item);
        } else {
          Array.prototype.push.apply(cols, copyCols.splice(0, item.colspan));
        }
      });
      return cols;
    } else {
      return columns;
    }
  }

}

exports.default = Table;