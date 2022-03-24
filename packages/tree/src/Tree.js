import Store from "./model/Store";
import Checkbox from "../../checkbox";
import Radio from "../../radio";

export default {
  name: "v-tree",
  model: {
    event: 'change'
  },
  props: {
    value: {
      type: [Array, String, Number],
      default: () => [],
    },
    dataItems: {
      type: Array,
      default: () => [],
    },
    options:{
      type:Object,
      default:()=>({})
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    loadChildren: {
      type: Function,
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: '数据努力加载中...'
    },
    radioName: {
      type: String,
      default: 'TreeRadio'
    },
    useRadio: {
      type: Boolean,
      default: false
    },
    useCheckbox: {
      type: Boolean,
      default: false,
    },
    strictly: {
      type: Boolean,
      default: false
    },
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: false
    },
    activable: {
      type: Boolean,
      default: false
    },
    indent: {
      type: Number,
      default: 15
    },
    unit: {
      type: String,
      default: 'px'
    }
  },
  data() {
    return {
      store: null
    };
  },
  created() {
    this.store = new Store(this.dataItems, {
      ...this.options,   
      isOpen: this.defaultExpandAll
    });
  },
  beforeMount() {
    this.updateNodeCheckedState(this.value);
  },
  beforeDestroy() {
    if (this.store) { this.store = null }
  },
  watch: {
    value: {
      handler(v) { this.updateNodeCheckedState(v) },
      deep: true
    },
    dataItems: {
      handler(v) { this.store.updateNodeMap(this.store.getRootKey(), v) },
      deep: true
    }
  },
  methods: {
    updateNodeCheckedState(value) {
      if (this.useRadio) {
        this.store.updateOnlyCheckedState(value)
      }
      if (this.useCheckbox) {
        this.strictly ? this.store.updateTickCheckedState(value) : this.store.updateMockCheckedState(value)
      }
    },
    handleActivedClick(node){
      if(this.activable){this.store.updateActivedState(node.getNodeId())}
      if(this.clickable){
        this.$emit('click:node',node)
      }
    },
    handleOpenClick(node) {
      if(node.isLeaf()){return false}
      if (this.lazy && node.isUnPick()) {
        this.shouldLoadChildren(node)
      } else {
        if (this.useCheckbox && this.strictly === false && node.isChecked()) { this.store.lazyUpdateChildrenState(node.getNodeId(), true) }
        this.store.updateOpenState(node, !node.isOpen())
      }
    },
    shouldLoadChildren(node) {
      this.store.updateStatusState(node, 1)
      this.fetchLazyLoadChildren(node).then(children => {
        this.store.updateStatusState(node, 2)
        this.store.updateNodeMap(node.nodeId, children)
        this.store.updateOpenState(node, true)
      }).catch(err => {
        console.log(err)
        this.store.updateStatusState(node, 3)
        this.store.updateOpenState(node, false)
      })
    },
    fetchLazyLoadChildren(node) {
      return new Promise((resolve, reject) => {
        this.loadChildren.apply(this, [node, resolve, reject])
      })
    },
    handleChange(nId, isChecked) {
      this.store.updateCheckedState(nId, isChecked)
      this.$nextTick(() => {
        this.$emit('change', this.store.getCheckedNode().map(node => node.getNodeId()))
      })
    },
    handleStrictlyChange(nId, isChecked) {
      const ensure = (v) => Array.isArray(v) ? v : []
      let value = ensure(this.value).filter(a => a !== nId)
      if (isChecked) { value.push(nId) }
      this.$emit('change', value)
    },
    genTreeWrapContext(pId, lvl) {
      if (this.loading) { return this.genSpinWrapContext() }
      if (this.dataItems.length === 0) { return this.genTextContext('p', 'mux-tree--is-empty', this.emptyText) }
      return this.$createElement("ul", {
        staticClass: "mux-tree-wrap",
        attrs: { ariaLevel: lvl },
      }, this.genTreeNodeContext(pId, lvl));
    },
    genSpinWrapContext() {
      return this.$createElement('div', {
        staticClass: 'mux-tree--is-spining'
      }, [this.genSpinContext(), this.genTextContext('p', 'mux-tree-spin-text', this.loadingText)])
    },
    genSpinContext(){
      return this.$createElement("div", {
        staticClass: "mux-tree-node--is-icon mux-tree-node--is-loading",
        attrs: { role: "icon" }
      }, [this.genLoadingContext()])
     },
    genTreeNodeContext(pId, lvl) {
      const nodeMap = this.store.getNodeMap(pId);
      return nodeMap.map((node) => this.$createElement("li", {
        staticClass: "mux-tree-item",
        key: node.getNodeId()
      }, [
        this.genNodeWrapContext(node, lvl),
        node.isOpen() ? this.genTreeWrapContext(node.getNodeId(), lvl + 1) : null,
      ]));
    },
    genNodeWrapContext(node, lvl) {
      return this.$createElement('div', {
        staticClass: 'mux-tree-node',
        class:{'mux-tree-node--is-actived':node.isActived()},
        style: { paddingLeft: this.indent * lvl + this.unit }
      }, [
        this.genIconWrapContext(node),
        this.useCheckbox ? this.genCheckboxWrapContext(node.isChecked(), node.isPlain(), node.getNodeId()) : null,
        this.useRadio ? this.genRadioWrapContext(node.isChecked(), node.getNodeId()) : null,
        this.genNodeContentContext(node)
      ])
    },
    genNodeContentContext(node) {
      return this.$createElement('div', {
        staticClass: 'mux-tree-node--is-content',
        on:{
          click:e=>{
            e.stopPropagation();
            this.handleActivedClick(node)
          }
        }
      }, [this.$scopedSlots.node ? this.genSlotContext('node', { node: node }) : this.genTextContext('span', 'mux-tree-node-label', node.label)]);
    },
    genIconWrapContext(node) {
      return this.$createElement("div", {
        staticClass: "mux-tree-node--is-icon",
        class: {
          "mux-tree-node--is-hide": node.isLeaf(),
          "mux-tree-node--is-open": node.isOpen(),
          "mux-tree-node--is-loading": node.isLoading()
        },
        attrs: { role: "icon" },
        on: {
          click: (e) => {
            e.stopPropagation();
            this.handleOpenClick(node);
          }
        },
      }, [node.isLoading() ? this.genLoadingContext() : this.genIconContext(node.isOpen(), node.hasChildren)])
    },
    genRadioWrapContext(isChecked, value) {
      return this.$createElement("div", {
        staticClass: "mux-tree-node--is-radio",
        attrs: {
          role: "radio",
        },
      }, [this.genRadioContext(isChecked, value)]);
    },
    genRadioContext(isChecked, value) {
      return this.$createElement(Radio, {
        props: {
          checked: isChecked,
          radioValue: value,
          name: this.radioName
        },
        on: {
          change: v => {
            this.$emit('change', v)
          }
        }
      })
    },
    genCheckboxWrapContext(isChecked, isPlain, value) {
      return this.$createElement("div", {
        staticClass: "mux-tree-node--is-checkbox",
        attrs: {
          role: "checkbox",
        },
      }, [this.genCheckboxContext(isChecked, isPlain, value)]);
    },
    genCheckboxContext(isChecked, isPlain, value) {
      return this.$createElement(Checkbox, {
        props: {
          checked: isChecked,
          partial: isPlain,
          checkboxValue: value,
        },
        on: {
          change: (e) => {
            const target = e.target || e.srcElement;
            e.stopPropagation();
            this.strictly ? this.handleStrictlyChange(target.value, target.checked) : this.handleChange(target.value, target.checked);
          },
        }
      })
    },
    genIconContext(isOpen, visible) {
      return this.$scopedSlots.icon ? this.genSlotContext('icon', { isOpen: isOpen, isVisible: visible }) : this.$createElement("span", {
        staticClass: "mux-tree-icon",
      });
    },
    genLoadingContext() {
      return this.$createElement("i", {
        staticClass: "mux-tree-loading",
      });
    },
    genSlotContext(slot, props) {
      return this.$scopedSlots[slot].call(this, props)
    },
    genTextContext(tag, clazz, text) {
      return this.$createElement(tag, {
        staticClass: clazz,
      }, text)
    }
  },
  render(h) {
    return h("div", {
      staticClass: "component mux-tree",
    }, [this.genTreeWrapContext(this.store.getRootKey(), 0)]);
  }
};