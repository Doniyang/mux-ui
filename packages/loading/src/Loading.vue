<template>
  <div class="hz-loading-wrapper">
    <div class="hz-loading-container">
      <div class="hz-loading-box" v-if="isVisible">
        <div class="hz-loading-circle">
          <img src="../icons/circle.png" class="hz-loading-img">
        </div>
        <div class="hz-loading-logo">
          <img src="../icons/logo.png" class="hz-loading-img">
        </div>
        <div class="hz-loading-tips">
          <p class="hz-loading-text">{{loadTips}}</p>
        </div>
      </div>
    </div>
    <div class="hz-loading-mask"></div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'loading'
    }
  },
  data() {
    return {
      isVisible: false,
      loadTips: '',
      closed: false
    }
  },
  created() {
    this.isVisible = this.visible
    this.loadTips = this.text
  },
  methods: {
    show() {
      this.isVisible = true
    },
    close() {
      this.isVisible = false
    }
  }
}

</script>
<style lang="less" scoped>
@loading: ~"hz-loading";
.@{loading} {
  &-wrapper {
    position: relative;
    padding: 0;
    margin: 0;
  }
  &-container {
    position: fixed;
    top: 50%;
    left: 50%;
    min-width: 16em;
    z-index: 2017;
    background: #FFFFFF;
    border-radius: 0.5em;
    transform: translate3d(-50%, -50%, 0);
  }
  &-box {
    position: relative;
    overflow: hidden;
    zoom: 1;
    box-sizing: border-box;
    &:before,
    &:after {
      display: table;
      content: "";
      box-sizing: border-box;
    }
    &:after {
      clear: both;
    }
  }
  &-circle {
    height: 3.6em;
    width: 3.6em;
    top: 2.2em;
    left: 50%;
    margin-left: -1.8em;
    border-radius: 50%;
    position: absolute;
    box-sizing: border-box;
    animation: rond 2s infinite;
    -webkit-animation: rond 2s infinite;
  }
  &-logo {
    position: relative;
    margin: 3em auto 2em;
    width: 1.7em;
    height: 1.8em;
    box-sizing: border-box;
    border-radius: 50%;
  }
  &-img {
    height: 100%;
    width: 100%;
  }
  &-tips {
    position: relative;
    padding-bottom: 1.5em;
  }
  &-text {
    color: #999999;
    font-family: calibri;
    text-align: center;
    font-size: 1.5em;
  }
  &-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2016;
    background: rgba(0, 0, 0, 0.15);
  }
}

@keyframes rond {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes rond {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

</style>
