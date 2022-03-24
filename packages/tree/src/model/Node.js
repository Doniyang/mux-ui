export default class Node {
  constructor() {
    this.nodeId = null
    this.parentId = null
    this.label =  null
    this.open = false
    this.checked = false
    this.status = 0
    this.actived = false
    this.plain = false
    this.hasChildren = false
    this.raw = null
  }
  /**
   * @description 设置节点ID
   * @param {String|Number} nId 
   */
  setNodeId(nId){
    this.nodeId = nId
  }
  /**
   * @description 获取节点ID
   * @returns String|Number
   */
  getNodeId() {
    return this.nodeId
  }
  /**
   * @description 设置结点父节点ID
   * @param {String|Number} pId 
   */
  setParentId(pId){
    this.parentId = pId
  }
  /**
   * @description 获取父节点ID
   * @returns String|Number
   */
  getParentId() {
    return this.parentId
  }
  /**
   * @description 设置节点名称
   * @param {String} label 
   */
  setNodeName(label){
    this.label =label
  }
  /**
   * @description 设置原始数据
   * @param {*} raw 
   */ 
  setData(raw){
    this.raw = raw
  }
  /**
   * 设置节点是否打开
   * @param {Boolean} isOpen
   */
  updateOpenState(isOpen) {
    this.open = isOpen
  }
  /**
   * @description 是否打开
   * @returns Boolean
   */
  isOpen(){
    return this.open
  }

  /**
   * @description 设置节点状态
   * @param {Number} status 
   */
  updateStatusState(status) {
    this.status = status
  }
  /**
   * @description 更新checked状态
   * @param {Boolean} isChecked 
   */
  updateCheckedState(isChecked) {
    this.checked = isChecked
    if (isChecked) { this.updatePlainState(false) }
  }
  /**
   * @description 判断是否Checked
   * @returns Boolean
   */
  isChecked(){
    return this.checked
  }

  /**
  * 设置选中some
  * @param {Boolean} isPlain
  */
  updatePlainState(isPlain) {
    this.plain = isPlain
  }
  /**
   * @description 判断是否plain
   * @returns 
   */
  isPlain(){
    return this.plain 
  }

  /**
   * @description 判断节点是否有子节点 懒加载的标志
   * @param {Boolean} has 
   */
  updateChildrenState(has) {
    this.hasChildren = has
  }

/**
 * 
 * @param {*} isActived 
 */
  updateActivedState(isActived) {
    this.actived = isActived
  }
  
  /**
   * 
   * @returns Boolean
   */
  isActived(){
    return this.actived
  }
  /**
   * @description 判断是否是节点
   * @param {String|Number} nId 
   * @returns Boolean
   */
  is(nId) {
    return this.nodeId === nId
  }
  /**
   * @description 判断是否是父节点
   * @param {String|Number} pId 
   * @returns Boolean
   */
  isParent(pId) {
    return this.parentId === pId
  }
  /**
   * 
   * @returns Boolean
   */
  isUnPick(){
    return [0,3].includes(this.status)
  }
  /**
   * 
   * @returns 
   */  
  isLoading(){
    return this.status === 1
  }
  /**
   * 
   * @returns 
   */ 
  isLeaf(){
    return this.hasChildren ===false
  }

}
