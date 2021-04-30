/**
 * @description 用于格式化表头
 * @author niyang
 */
export default class Cell {
  constructor(width, options) {
    this.text = null
    this.field = null
    this.width = width
    this.align = "center"
    this.style = null
    this.class = null
    /**
     * @description 从1开始,值愈大,权重愈大,在表头的位置越靠前
     * @type {number}
     */
    this.weight = 1
    this.colspan = 1
    this.rowspan = 1
    this.slot = null
    this.editable = false
    this.sortable = false
    this.fixed = false
    this.slotable = false
    this.formator = (row, key) => row[key]

    for (const key in options) {
      this.set(this, key, options[key])
    }
  }

  set(context, key, value) {
    context[key] = value
  }

  isSole() {
    return this.colspan === 1
  }

  isOverlap() {
    return this.rowspan > Math.max(this.weight, 1)
  }
}
