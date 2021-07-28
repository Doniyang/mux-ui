import Cell from "../model/Cell"

export default class Table {
  static makeCell (ary, wdth) {
    return ary.map((cfg) => new Cell(wdth, cfg))
  }

  static isFixed (ary, rtl) {
    if (ary.length) {
      const index = rtl ? ary.length - 1 : 0
      return ary[index].fixed
    }
    return false
  }

  static sealed (colgroup, columns) {
    return [...colgroup, ...columns].some(col => col.fixed)
  }

  static makeFrozenCols (ary, rtl) {
    if (ary.length) {
      const len = ary.length
      const max = Math.ceil(len / 2)
      return rtl ? ary.slice(len - 1 - max, len).filter(item => item.fixed) : ary.slice(0, max).filter(item => item.fixed)
    }
    return []
  }

  static has (context, keymap) {
    let validator = false
    keymap.forEach(key => {
      if (Object.prototype.hasOwnProperty.call(context, key)) {
        validator = true
      }
    })
    return validator
  }

  static make (colgroup, columns) {
    if (colgroup.length) {
      const cols = []
      const copyCols = columns.slice(0)
      colgroup.forEach(item => {
        if (item.isOverlap()) {
          Array.prototype.push.call(cols, item)
        } else {
          Array.prototype.push.apply(cols, copyCols.splice(0, item.colspan))
        }
      })
      return cols
    } else {
      return columns
    }
  }

  static merge(colgroup,columns){
    return Array.from(new Set(colgroup.map(item=>item.weight))).sort((a,b)=>a-b).reduce((current,next)=>{
         [].unshift.call(current,colgroup.filter(cell=>cell.weight === next))
         return current;  
    },[columns])
  }

  static checkAllState (selectList, dataItems, key) {
    const list = dataItems.map(item => item[key])
    return list.length  && list.every(li => selectList.includes(li)) && selectList.every(it => list.includes(it))
  }

  static checkSomeState (selectList, dataItems, key) {
    const list = dataItems.map(item => item[key])
    return selectList.length && list.some(one => !selectList.includes(one))
  }
}
