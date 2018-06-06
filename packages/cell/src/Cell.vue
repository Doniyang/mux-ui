<template>
  <section class="mux-cell-wrapper" @click.stop="handleClick">
    <div class="mux-cell-header" :class="{'mux-cell-shrink':basis==='title'}">
      <slot name="title">
        <span>{{title}}</span>
      </slot>
    </div>
    <div class="mux-cell-main" :class="{'mux-cell-shrink':basis==='value'}">
      <slot>
        <span>{{value}}</span>
      </slot>
    </div>
    <div class="mux-cell-footer">
      <span v-if="isLink" class="mux-cell-arrow">
    <i class="mux-caret-right"></i>
  </span>
    </div>
  </section>
</template>
<script type="text/javascript">
export default {
  props: {
    title: String,
    value: String,
    isLink: {
      type: Boolean,
      default: false
    },
    basis: {
      type: String,
      default: 'title',
      validator(v) {
        return ['title', 'value'].includes(v)
      }
    }
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
}

</script>
<style lang="less" scoped>
@import url('../../../src/style/variable.less');
@cell: ~"mux-cell";
.@{cell} {
  &-wrapper {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: @cell-height;
    font-size: @cell-size;
    &:after {
      width: 100%;
      height: 1px;
      background-color: #dddddd;
      display: block;
      content: '';
      position: absolute;
      top: auto;
      right: auto;
      bottom: 0;
      left: 0;
      -webkit-transform-origin: 50% 100%;
      transform-origin: 50% 100%;
    }
  }
  &-header {
    display: block;
    margin: 0;
    padding-left: 15px;
    color: @cell-title-color;
  }
  &-main {
    display: block;
    padding-right: 8px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: @cell-value-color;
  }
  &-footer {
    display: block;
    overflow: hidden;
    padding-right: 7px;
    zoom: 1;
    box-sizing: border-box;
  }
  &-shrink {
    flex: 1;
  }
  &-arrow {
    display: inline-block;
    position: relative;
    height: 24px;
    width: 24px;
    vertical-align: middle;
    & .mux-caret-right {
      position: relative;
      top: 50%;
      &:before {
        position: absolute;
        content: "";
        top: 50%;
        width: 16px;
        height: 1px;
        transform-origin: right;
        transform: rotate(45deg);
        background-color: #CCC;
      }
      &:after {
        position: absolute;
        content: "";
        top: 50%;
        width: 16px;
        height: 1px;
        transform-origin: right;
        transform: rotate(-45deg);
        background-color: #CCC;
      }
    }
  }
}

</style>
