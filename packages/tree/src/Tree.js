import Store from "./model/Store";
export default {
  name: "v-tree",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    itemText: {
      type: String,
      default: "name",
    },
    itemValue: {
      type: String,
      default: "id",
    },
    itemChildren: {
      type: String,
      default: "children",
    },
    checked: {
      type: Boolean,
      default: false,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    lazyChildren: {
      type: Function,
      default: () => {},
    },
    useCheckbox: {
      type: Boolean,
      default: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      parentId: "-100102",
      nodeStore: null,
    };
  },
  created() {
    this.nodeStore = new Store(this.parentId, this.items, {
      text: this.itemText,
      value: this.itemValue,
      children: this.itemValue,
      isChecked: this.checked,
      isPlain: false,
      isOpen: this.open,
    });
  },
  methods: {
    genTreeWrapContext(pId) {
      return this.$createElement(
        "ul",
        {
          staticClass: "mux-tree-wrap",
        },
        this.genTreeLeafContext(pId)
      );
    },
    genTreeLeafContext(pId) {
      const nodeMap = this.nodeStore.getNodeTreeMap(pId);
      return nodeMap.map((item) =>
        this.$createElement("li", {
          staticClass: "hz-tree-item",
          key: item[this.itemValue],
        },[this.genLeafWrapContext(item),item.isOpen?this.genTreeWrapContext(item[this.itemValue]):null])
      );
    },
    genLeafWrapContext(node){
        return this.$createElement('a',{
           staticClass:'mux-tree-container'
        }) 
    },
    genLeafContext(item){

    },
    genCheckboxContext(isChecked,isPlain,value){

    } 

  },
  render(h) {
    return h("div", {});
  },
};
