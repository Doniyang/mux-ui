<template>
  <div class="mux-cell-container" :class="cellCalss">
    <slot></slot>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    isLink: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cellCalss () {
      return {
        'mux-cell-arrow': this.isLink
      }
    }
  }
}

</script>
<style lang="less" scoped>
@cell: ~"mux-cell";
.@{cell} {
  &-container {
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  &-arrow {
    overflow: hidden;
    zoom: 1;
    padding-right: 2.5em;
    &:before,
    &:after {
      content: "";
      position: absolute;
      width: 1em;
      height: 2px;
      right: 1em;
      background: #b3b3bf;
      transform-origin: right;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
}

</style>
