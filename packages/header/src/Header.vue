<template>
  <header class="mux-header-wrapper">
    <div class="mux-header-left" @click.stop="handleBackClick">
      <slot name="left">
        <span class="mux-header-back-arrow"></span>
        <span class="mux-header-back-box">{{backTxt}}</span>
      </slot>
    </div>
    <div class="mux-header-content">
      <slot>
        <span class="mux-header-title">{{title}}</span>
      </slot>
    </div>
    <div class="mux-header-right" @click.stop="handleMoreClick">
      <slot name="right">
        <span class="mux-header-more-box">{{moreTxt}}</span>
      </slot>
    </div>
  </header>
</template>
<script type="text/javascript">
export default {
  props: {
    backTxt: {
      type: String,
      default: '返回'
    },
    title: {
      type: String,
      default: ''
    },
    moreTxt: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleBackClick(e) {
      this.$emit('back-click', e)
    },
    handleMoreClick(e) {
      this.$emit('right-click', e)
    }
  }
}

</script>  
<style lang="less" scoped>
@import url('../../../src/style/variable.less');
@header: ~"mux-header";
.@{header} {
  &-wrapper {
    position: relative;
    display: flex;
    width: 100%;
    overflow: hidden;
    flex-wrap: nowrap;
    align-items: center;
    min-height: @header-min-height;
    background: @header-bg;
  }
  &-left {
    display: block;
    min-width: @header-side-min-width;
    color:@header-back-color;
  }
  &-back-arrow {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    &:before,
    &:after {
      position: absolute;
      content: "";
      width: 12px;
      height: 2px;
      top: -2px;
      left: 15px;
      background-color: @header-arrow-bg;
      transform-origin: left;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
  &-back-box {
    display: inline-block;
    margin-left: 24px;
    font-size: @header-side-size;
  }

  &-content {
    display: block;
    flex: 1;
    text-align: center;
    color: @header-title-color;
  }
  &-title {
    font-size: @header-title-size;
  }
  &-right {
    min-width: @header-side-min-width;
    color: @header-more-color;
    text-align: right;
  }
  &-more-box {
    margin-right: 15px;
    font-size: @header-side-size;
  }
}

</style>
