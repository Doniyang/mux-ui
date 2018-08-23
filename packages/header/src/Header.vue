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
@header: ~"mux-header";
.@{header} {
  &-wrapper {
    position: relative;
    display: flex;
    width: 100%;
    overflow: hidden;
    flex-wrap: nowrap;
    align-items: center;
    min-height: 4.2em;
    background: rgba(0, 0, 0, 0.78);
  }
  &-left {
    display: block;
    min-width: 4em;
    color: #FFFFFF;
  }
  &-back-arrow {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    &:before,
    &:after {
      position: absolute;
      content: "";
      width: 1em;
      height: 0.15em;
      top: -.15em;
      left: 1.25em;
      background-color: #FFFFFF;
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
    margin-left: 1.6em;
    font-size: 1.2em
  }

  &-content {
    display: block;
    flex: 1;
    text-align: center;
    color: #FFFFFF;
  }
  &-title {
    font-size: 1.5em;
  }
  &-right {
    min-width: 4em;
    color: #FFFFFF;
    text-align: right;
  }
  &-more-box {
    margin-right: 1.25em;
    font-size: 1.2em
  }
}

</style>
