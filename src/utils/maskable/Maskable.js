export default class Maskable {
  constructor(zIndex) {
    this.isOpening = false;
    this.isOpened = false;
    this.isClosing = false;
    this.isClosed = true;
    this.zIndex = zIndex;
    this.maskMap = new Map();
  }
  get opening() {
    return this.isOpening;
  }
  get opened() {
    return this.isOpened;
  }
  get closing() {
    return this.isClosing;
  }
  get closed() {
    return this.isClosed;
  }
  register(key, mask) {
    this.maskMap.set(key, mask);
  }
  deregister(key) {
    this.maskMap.delete(key);
  }
  getMask(key) {
    return this.maskMap.get(key);
  }
  setZIndex(zIndex) {
    this.zIndex = zIndex;
  }
  getNextZIndex() {
    return this.zIndex + 1;
  }
  open(key) {
    this.isOpening = true;
    const vm = this.getMask(key);
    if (vm) {
      vm.setZIndex(this.getNextZIndex());
      document.body.appendChild(vm.$el);
      this.isOpened = true;
      this.setZIndex(this.getNextZIndex());
    }
    this.isOpening = false;
  }
  close(key) {
    this.isClosing = true;
    const vm = this.getMask(key);
    if (vm) {
      document.body.removeChild(vm.$el);
      this.isClosed = true;
    }
    this.isClosing = false;
  }
}
