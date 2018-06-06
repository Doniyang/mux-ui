<template>
  <transition name="mux-bounce">
    <section class="mux-alert-wrapper" v-if="visible">
      <div class="mux-alert-header">
        <div class="mux-alert-title">{{title}}</div>
      </div>
      <div class="mux-alert-main">
        <slot> <span class="mux-alert-content">{{content}}</span> </slot>
      </div>
      <div class="mux-alert-footer">
        <button class="mux-alert-btn" @click="handleClick">{{btnText}}</button>
      </div>
    </section>
  </transition>
</template>
<script>
import MaskMixin from '@/mixins/mask'
export default {
  name: 'v-alert',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: '确定'
    }
  },
  mixins: [MaskMixin],
  data() {
    return {
      callBack: null
    }
  },
  methods: {
    handleClick() {
      this.visible = false
      this.$emit('input', false)
      if (this.callBack) {
        this.callBack('alert')
      }
    }
  }
}

</script>
<style lang="less" scoped>
@import url('../../../src/style/variable.less');
@alert: ~"mux-alert";
.@{alert} {
  &-wrapper {
    position: fixed;
    z-index: @zIndex;
    background-color: @alert-bg;
    -webkit-user-select: none;
    top: 50%;
    left: 50%;
    width: 75%;
    border-radius: @alert-border-radius;
    transform: translate3d(-50%, -50%, 0);
    overflow: hidden;
    transition: all .2s;
  }
  &-header {
    padding: @alert-header-padd-top 0 0;
    box-sizing: border-box;
  }
  &-title {
    padding: 0;
    margin: 0;
    display: block;
    text-align: center;
    font-size: @alert-font-size;
    font-weight: 600;
  }
  &-main {
    position: relative;
    min-height: @alert-content-height;
    padding: @alert-content-padd;
    vertical-align: middle;
    text-align: center;
    border: none;
    background-image: linear-gradient(0, #dddddd, #dddddd 50%, transparent 50%);
    background-size: 100% 2px;
    background-repeat: no-repeat;
    background-position: bottom;
  }
  &-content {
    vertical-align: sub;
    line-height: 1;
    color: #999;
  }
  &-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-btn{
    flex: 1;
    -webkit-appearance: none;
    height: @alert-btn-height;
    display: block;
    padding: 0;
    margin: 0;
    border: none;
    outline: 0;
    color: @alert-btn-color;
    background-color: @alert-bg;
    &:active {
      color: @alert-btn-color;
      background-color: @alert-bg;
    }
  }
}
.mux-bounce-enter {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.7);
}

.mux-bounce-leave-active {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.9);
}

</style>
