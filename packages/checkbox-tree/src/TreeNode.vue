<template>
  <div class="mux-nodetree-wrapper">
    <div class="mux-nodetree-header">
      <div class="mux-nodetree-title" @click.stop="handleClick">
        <span class="mux-nodetree-iconbox">
          <i :class="iconClass"></i></span>
        <span>{{node.name}}</span>
        <v-load :visible="isLoad"></v-load>
      </div>
      <div class="mux-nodetree-box">
        <v-check :value="node.id" :checked="node.nocheck" :indeterminate="isIndeterminate" @change="handleCheckedChange"></v-check>
      </div>
    </div>
    <div class="mux-nodetree-main" v-show="isLeafCollopse">
    <v-tree-node v-for="child in nodeChildren  " :node="child" :key="child.id" :icon-close="isLeafIconClose" :is-collopse="isLeafCollopse" :checked="isChecked" @onAsyncSelected="handleAsyncSelected" @onAsyncChange="updateCheckState"></v-tree-node>
    </div>
  </div>
</template>
<script type="text/javascript">
import Load from '@/components/load'
import Check from '@/components/checkbox'
import NodeMixin from '@/mixins/index.js'
export default {
  name: 'v-tree-node',
  props: {
    node: {
      type: Object,
      required: true
    },
    isCollopse: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    iconClose: {
      type: Boolean,
      default: true
    }
  },
  components: {
    'v-check': Check,
    'v-load': Load
  },
  mixins: [NodeMixin],
  data() {
    return {
      hiddenIcon: false,
      isIconClose: true,
      isLeafIconClose: true,
      isLeafCollopse: false,
      isChecked: false,
      isLoad: false,
      isIndeterminate: false,
      nodeChildren: []
    }
  },
  computed: {
    iconClass() {
      return { 'mux-nodetree-arrow-close': this.isIconClose, 'mux-nodetree-arrow-open': !this.isIconClose, 'mux-nodetree-arrow-hide': this.hiddenIcon }
    }
  },
  created() {
    this.isIconClose = this.iconClose
    this.isChecked = this.checked
    this.isIndeterminate = this.indeterminate
  },
  watch: {
    checked(nv, ov) {
      if (nv === ov) { return }
      this.isChecked = nv
    },
    isChecked(nv, ov) {
      if (nv === ov) { return }
      this.setNodeChecked(nv)
    },
    iconClose(nv, ov) {
      if (nv === ov) { return }
      this.isIconClose = nv
    }
  },
  methods: {
    handleClick() {
      if (this.node.isParent) {
        this.isIconClose ? this.handleExpand() : this.handleCollapse()
      } else {
        this.hiddenIcon = true
      }
    },
    handleExpand() {
      if (this.nodeChildren.length > 0) {
        this.isIconClose = false
        this.isLeafCollopse = true
      } else {
        this.isLoad = true
        this.fetchNodeChildren({ deptId: this.node.id, showUser: 'N' }, promise => {
          promise.then(res => {
            this.isLoad = false
            if (Array.isArray(res.data)) {
              this.nodeChildren = res.data
              this.isIconClose = false
              this.isLeafCollopse = true
            }
          }, err => {
            console.log(err)
            this.isLoad = false
          })
        })
      }
    },
    handleCollapse() {
      this.isIconClose = true
      this.isLeafCollopse = false
    },
    handleCheckedChange(isCheck) {
      this.isChecked = isCheck
      if (this.isIndeterminate) { this.isIndeterminate = false }
      this.$nextTick(() => {
        const data = { name: this.node.name, id: this.node.id, property: this.node.property || 'dept' }
        this.$emit('onAsyncChange', isCheck)
        this.$emit('onAsyncSelected', data, isCheck)
      })
    },
    setNodeChecked(isCheck) {
      this.$set(this.node, 'nocheck', isCheck)
    },
    handleAsyncSelected(data, isCheck) {
      isCheck ? this.addToSelectedList(data) : this.removeFromSelectedList(data)
    },
    addToSelectedList(data) {
      this.$nextTick(() => {
        if (this.node.nocheck) {
          this.nodeChildren.forEach(item => {
            if (item.nocheck) {
              this.$emit('onAsyncSelected', { id: item.id }, false)
            }
          })
          this.$emit('onAsyncSelected', { name: this.node.name, id: this.node.id, property: this.node.property || 'dept' }, true)
        } else {
          this.$emit('onAsyncSelected', data, true)
        }
      })
    },
    removeFromSelectedList(data) {
      this.$emit('onAsyncSelected', data, false)
      this.$nextTick(() => {
        this.nodeChildren.forEach(item => {
          if (item.nocheck) {
            this.$emit('onAsyncSelected', { name: item.name, id: item.id, property: item.property || 'dept' }, true)
          }
        })
        if (this.node.nocheck === false) {
          this.$emit('onAsyncSelected', { id: this.node.id }, false) 
        }
      })
    },
    updateCheckState(isCheck) {
      let checkState = isCheck
      if (this.nodeChildren.every(item => item.nocheck)) {
        this.setNodeChecked(true)
      }
      if (!isCheck && this.nodeChildren.some(item => item.nocheck)) {
        this.setNodeChecked(false)
        checkState = true
      }
      this.isIndeterminate = checkState
      this.$nextTick(() => {
        this.$emit('onAsyncChange', checkState)
      })
    }
  }
}

</script>
<style lang="less" scoped>
@nodetree: ~"mux-nodetree";
.@{nodetree} {
  &-wrapper {
    margin: 0 0 0 1.25em;
    padding: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  &-main {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-align-items: center;
    align-items: center;
    border-bottom: 1px solid #dddddd;
    @media screen and (-webkit-min-device-pixel-ratio: 1.5) {
      border: none;
      background-size: 100% 1px;
      background-repeat: no-repeat;
      background-position: bottom;
      background-image: -webkit-linear-gradient(90deg, #dddddd, #dddddd 50%, transparent 50%);
      background-image: linear-gradient(0, #dddddd, #dddddd 50%, transparent 50%);
    }
  }
  &-title {
    display: block;
    font-size: 15px;
    height: 3.25em;
    line-height: 3.25em;
    flex: 1;
    padding-left: 1em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &-box {
    padding-right: 1.25em;
  }
  &-iconbox {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-right: 1em;
  }
  &-arrow-hide {
    visibility: hidden;
    opacity: 0;
    filter: alpha(opacity=0);
  }
  &-arrow-close {
    position: relative;
    display: inline-block;
    vertical-align: super;
    &:before {
      content: '';
      width: 0.75em;
      height: 1px;
      top: 50%;
      left: 50%;
      background-color: #000;
      position: absolute;
      transform-origin: right;
      transform: translate3d(-50%, -50%, 0) rotate(45deg);
    }
    &:after {
      content: '';
      width: 0.75em;
      height: 1px;
      top: 50%;
      left: 50%;
      background-color: #000;
      position: absolute;
      transform-origin: right;
      transform: translate3d(-50%, -50%, 0) rotate(-45deg);
    }
  }
  &-arrow-open {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    &:before {
      content: '';
      width: 0.75em;
      height: 1px;
      top: 50%;
      left: 50%;
      background-color: #000;
      position: absolute;
      transform-origin: right;
      transform: translate3d(-100%, 0, 0) rotate(45deg);
    }
    &:after {
      content: '';
      width: 0.75em;
      height: 1px;
      top: 50%;
      left: 50%;
      background-color: #000;
      position: absolute;
      transform-origin: right;
      transform: translate3d(-100%, 0, 0) rotate(135deg);
    }
  }
}

</style>
