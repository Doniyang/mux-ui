import { cancelAnimationFrame, requestAnimationFrame } from './Raf'
export default class ScrollBar {
  constructor(dom, selector, callback) {
    this.RID = null
    this.init(dom, selector, callback)
  }
  init (dom, selector, callback) {
    this.RID = requestAnimationFrame(() => {
      this.setScrollElement(dom, selector, callback)
    })
  }
  setScrollElement (dom, selector, callback) {
    const el = dom.querySelector(selector)
    if (el != null) {
        callback(el.offsetWidth - el.clientWidth)
        if (this.RID) cancelAnimationFrame(this.RID)
        this.init(dom, selector, callback)
    } else {
      if (this.RID) cancelAnimationFrame(this.RID)
      this.init(dom, selector, callback)
    }
  }
  getBarWidth () {
    return this.barWidth
  }
  distory () {
    if (this.RID) cancelAnimationFrame(this.RID)
  }
} 
