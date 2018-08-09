<template>
  <div class="mux-checkboxtree-wrapper">
    <div class="mux-checkboxtree-container" data-role="tree" v-for="(item,index) in options" :key="index">
      <v-tree-node :node="item" :icon-close="showCloseIcon" :is-collopse="true" :checked="isChecked" @onAsyncSelected="handleSelected"></v-tree-node>
    </div>
  </div>
</template>
<script>
import TreeNode from './TreeNode.vue'
export default {
  name: 'checkbox-tree',
  props: {
    options: {
      type: Array,
      required: true
    },
    showCloseIcon: {
      type: Boolean,
      default: true
    },
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'v-tree-node': TreeNode
  },
  data () {
    return {
      selectedList: []
    }
  },
  methods: {
    handleSelected (data, isCheck) {
      if (isCheck) {
        if (this.selectedList.every(item => item.id !== data.id)) {
          this.selectedList.push({ name: data.name, id: data.id, property: data.property })
        }
      } else {
        const checkList = this.selectedList.filter(item => item.id !== data.id)
        this.selectedList = checkList
      }
      this.$nextTick(() => {
        this.$emit('onSelected', this.selectedList)
      })
    }
  }
}
</script>
<style lang="less" scoped>
@checkboxtree: ~"mux-checkboxtree";
.@{checkboxtree} {
  &-wrapper {
    padding: 0;
    margin: 0;
    background-color: #FFFFFF;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  &-container {
    padding: 0;
    margin: 0;
    overflow: hidden;
    zoom: 1;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
}

</style>
