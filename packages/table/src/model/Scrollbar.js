export default class Scrollbar {
  constructor () {
    this.width = 0
    this.height = 0
    this.top = 0
    this.left = 0
  }

  setWidth (width) {
    this.width = width
  }

  setHeight (height) {
    this.height = height
  }

  setTop (top) {
    this.top = top
  }

  setLeft (left) {
    this.left = left
  }

  getWidth () {
    return this.width
  }

  getHeight () {
    return this.height
  }

  getTop () {
    return this.top
  }

  getLeft () {
    return this.left
  }

  hasVScrollBar () {
    return this.width > 0
  }

  hasHScrollBar () {
    return this.height > 0
  }

  isFreeScroll () {
    return this.hasVScrollBar() && this.hasHScrollBar()
  }
}
