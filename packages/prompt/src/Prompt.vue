<template>
  <transition name>
    <section class="mux-prompt-wrapper" v-if="value">
      <div class="mux-prompt-header"> <span class="mux-prompt-title">{{title}}</span> </div>
      <div class="mux-prompt-main">
        <div class="mux-prompt-content">
          <input :type="inputType" class="mux-prompt-input" :class="{'mux-error-input':isError}" :placeholder="placeHolder" v-model="promptContent"/>
        </div>
      </div>
      <div class="mux-prompt-footer">
        <button type="button" class="mux-prompt-btn mux-btn-cancel" @click="handleClick('cancel')">{{cancelBtnText}}</button>
        <button type="button" class="mux-prompt-btn mux-btn-prompt" @click="handleClick('prompt')">{{promptBtnText}}</button>
      </div>
    </section>
  </transition>
</template>
<script type="text/babel">
import MaskMixin from '@/mixins/mask'
export default{
  name: 'v-prompt',
  props: {
    title: {
     	type: String,
      default: ''
    },
    placeHolder: {
      type: String,
      default: '请输入'
    },
    inputType: {
      type: String,
      default: 'text',
      validator (t) {
        return ['text', 'password', 'email', 'url', 'number'].includes(t)
      }
    },
    validate: Function,
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    promptBtnText: {
      type: String,
      default: '确定'
    }
  },
  mixins: [MaskMixin],
  data () {
    return {
      isError: false,
      promptContent: '',
      callBack: null
    }
  },
  methods: {
    handleClick (type) {
      if (type === 'prompt') {
        this.validator()
        this.$nextTick(() => {
          if (!this.isError) {
            this.value = false
            this.callBack(type, this.promptContent)
          }
        })
      } else {
        this.value = false
        this.callBack(type)
      }
    },
    validator () {
      this.isError = this.validate && this.validate(this.promptContent)
    }

  }
}
</script>
<style lang="less" scoped>
@import url('../../../src/style/variable.less');
.mux-prompt-wrapper {
  position: fixed;
  z-index: @zIndex;
  background-color: @prompt-bg;
  -webkit-user-select: none;
  top: 50%;
  left: 50%;
  width: 75%;
  border-radius: @prompt-border-radius;
  transform: translate3d(-50%, -50%, 0);
  overflow: hidden;
  transition: all .2s;
  & .mux-prompt-header {
    padding: @prompt-header-padd-top 0 0;
    box-sizing: border-box;
    text-align: center;
    & .mux-prompt-title {
      padding: 0;
      margin: 0;
      display: inline-block;
      font-size: @prompt-font-size;
      font-weight: 600;
    }
  }
  & .mux-prompt-main {
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
    & .mux-prompt-content {
    	padding: 0;
    	box-sizing: border-box;
      & .mux-prompt-input{
      
    }
    }
  }
  & .mux-prompt-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & .mux-prompt-btn {
      display: block;
      position: relative;
      width: 100%;
      flex-shrink: 1;
      text-align: center;
      padding: 0;
      margin: 0;
      outline: 0;
      border: none;
      -webkit-appearance: none;
      height: @prompt-btn-height;
      background-color: @prompt-bg;
    }
    & .mux-btn-cancel {
      color: @prompt-cancel-color;
      border-right: 1px solid #dddddd;
      &:active {
        background-color: @prompt-bg;
        color: @prompt-cancel-color;
      }
    }
    & .mux-btn-prompt {
      color: @prompt-btn-color;
      &:active {
        background-color: @prompt-bg;
        color: @prompt-btn-color;
      }
    }
  }
}

</style>
