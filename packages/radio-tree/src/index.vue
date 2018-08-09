<template>
  <div class="mux-radio-tree-wrapper">
    <radio-tree-node v-for="(item,index) in options" :key="index" :radio-tree-data="item" @onAsyncSelected="handleSelect"></radio-tree-node>
  </div>
</template>
<script type="text/javascript">
import RadioTreeNode from './RadioTreeNode.vue'
export default {
  name: 'radio-tree',
  props: {
    options: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    RadioTreeNode
  },
  methods: {
    handleSelect (data) {
      this.$emit('onSelected', data)
    }
  }
}
</script>
<style lang="less" scoped>
@radiotree: ~"mux-radio-tree";
.@{radiotree} {
  &-wrapper {
    position: relative;
    background-color: #FFFFFF;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
}

</style>
