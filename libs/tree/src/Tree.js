"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Store = _interopRequireDefault(require("./model/Store"));

var _checkbox = _interopRequireDefault(require("../../checkbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default2 = {
  name: "v-tree",
  props: {
    value: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    itemText: {
      type: String,
      default: "name"
    },
    itemValue: {
      type: String,
      default: "id"
    },
    itemChildren: {
      type: String,
      default: "children"
    },
    checked: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    },
    loadChildren: {
      type: Function,
      default: id => {}
    },
    useCheckbox: {
      type: Boolean,
      default: false
    },
    open: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      parentId: -1,
      nodeStore: null
    };
  },

  created() {
    this.nodeStore = new _Store.default(this.parentId, this.items, {
      text: this.itemText,
      value: this.itemValue,
      children: this.itemChildren,
      isChecked: this.checked,
      isPlain: false,
      isOpen: this.open
    });
    this.nodeStore.on("async:change", this.handleAsyncChange);
  },

  beforeMount() {
    this.nodeStore.updateRootNodeCheckedState(this.value);
  },

  beforeDestroy() {
    if (this.nodeStore) {
      this.nodeStore.off("async:change", this.handleAsyncChange);
      this.nodeStore = null;
    }
  },

  watch: {
    checked(nv, ov) {
      if (nv != ov) {
        this.nodeStore.updateNodeCheckedState(this.parentId, nv);
      }
    },

    open(nv, ov) {
      if (nv != ov) {
        this.nodeStore.updateNodeOpenState(this.parentId, nv);
      }
    }

  },
  methods: {
    handleAsyncChange(e, data) {
      e.stopPropagation();
      this.$emit("input", data);
    },

    handleClick(nodeId, isOpen, isChecked) {
      if (this.lazy && !isOpen) {
        thid.nodeStore.updateNodeLoadingState(nodeId, true);
        this.lazyLoadChildren(nodeId).then(children => {
          thid.nodeStore.updateNodeLoadingState(nodeId, false);
          children.forEach(item => {
            this.nodeStore.addNode(item[this.itemValue], nodeId, item[this.itemText], "leaf", false, false, isChecked);
          });
          this.nodeStore.updateNodeOpenState(nodeId, !isOpen);
          this.nodeStore.updateNodeHasChidren(nodeId, !!children.length);
        }).catch(e => {
          console.log(e);
          thid.nodeStore.updateNodeLoadingState(nodeId, false);
        });
      } else {
        this.nodeStore.updateNodeHasChidren(nodeId, this.nodeStore.checkNodeHasChildren(nodeId));
        this.nodeStore.updateNodeOpenState(nodeId, !isOpen);
        this.nodeStore.updateChildrenNodeCheckedState(nodeId, isChecked);
      }
    },

    handleChange(e) {
      var target = e.target || e.srcElement;
      e.stopPropagation();
      this.nodeStore.updateNodeCheckedState(target.value, target.checked);
    },

    lazyLoadChildren(nodeId) {
      return new Promise((resolve, reject) => {
        var children = this.loadChildren.call(this, nodeId);

        if (Array.isArray(children)) {
          resolve(children);
        } else {
          reject(new Error("Tree node is Array,but get object"));
        }
      });
    },

    genTreeWrapContext(pId, level) {
      return this.$createElement("ul", {
        staticClass: "mux-tree-wrap",
        attrs: {
          ariaLevel: level
        }
      }, this.genTreeNodeContext(pId));
    },

    genTreeNodeContext(pId) {
      var nodeMap = this.nodeStore.getNodeTreeMap(pId);
      return nodeMap.map(node => this.$createElement("li", {
        staticClass: "mux-tree-item",
        key: node.getNodeId()
      }, [this.genNodeContentContext(node), node.isOpen ? this.genTreeWrapContext(node.getNodeId(), "leaf") : null]));
    },

    genNodeContentContext(node) {
      return this.$createElement("div", {
        staticClass: "mux-tree-container"
      }, [this.genIconWrapContext(node.getNodeId(), node.hasChildrenNode(), node.isOpen, node.isLoading, node.isChildrenChecked), this.useCheckbox ? this.genCheckboxWrapContext(node.isChecked, node.isPlain, node.getNodeId()) : null, this.genContentWrapContext(node.title)]);
    },

    genIconWrapContext(nId, isParent, isOpen, isLoading, isChildrenChecked) {
      return this.$createElement("a", {
        staticClass: "mux-tree-icon-box",
        class: {
          "mux-tree-icon--is-open": isOpen,
          "mux-tree-icon--is-loading": isLoading,
          "mux-tree-icon--is-hide": !isParent
        },
        attrs: {
          href: "javascript:void(0)",
          role: "icon"
        },
        on: {
          click: e => {
            e.stopPropagation();
            this.handleClick(nId, isOpen, isChildrenChecked);
          }
        }
      }, [isLoading ? this.genLoaingContext() : this.genIconContext()]);
    },

    genCheckboxWrapContext(isChecked, isPlain, value) {
      return this.$createElement("div", {
        staticClass: "mux-tree-checkbox",
        attrs: {
          role: "checkbox"
        }
      }, [this.genCheckboxContext(isChecked, isPlain, value)]);
    },

    genContentWrapContext(text) {
      return this.$createElement("p", {
        staticClass: "mux-tree-title"
      }, text);
    },

    genCheckboxContext(isChecked, isPlain, value) {
      return this.$createElement(_checkbox.default, {
        props: {
          checked: isChecked,
          partial: isPlain,
          checkboxValue: value
        },
        on: {
          change: e => {
            this.handleChange(e);
          }
        }
      });
    },

    genIconContext() {
      return this.$createElement("span", {
        staticClass: "mux-tree-icon"
      });
    },

    genLoaingContext() {
      return this.$createElement("i", {
        staticClass: "mux-tree-loading"
      });
    }

  },

  render(h) {
    return h("div", {
      staticClass: "component mux-tree"
    }, [this.genTreeWrapContext(this.parentId, "root")]);
  }

};
exports.default = _default2;