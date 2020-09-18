"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Node {
  constructor(nodeId, parentId, title, type, open, plain, checked) {
    this.nodeId = nodeId;
    this.parentId = parentId;
    this.title = title;
    this.nodeType = type;
    this.isOpen = open || false;
    this.isPlain = plain || false;
    this.isChecked = checked || false;
    this.isParent = true;
    this.isLoading = false;
    this.isChildrenChecked = false;
    this.timeStamp = 0;
    this.updateChildrenCheckedState(checked);
  }
  /**
   * 获取节点ID
   * return String
   */


  getNodeId() {
    return this.nodeId;
  }
  /**
   * 获取父节点ID
   * return String
   */


  getParentId() {
    return this.parentId;
  }
  /**
    * 设置点击时间以便更新子节点状态
    * @param {DateTime} isParent
    */


  setTimeStamp(time) {
    this.timeStamp = time;
  }
  /**
   * 设置arrow
   * @param {Boolean} isParent
   */


  setNodeHasChildren(isParent) {
    this.isParent = isParent;
  }
  /**
   * 更新节点是否选中
   * @param {Boolean} isChecked
   */


  updateCheckedState(isChecked) {
    this.isChecked = isChecked;

    if (isChecked) {
      this.isPlain = false;
    }
  }
  /**
   * 设置节点是否打开
   * @param {Boolean} isOpen
   */


  updateOpenState(isOpen) {
    this.isOpen = isOpen;
  }
  /**
   * 设置选中some
   * @param {Boolean} isPlain
   */


  updatePlainState(isPlain) {
    this.isPlain = isPlain;
  }
  /**
   * 设置是否子节点选中
   * @param {Boolean} isChecked
   */


  updateChildrenCheckedState(isChecked) {
    this.isChildrenChecked = isChecked;
  }
  /**
   * 更新接点加载状态
   * @param {*} isLoading 
   */


  updateLoadingState(isLoading) {
    this.isLoading = isLoading;
  }

}

exports.default = Node;