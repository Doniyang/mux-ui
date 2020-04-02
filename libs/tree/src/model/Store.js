"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node = _interopRequireDefault(require("./Node.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Store {
  constructor(rootKey, data, config) {
    this.rootId = rootKey;
    this.isOpen = config.isOpen;
    this.isChecked = config.isChecked;
    this.isPlain = config.isPlain;
    this.nodeMaps = [];
    this.eventList = {};
    this.initNodeTree(data, rootKey, true);
  }
  /**
   * 初始化树节点
   * @param {string} array
   * @param {String} pId
   * @param {Boolean} isRoot
   */


  initNodeTree(array, pId, isRoot) {
    var _this = this;

    array.forEach(node => {
      var isOpen = isRoot ? _this.isOpen : node.open;
      var isPlain = isRoot ? _this.isPlain : false;
      var isChecked = isRoot ? _this.isChecked : node.nocheck;

      _this.addNode(node.id, pId, node.name, node.property || 'dept', isOpen, isPlain, isChecked);

      if (Array.isArray(node.children)) {
        _this.initNodeTree(node.children, node.id, false);
      }
    });
  }
  /**
   * 添加节点
   * @param {String} nodeId
   * @param {String} parentId
   * @param {String} title
   * @param {String} type
   * @param {Boolean} open
   * @param {Boolean} plain
   * @param {Boolean} checked
   */


  addNode(nodeId, parentId, title, type, open, plain, checked) {
    this.nodeMaps.push(new _Node.default(nodeId, parentId, title, type, open, plain, checked));
  }
  /**
   * 获取子节点
   * @param {String} pid
   * return Array
   */


  getNodeTreeMap(pid) {
    return this.nodeMaps.filter(node => node.getParentId() === pid);
  }
  /**
   * 检测是否含有子节点
   * @param {String} nodeId
   */


  checkNodeHasChildren(nodeId) {
    return this.nodeMaps.some(n => n.parentId === nodeId);
  }
  /**
   * 更新节点
   * @param {String} nodeId
   * @param {Boolean} isChecked
   */


  updateNodeCheckedState(nodeId, isChecked) {
    var node = this.nodeMaps.find(n => n.nodeId === nodeId);

    if (node) {
      node.updateNodePlainState(false);
      node.setTimeStamp(Date.now());
      node.updateNodeCheckedState(isChecked);
      node.updateChildrenCheckedState(isChecked);

      if (node.getParentId() !== this.rootId) {
        this.updateParentNodeState(node.getParentId());
      } else {
        this.emit('asyncChange', this.getCheckedNode());
      }
    }
  }
  /**
   * 更新父节点
   * @param {String} pId
   */


  updateParentNodeState(pId) {
    var pNode = this.nodeMaps.find(n => n.nodeId === pId);
    var childrenNode = this.getNodeTreeMap(pId);
    var isChecked = childrenNode.every(node => node.isChecked);
    var isPlain = childrenNode.some(node => node.isChecked || node.isPlain);
    pNode.updateNodePlainState(isPlain);
    pNode.updateNodeCheckedState(isChecked);

    if (pNode.getParentId() !== this.rootId) {
      this.updateParentNodeState(pNode.getParentId());
    } else {
      this.emit('asyncChange', this.getCheckedNode());
    }
  }
  /**
   * 更新节点打开状态
   * @param {String} nId
   * @param {Boolean} isOpen
   */


  updateNodeOpenState(nId, isOpen) {
    var node = this.nodeMaps.find(n => n.nodeId === nId);

    if (node) {
      node.updateNodeOpenState(isOpen);

      if (isOpen) {
        node.setNodeHasChildren(this.checkNodeHasChildren(nId));
      }
    }
  }

  getCheckedNode() {
    return this.nodeMaps.filter(node => node.isChecked);
  }
  /**
   * 监听事件/订阅事件
   * @param {String} evt
   * @param {Function} fn
   */


  on(evt, fn) {
    if (!(evt in this.eventList)) {
      this.eventList[evt] = [];
    }

    this.eventList[evt].push(fn);
  }
  /**
   * 触发事件
   */


  emit() {
    var args = arguments;
    var key = Array.prototype.shift.call(args);
    var fns = this.eventList[key];
    var self = this;

    if (!fns || fns.length === 0) {
      return false;
    }

    fns.forEach(fn => {
      fn.apply(self, args);
    });
  }
  /**
   * 取消监听
   * @param {String} evt
   * @param {Function} fun
   */


  off(evt, fun) {
    var fns = this.eventList[evt];

    if (!fns) {
      return false;
    }

    fns.forEach((fn, index) => {
      if (fn === fun) {
        fns.splice(index, 1);
      }
    });
  }

}

exports.default = Store;