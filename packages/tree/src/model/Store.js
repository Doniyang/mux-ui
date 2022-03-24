import Node from "./Node.js";
export default class Store {
  constructor(data, config) {
    this.rootKey = -1;
    this.config = config;
    this.node = null
    this.nodeMap = [];
    this.initialize(data, this.rootKey);
  }
    /**
   * 默认Open
   */
  get isOpen() {
    return !!this.config.isOpen
  }
  /**
   * 获取节点labeKey
   */
  get labelKey() {
    return this.config.label || "name";
  }
  /**
   * 获取节点的value
   */
  get valueKey() {
    return this.config.value || "id";
  }

  /**
   * 节点的children
   */
  get childrenKey() {
    return this.config.children || "children";
  }

  get hasChildrenKey(){
    return  this.config.hasChildren || "hasChildren";
  }

  /**
   * 初始化树节点
   * @param {string} array
   * @param {String} pId
   * @param {Boolean} isRoot
   */
  initialize(array, pId) {
    array.forEach((node) => {
      this.set(pId, node);
      if (Array.isArray(node[this.childrenKey])) {
        this.initialize(node[this.childrenKey], node[this.valueKey]);
      }
    });
  }
  /**
   * @description 设置节点
   * @param {*} pId 
   * @param {*} nId 
   * @param {*} label 
   * @param {*} isOpen 
   * @param {*} isChecked 
   */
  set(pId, raw) {
    let node = this._help()
    node.setParentId(pId)
    node.setNodeId(raw[this.valueKey])
    node.setNodeName(raw[this.labelKey])
    node.setData(raw)
    node.updateChildrenState(!!raw[this.hasChildrenKey])
    node.updateOpenState(this.isOpen)
    this.nodeMap.push(node)
    this.updateNodeChildrenState(pId, true)
  }
  /**
   * @description 获取rootKey
   * @returns Number
   */
  getRootKey() {
    return this.rootKey;
  }
  /**
   * @description 获取pId节点下的所有子节点
   * @param {*} pid 
   * @returns Array<Node>
   */
  getNodeMap(pId) {
    return this.nodeMap.filter(node => node.isParent(pId))
  }
  /**
   * 
   * @param {String|Number} nId 
   * @returns Node
   */
  find(nId) {
    return this.nodeMap.find(node=>node.is(nId))
  }
  /**
   * 
   * @returns Array<Node>
   */
  getCheckedNode() {
    return this.nodeMap.filter(node => node.isChecked())
  }
  /**
   * @description 过滤子节点
   * @param {*} pId 
   */   
  filterNodeMap(pId){
      let children = this.getNodeMap(pId)
      this.nodeMap = this.nodeMap.filter(node=>!node.isParent(pId))
      if(this.isEmptyArray(children)|| this.isEmptyArray(this.nodeMap)){return false}
      children.forEach(child=>{
        this.filterNodeMap(child.getNodeId())
      })   
  }
  /**
   * 
   * @param {*} nId 
   * @param {*} has 
   */
  updateNodeChildrenState(nId,has){
   const node = this.find(nId)
   if(node){node.updateChildrenState(has)}
  }
  /**
   * @description 更新父节点下的子节点
   * @param {String} pId 
   * @param {Array<Object>} ary 
   */  
  updateNodeMap(pId,ary){
    this.filterNodeMap(pId)
    this.initialize(pId,ary) 
  }
  /**
   * @description 更新状态
   * @param {String} nId 
   */
  updateOnlyCheckedState(nId) {
    this.nodeMap.forEach(node => {
      node.updatePlainState(false)
      node.updateCheckedState(node.is(nId))
    })
  }
  /**
   * 更新节点
   * @param {Array<String>} checkList 
   */
  updateTickCheckedState(checkList) {
    this.nodeMap.forEach(node => {
      node.updatePlainState(false)
      node.updateCheckedState(checkList.includes(node.getNodeId()))
    })
  }
  /**
   * 
   * @param {Array<String>} checkList 
   */  
  updateMockCheckedState(checkList){
     if(this.isEmptyArray(checkList)){this.updateTickCheckedState(checkList)}
     checkList.forEach(nId=>{
        this.updateChildrenState(nId,true)
     })  
  }
  /**
   * 
   * @param {*} nId 
   */
  updateActivedState(nId){
    this.nodeMap.forEach(node=>{
      node.updateActivedState(node.is(nId))
    })
  }
  /**
   * 
   * @param {*} nId 
   * @param {*} isChecked 
   */
  updateCheckedState(nId, isChecked) {
    const node = this.find(nId)
    if (node === undefined) { return false }
    node.updateCheckedState(isChecked)
    this.updateParentState(node.getParentId(), isChecked)
    if(node.isOpen()){this.lazyUpdateChildrenState(nId, isChecked)}  
  }
  /**
   * 
   * @param {*} node 
   * @param {*} isOpen 
   */
  updateOpenState(node,isOpen){
    node.updateOpenState(isOpen)
  }
  /**
   * 
   * @param {*} node 
   * @param {*} status 
   */
  updateStatusState(node,status){
    node.updateStatusState(status)
  }
  /**
   * 
   * @param {*} pId 
   * @param {*} isChecked 
   */
  lazyUpdateChildrenState(pId,isChecked){
    this.getNodeMap(pId).filter(n =>n.isChecked() !== isChecked).forEach(node => {
      node.updatePlainState(false)
      node.updateCheckedState(isChecked)
      this.updateChildrenState(node.getNodeId(), isChecked)
    })
  }
  /**
   * @description 更新子节点
   * @param {*} nId 
   * @param {*} isChecked 
   */
  updateChildrenState(nId, isChecked) {
    this.getNodeMap(nId).filter(n =>n.isOpen() && n.isChecked() !== isChecked).forEach(node => {
      node.updatePlainState(false)
      node.updateCheckedState(isChecked)
      this.updateChildrenState(node.getNodeId(), isChecked)
    })
  }
  /**
   * @description 更新父节点
   * @param {String} pId 
   */
  updateParentState(pId, isChecked) {
    isChecked ? this.updateParentCheckedState(pId) : this.updateParentPlainState(pId)
  }
  /**
   * 更新父节点checked
   * @param {*} pId 
   * 
   */
  updateParentCheckedState(pId) {
    const node = this.find(pId)
    const isChecked = this.getNodeMap(pId).every(node => node.isChecked())
    if (node === undefined) { return false }
    if (isChecked) {
      node.updateCheckedState(true)
      this.updateParentCheckedState(node.getParentId())
    } else {
      node.updateCheckedState(false)
      node.updatePlainState(true)
      this.updateParentPlainState(node.getParentId())
    }
  }
  /**
   * @description 更新父节点plain
   * @param {String} pId 
   */
  updateParentPlainState(pId) {
    const node = this.find(pId)
    const isPlain = this.getNodeMap(pId).some(node => node.isPlain() || node.isChecked())
    if (node === undefined) { return false }
    if (isPlain) {
      this.updateParentNodePlainState(node)
    } else {
      node.updateCheckedState(false)
      node.updatePlainState(false)
      this.updateParentPlainState(node.getParentId())
    }
  }
  /**
   * @description 更新父节点plain状态
   * @param {*} node 
   */
  updateParentNodePlainState(node) {
    if (node === undefined) { return false }
    if (node.isPlain() === false) {
      node.updateCheckedState(false)
      node.updatePlainState(true)
      this.updateParentNodePlainState(this.find(node.getParentId()))
    }
  }
  /**
   * @description 判断空数组
   * @param {*} ary 
   * @returns 
   */
  isEmptyArray(ary){
    return Array.isArray(ary)&&ary.length===0
  }
  /**
   * @description 创建节点
   * @returns Node
   */
  _help() {
    return this.node ? this.node : new Node()
  }

}
