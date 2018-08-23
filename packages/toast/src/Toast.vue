<template>
  <div class="mux-toast-wrapper">
    <div class=mux-toast-container v-if="visible">
      <div class="mux-toast-icons"></div>
      <div class="mux-toast-tips">{{message}}</div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      message: ''
    }
  },
  created() {
    this.message = this.text
  }
}

</script>
<style lang="less" scoped>
@toast: ~"mux-toast";
.@{toast} {
  &-wrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 2018;
    transform: translate3d(-50%, -50%, 0);
  }
  &-container {
    position: relative;
    min-width: 7.6em;
    min-height: 7.6em;
    padding: 1.5em 0;
    border-radius: 0.5em;
    background: rgba(17, 17, 17, 0.7);
    ;
  }
  &-icons {
    display: block;
    position: relative;
    width: 3.6em;
    height: 3.6em;
    border: 0.1em solid #FFFFFF;
    border-radius: 100%;
    box-sizing: border-box;
    padding: 0;
    margin: 0 auto;
    &:before,
    &:after {
      position: absolute;
      content: "";
      width: 2.6em;
      height: 0.1em;
      background: #FFFFFF;
      top: 50%;
      left: 50%;
      margin-top: -0.05em;
      margin-left: -1.3em;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  &-tips {
    padding: 1em 1em 0;
    text-align: center;
    font-size: 1.5em;
    color: #FFFFFF;
  }
}

</style>
