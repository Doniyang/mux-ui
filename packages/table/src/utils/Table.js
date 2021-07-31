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
    let index = 0;
    let cols = columns.slice(0);
    colgroup.forEach(cell=>{
      if(cell.isOverlap()){
        cols.splice(index,0,cell)
        index +=1
      }else{
        index += cell.colspan
      }
    })
    return cols
  }
  
  static merge(colgroup,columns){
    return this.group(colgroup,false).reverse().reduce((a,c)=>{

    },columns)  
  }

  static group(colgroup,columns){
    let ary = Array.isArray(columns)?[columns.slice(0)]:[];
    return Array.from(new Set(colgroup.map(item=>item.weight))).sort((a,b)=>a-b).reduce((current,next)=>{
         [].unshift.call(current,colgroup.filter(cell=>cell.weight === next))
         return current;  
    },ary)
  }
  
  static pixel(pixel){
      return isNaN(pixel)?pixel:pixel+"px"  
  }
  
  static checkAllState (selectList, dataItems, key) {
    const list = dataItems.map(item => item[key])
    return Boolean(list.length)  && list.every(li => selectList.includes(li)) && selectList.every(it => list.includes(it))
  }

  static checkSomeState (selectList, dataItems, key) {
    const list = dataItems.map(item => item[key])
    return Boolean(selectList.length) && list.some(one => !selectList.includes(one))
  }
}
