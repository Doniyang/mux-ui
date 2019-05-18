<template>
  <ul class="hz-tree-wrapper">
    <li class="hz-tree-item" v-for="(item,index) in nodeTreeMap" :key="`Tree_${index}`">
      <a href="javascript:void(0)" class="hz-tree-container">
        <div class="hz-tree-main" @click.stop="handleClick(item.nodeId,item.isOpen,item.isParent)">
          <div class="hz-tree-icon-wrap">
            <span
              :class="{'hz-tree-close':!item.isOpen,'hz-tree-open':item.isOpen}"
              v-if="item.isParent"
            ></span>
          </div>
          <p class="hz-tree-title">{{item.title}}</p>
        </div>
        <div class="hz-tree-actions">
          <label class="hz-tree-checkbox-wrap" v-if="useCheckbox">
            <input
              type="checkbox"
              class="hz-tree-checkbox"
              :class="{'hz-tree-checksome':item.isPlain}"
              :value="item.nodeId"
              :checked="item.isChecked"
              @change="handleChange($event,item.nodeId)"
            >
          </label>
        </div>
      </a>
      <v-tree
        v-if="item.isOpen"
        :parent-id="item.nodeId"
        :store="nodeStore"
        :checked="item.isChildrenChecked"
        :is-root="false"
        :stamp="item.timeStamp"
        :lazy="lazy"
        :use-checkbox="useCheckbox"
      ></v-tree>
    </li>
  </ul>
</template>
<script type="text/javascript">
import Store from './model/Store.js'
export default {
  name: 'v-tree',
  props: {
    value: Array,
    options: {
      type: Array,
      default: () => []
    },
    checked: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    },
    useCheckbox: {
      type: Boolean,
      default: true
    },
    plain: {
      type: Boolean,
      default: false
    },
    collopse: {
      type: Boolean,
      default: false
    },
    stamp:{
      type:Number,
      default:0
    },
    isRoot: {
      type: Boolean,
      default: true
    },
    parentId: {
      type: String,
      default: '-2'
    },
    store: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      nodeStore: null
    }
  },
  computed: {
    nodeTreeMap () {
      return this.nodeStore ? this.nodeStore.getNodeTreeMap(this.parentId) : []
    }
  },
  mounted () {
    if (this.isRoot) {
      this.nodeStore = new Store(this.parentId, this.options, {
        isChecked: this.checked,
        isPlain: this.plain,
        isOpen: this.collopse
      })
      this.nodeStore.on('asyncChange', this.handleAsyncChange)
    } else {
      this.nodeStore = this.store
      this.updateChildrenCheckedState(this.checked)
    }
  },
  beforeDestroy () {
    if (this.isRoot) {
      this.nodeStore.off('asyncChange', this.handleAsyncChange)
      this.nodeStore = null
    }
  },
  watch: {
    options: {
      handler (nv, ov) {
        if(nv===ov&&(!this.isRoot)){}
        this.nodeStore.initNodeTree(nv,this.parentId,this.isRoot)
      },
      deep: true
    },

    stamp(nv,ov){
      if(nv===ov){return}
      this.updateChildrenCheckedState(this.checked)  
    }
  },
  methods: {
    handleClick (nodeId, isOpen, isParent) {
      if (!isParent) {
        return false
      }
      if (this.nodeStore.checkNodeHasChildren(nodeId)) {
        this.updateNodeOpenState(nodeId, !isOpen)
      } else {
        if (isOpen) {
          this.updateNodeOpenState(nodeId, false)
        } else {
          if (this.lazy) {
            this.$emit('asyncOpen', nodeId, this.updateStoreNodeAndState)
          } else {
            this.updateNodeOpenState(nodeId, true)
          }
        }
      }
    },
    handleAsyncChange (data) {
      this.$emit('input', data)
    },
    handleAsyncOpen (nId, update) {
      if (this.lazy) {
        this.$emit('asyncOpen', nId, update)
      }
    },
    updateStoreNodeAndState (nId, data, isOpen) {
      const vm = this
      if (Array.isArray(data)) {
        data.forEach(node => {
          vm.nodeStore.addNode(
            node.id,
            nId,
            node.name,
            node.property || 'dept',
            false,
            false,
            false
          )
        })
      }
      this.updateNodeOpenState(nId, isOpen)
    },
    updateChildrenCheckedState (isChecked) {
      this.nodeTreeMap.forEach(node => {
        node.setTimeStamp(Date.now())
        node.updateNodeCheckedState(isChecked)
        node.updateChildrenCheckedState(isChecked)
      })
    },
    updateNodeOpenState (nodeId, isOpen) {
      this.nodeStore.updateNodeOpenState(nodeId, isOpen)
    },
    handleChange (e, nId) {
      const target = e.target || e.srcElement
      this.updateNodeCheckedState(nId, target.checked)
    },
    updateNodeCheckedState (nId, isChecked) {
      this.nodeStore.updateNodeCheckedState(nId, isChecked)
    }
  }
}
</script>
<style lang="less" scoped>
@tree: ~"hz-tree";

.setClearFix() {
  display: table;
  content: "";
  box-sizing: border-box;
}

.setBoxChecked(@c) {
  content: "";
  width: 10px;
  height: 6px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -5px;
  margin-top: -5px;
  background: transparent;
  border: 1px solid @c;
  border-top: none;
  border-right: none;
  z-index: 2;
  -webkit-border-radius: 0;
  border-radius: 0;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.@{tree} {
  &-wrapper {
    display: block;
    list-style: none;
    position: relative;
    overflow: hidden;
    padding:0;
    margin: 0;
    zoom: 1;
    box-sizing: border-box;
    background-color: #ffffff;

    &:before,
    &:after {
      .setClearFix();
    }

    &:after {
      clear: both;
    }
  }

  &-item {
    position: relative;
    display: block;
    list-style: none;
    overflow: hidden;
    padding: 0;
    margin: 0;
    *zoom: 1;
    padding: 0 0 0 15px;
    box-sizing: border-box;
  }

  &-container {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    overflow: hidden;
    width: 100%;
    padding: 0;
    text-decoration:none;
    color: inherit;
    min-height: 50px;
    border-bottom: 1px solid #dddddd;

    @media screen and (-webkit-min-device-pixel-ratio: 1.5) {
      border: none;
      background-size: 100% 1px;
      background-repeat: no-repeat;
      background-position: bottom;
      background-image: linear-gradient(
        0,
        #dddddd,
        #dddddd 50%,
        transparent 50%
      );
      background-image: -webkit-linear-gradient(
        90deg,
        #dddddd,
        #dddddd 50%,
        transparent 50%
      );
    }
  }

  &-main {
    position: relative;
    display: block;
    flex: 1;
    overflow: hidden;
  }

  &-title {
    display: block;
    font-size: 16px;
    margin: 0;
    margin: 0 0 0 24px;
  }

  &-icon-wrap {
    float: left;
    display: block;
    clear: left;
    width: 30px;
  }

  &-open,
  &-close {
    position: relative;
    display: inline-block;
    vertical-align: middle;

    &:before,
    &:after {
      position: absolute;
      content: "";
      width: 15px;
      height: 1px;
      background: rgba(0, 0, 0, 0.56);
      transform-origin: right;
      -webkit-transition: all 0.2s;
      -o-transition: all 0.2s;
      transition: all 0.2s;
    }
  }

  &-open {
    &:before {
      left: -4px;
      top: 6px;
      transform: rotate(135deg) translate3d(0, 0, 0);
    }

    &:after {
      left: -4px;
      top: 6px;
      transform: rotate(45deg) translate3d(0, 0, 0);
    }
  }

  &-close {
    &:before {
      left: 0;
      top: 0px;
      transform: rotate(45deg) translate3d(0, 0.05em, 0);
    }

    &:after {
      left: 0;
      top: 0px;
      transform: rotate(-45deg) translate3d(0, -0.05em, 0);
    }
  }

  &-actions {
    display: block;
  }

  &-checkbox-wrap {
    display: block;
    margin: 0 15px 0 0;
  }

  &-checkbox {
    width: 24px;
    height: 24px;
    background-color: #ffffff;
    border: solid 1px #aaaaaa;
    border-radius: 50%;
    outline: 0;
    margin: 0;
    padding: 0;
    position: relative;
    display: inline-block;
    vertical-align: top;
    cursor: default;
    -webkit-appearance: none;
    appearance: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-transition: background-color ease 0.1s;
    transition: background-color ease 0.1s;
    &:hover {
      border-color: #3598db;
    }

    &:checked {
      background-color: #3598db;
      border: solid 1px #3598db;
      text-align: center;
      background-clip: border-box;
      &::before,
      &::after {
        .setBoxChecked(#ffffff);
      }
    }

    &.@{tree}-checksome {
      border-color: #3598db;
      &::before,
      &::after {
        .setBoxChecked(#3598db);
      }
    }
  }
}
</style>
