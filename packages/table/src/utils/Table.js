import Cell from "../model/Cell";

export default class Table {
  static makeCell(ary, wdth) {
    return ary.map((cfg) => new Cell(wdth, cfg));
  }

  static isFixed(ary, rtl) {
    if (ary.length) {
      let index = rtl ? ary.length - 1 : 0;
      return ary[index].fixed;
    }
    return false;
  }

  static makeFrozenCols(ary, rtl) {
    if (ary.length) {
      let len = ary.length;
      let max = Math.ceil(len / 2);
      return rtl ? ary.slice(len - 1 - max, len).filter(item => item.fixed) : ary.slice(0, max).filter(item => item.fixed);
    }
    return [];
  }

 static has(context, keymap) {
    let validator = false
    keymap.forEach(key => {
      if (Object.prototype.hasOwnProperty.call(context, key)) {
        validator = true
      }
    })
    return validator
  }

 static make(colgroup,columns){
   if(colgroup.length){
      let cols = [];
      let copyCols = columns.slice(0);
      colgroup.forEach(item=>{
        if(item.colspan===1){
          Array.prototype.push.call(cols,item)
        }else{
          Array.prototype.push.apply(cols,copyCols.splice(0,item.colspan))
        }  
      })
      return cols
   }else{
     return columns
   }
 }
}
