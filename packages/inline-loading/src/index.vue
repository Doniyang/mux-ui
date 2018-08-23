<template>
  <div class="inline-loading-container" v-if="isVisible">
    <div class="inline-loading-bounce" :style="bounceStyle"></div>
    <div class="inline-loading-bounce" :style="bounceStyle"></div>
    <div class="inline-loading-bounce" :style="bounceStyle"></div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: true
    },
    bounceStyle: {
      type: Object,
      default: () => {}
    }
  }
}

</script>
<style lang="less" scoped>
@loading: ~"inline-loading";
.@{loading} {
  &-container {
    display: block;
    margin: 0 auto 0;
    text-align: center;
  }
  &-bounce {
    width: 16px;
    height: 16px;
    background-color: #26a2ff;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
    animation: bouncedelay 1.4s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    &:nth-child(1) {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }
    &:nth-child(2) {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }
  }
}

@-webkit-keyframes bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0.0)
  }
  40% {
    -webkit-transform: scale(1.0)
  }
}

@keyframes bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  }
  40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}

</style>
