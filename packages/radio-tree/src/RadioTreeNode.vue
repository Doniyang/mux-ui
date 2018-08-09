<template>
  <div class="mux-tree-node-wrapper">
    <div class="mux-tree-node-header">
      <div class="mux-tree-node-title" @click="handleClick">
        <span :class="iconClass"></span>
        <span class="mux-tree-node-label"> {{radioTreeData.name}}</span>
        <v-load :visible="isLoad"></v-load>
      </div>
      <div class="mux-tree-node-arrow">
        <v-radio @change="handleChange"></v-radio>
      </div>
    </div>
    <main class="mux-tree-node-main">
      <radio-tree-node v-for="(item,index) in nodeChildren" :key="index" :radio-tree-data="item" @onAsyncSelected="handleAsyncSelected"></radio-tree-node>
    </main>
  </div>
</template>
<script>
import Load from '@/components/load'
import Radio from '@/components/radio'
import NodeMixin from '@/mixins/index.js'
export default {
  name: 'radio-tree-node',
  props: {
    radioTreeData: {
      type: Object,
      default () {
        return {}
      }
    },
    isIconCollapse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconClass () {
      return {
        'mux-tree-node-arrow-close': !this.isCollapse,
        'mux-tree-node-arrow-open': this.isCollapse,
        'mux-tree-node-arrow-hide': this.isNoIcon
      }
    }
  },
  components: {
    'v-load': Load,
    'v-radio': Radio
  },
  mixins: [NodeMixin],
  data () {
    return {
      nodeChildren: [],
      isLoad: false,
      isCollapse: false,
      isNoIcon: false
    }
  },
  created () {
    this.isCollapse = this.isIconCollapse
  },
  methods: {
    handleClick () {
      if (this.isCollapse) {
        this.removeChildren()
        this.$nextTick(() => {
          this.setCollapse(false)
        })
      } else {
        this.getChildren()
        this.$nextTick(() => {
          this.setCollapse(true)
        })
      }
    },
    getChildren () {
      this.isLoad = true
      this.fetchNodeChildren({ deptId: this.radioTreeData.id, showUser: 'N'}, promise => {
        promise.then(res => {
          console.log(res)
          if (Array.isArray(res.data)) {
            this.nodeChildren = res.data
            this.isLoad = false
            this.isNoIcon = res.data.length === 0
          }
        }, err => {
          console.log(err)
          this.isLoad = false
        })
      })
    },
    removeChildren () {
      this.nodeChildren = []
    },
    setCollapse (isOpen) {
      this.isCollapse = isOpen
    },
    handleChange (isChecked) {
      this.$emit('onAsyncSelected', isChecked ? this.radioTreeData : {})
    },
    handleAsyncSelected (data) {
      this.$emit('onAsyncSelected', data)
    }
  }
}
</script>
<style lang="less" scoped>
@treenode: ~"mux-tree-node";
.@{treenode} {
  &-wrapper {
    position: relative;
    overflow: hidden;
    zoom: 1;
    padding: 0;
    margin: 0;
  }
  &-header {
    display: flex;
    height: 4em;
    justify-content: space-between;
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
    font-size: 1.6em;
    width: 100%;
    padding-left: 1em;
    flex: 1;
  }
  &-label {
    margin-left: 0.8em;
  }
  &-arrow {
    margin-right: 1em;
    width: 2.2em;
  }
  &-main {
    margin-left: 1.5em;
    position: relative;
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
      width: 0.625em;
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
      width: 0.625em;
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
      width: 0.625em;
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
      width: 0.625em;
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
