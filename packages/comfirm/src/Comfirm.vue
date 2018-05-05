<template>
  <transition name="mux-bounce">
    <section class="mux-comfirm-wrapper" v-if="value">
      <div class="mux-comfirm-header">
        <div class="mux-comfirm-title">{{title}}</div>
      </div>
      <div class="mux-comfirm-main">
        <slot>
          <div class="mux-comfirm-content">{{content}}</div>
        </slot>
      </div>
      <div class="mux-comfirm-footer">
        <button class="mux-comfirm-btn mux-btn-cancel" @click="handleClick('cancel')">{{cancelBtnText}}</button>
        <div class="mux-divider-line"></div>
        <button class="mux-comfirm-btn mux-btn-comfirm" @click="handleClick('comfirm')">{{comfirmBtnText}}</button>
      </div>
    </section>
  </transition>
</template>
<script type="text/babel">
import MaskMixin from '@/mixins/mask'
export default{
  name: 'v-comfirm',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      default: ''
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    comfirmBtnText: {
      type: String,
      default: '确定'
    }
  },
  mixins: [MaskMixin],
  data () {
    return {
      callBack: null
    }
  },
  methods:{
    handleClick(action){
      this.value = false
      if (this.callBack) {
        this.callBack(action)
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import url('../../../src/style/variable.less');
.mux-comfirm-wrapper {
  position: fixed;
  z-index: @zIndex;
  background-color: @comfirm-bg;
  -webkit-user-select: none;
  top: 50%;
  left: 50%;
  width: 75%;
  border-radius: @comfirm-border-radius;
  transform: translate3d(-50%, -50%, 0);
  overflow: hidden;
  transition: all .2s;
  & .mux-comfirm-header {
    padding: @comfirm-header-padd-top 0 0;
    box-sizing: border-box;
    & .mux-comfirm-title {
      padding: 0;
      margin: 0;
      display: block;
      text-align: center;
      font-size: @comfirm-font-size;
      font-weight: 600;
    }
  }
  & .mux-comfirm-main {
    position: relative;
    min-height: @comfirm-content-height;
    padding: @comfirm-content-padd;
    vertical-align: middle;
    text-align: center;
    border: none;
    background-image: linear-gradient(0, #dddddd, #dddddd 50%, transparent 50%);
    background-size: 100% 2px;
    background-repeat: no-repeat;
    background-position: bottom;
    & .mux-comfirm-content {
      vertical-align: sub;
      line-height: 1;
      color: #999;
    }
  }
  & .mux-comfirm-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & .mux-comfirm-btn {
      flex: 1;
      width: 100%;
      -webkit-appearance: none;
      height: @comfirm-btn-height;
      display: block;
      padding: 0;
      margin: 0;
      border: none;
      outline: 0;
      background-color: @comfirm-bg;
    }
    & .mux-btn-cancel {
      color: @comfirm-cancel-color;
      &:active {
        background-color: @comfirm-bg;
        color: @comfirm-cancel-color;
      }
    }
    & .mux-btn-comfirm {
      color: @comfirm-btn-color;
      &:active {
        background-color: @comfirm-bg;
        color: @comfirm-btn-color;
      }
    }
    & .mux-divider-line {
      width: 1px;
      height: @comfirm-btn-height;
      background-color: #dddddd;
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
