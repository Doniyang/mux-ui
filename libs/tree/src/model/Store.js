"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node = _interopRequireDefault(require("./Node.js"));

var _notify = require("@niyang-es/notify");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Store {
  constructor(rootKey, data, config) {
    this.rootId = rootKey;
    this.config = config;
    this.nodeMaps = [];
    this.notifier = new _notify.Notifier();
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
      var isOpen = _this.getDefaultOpenState();

      var isPlain = _this.getDefaultPlainState();

      var isChecked = _this.getDefaultCheckedState();

      var key = _this.getNodeValueKey();

      var text = _this.getNodeTextKey();

      var children = _this.getNodeChildrenKey();

      var property = isRoot ? "root" : "leaf";

      _this.addNode(node[key], pId, node[text], property, isOpen, isPlain, isChecked);

      if (Array.isArray(node[children])) {
        _this.initNodeTree(node[children], node[key], false);
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
   * 获取默认打开状态
   */


  getDefaultOpenState() {
    return !!this.config.isOpen;
  }
  /**
   * 获取默认选中状态
   */


  getDefaultCheckedState() {
    return !!this.config.isChecked;
  }
  /**
   * 获取默认plain状态
   */


  getDefaultPlainState() {
    return !!this.config.isPlain;
  }
  /**
   * 获取节点text
   */


  getNodeTextKey() {
    return this.config.text || "name";
  }
  /**
   * 获取节点的value
   */


  getNodeValueKey() {
    return this.config.value || "id";
  }
  /**
   * 节点的children
   */


  getNodeChildrenKey() {
    return this.config.children || "children";
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
   * 检测是否有子节点
   * @param {String} nodeId
   */


  checkNodeHasChildren(nodeId) {
    return this.nodeMaps.some(n => n.parentId === nodeId);
  }
  /**
   * 更新根节点的checked状态
   * @param {*} values 
   */


  updateRootNodeCheckedState(values) {
    var nodeList = this.getNodeTreeMap(this.rootKey);
    nodeList.forEach(node => {
      if (!node.isChecked) {
        this.updateNodeCheckedState(node.getNodeId(), values.indexOf(node.getNodeId()) > -1);
      }
    });
  }
  /**
   * 更新节点
   * @param {String} nodeId
   * @param {Boolean} isChecked
   */


  updateNodeCheckedState(nodeId, isChecked) {
    var node = this.nodeMaps.find(n => n.nodeId === nodeId);

    if (node) {
      node.updatePlainState(false);
      node.setTimeStamp(Date.now());
      node.updateCheckedState(isChecked);
      node.updateChildrenCheckedState(isChecked);
      this.updateChildrenNodeCheckedState(node.getNodeId(), isChecked);

      if (node.getParentId() !== this.rootId) {
        this.updateParentNodeState(node.getParentId());
      } else {
        this.emit("async:change", this.getCheckedNode());
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
    pNode.updatePlainState(isPlain);
    pNode.updateCheckedState(isChecked);

    if (pNode.getParentId() !== this.rootId) {
      this.updateParentNodeState(pNode.getParentId());
    } else {
      this.emit("async:change", this.getCheckedNode());
    }
  }
  /**
   * 更新子节点是否选中
   * @param {*} pId
   * @param {*} isChecked
   */


  updateChildrenNodeCheckedState(pId, isChecked) {
    var nodeList = this.getNodeTreeMap(pId);
    nodeList.forEach(node => {
      node.updateCheckedState(isChecked);
      node.updateChildrenCheckedState(isChecked);

      if (node.isOpen) {
        this.updateChildrenNodeCheckedState(node.getNodeId(), isChecked);
      }
    });
  }
  /**
   * 更新节点打开状态
   * @param {String} nId
   * @param {Boolean} isOpen
   */


  updateNodeOpenState(nId, isOpen) {
    var node = this.nodeMaps.find(n => n.nodeId === nId);

    if (node) {
      node.updateOpenState(isOpen);

      if (isOpen) {
        node.setNodeHasChildren(this.checkNodeHasChildren(nId));
      }
    }
  }
  /**
   * 更新节点加载状态
   * @param {*} nId
   * @param {*} isLoading
   */


  updateNodeLoadingState(nId, isLoading) {
    var node = this.nodeMaps.find(n => n.getNodeId() === nId);

    if (node) {
      node.updateLoadingState(isLoading);
    }
  }
  /**
   * 更新节点的是否有子节点
   * @param {*} nId 
   * @param {*} isParent 
   */


  updateNodeHasChidren(nId, isParent) {
    var node = this.nodeMaps.find(n => n.getNodeId() === nId);

    if (node) {
      node.setNodeHasChildren(isParent);
    }
  }
  /**
   * 获取选中的节点
   */


  getCheckedNode() {
    return this.nodeMaps.filter(node => node.isChecked);
  }
  /**
   * 监听事件/订阅事件
   * @param {String} evt
   * @param {Function} fn
   */


  on(evt, fn) {
    this.notifier.on(evt, fn);
  }
  /**
   * 触发事件
   */


  emit(evt) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    this.notifier.notify(evt, args);
  }
  /**
   * 取消监听
   * @param {String} evt
   * @param {Function} fun
   */


  off(evt, fn) {
    this.notifier.off(evt, fn);
  }

}

exports.default = Store;