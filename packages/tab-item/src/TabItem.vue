<template>
  <div class="mux-tab-item" :class="{'mux-tab-item-active':currentSelected}" @click.stop="handleClick">
    <slot></slot>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    selected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentSelected: false,
      keyIndex: -1
    }
  },
  created () {
    this.currentSelected = this.selected
  },
  methods: {
    handleClick () {
      this.currentSelected = true
      this.$parent.updateSelected(this.keyIndex)
      this.$emit('on-item-click', this.keyIndex)
    }
  }
}

</script>
<style lang="less" scoped>
@item: ~'mux-tab';
.@{item} {
  &-item {
    display: block;
    flex: 1;
    white-space: nowrap;
    width: 100%;
    position: relative;
    text-align: center;
    padding: 0 0.5em;
    font-size: 1.5em;
    &:first-child {
      &:after {
        background: transparent;
      }
    }
    &:after {
      content: "";
      position: absolute;
      left: 0;
      width: 2px;
      height: 1.5em;
      top: 50%;
      left: -1px;
      transform: translate3d(0,-50%,0);
      background: #e4e2ed;
    }
  }
  &-item-active{
    color: #2ab7ff;
  }
}

</style>
