<template>
  <section class="hz-scroll-wrapper" :style="{height:wrapperHeight+'px'}" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <header class="hz-refresh-container">
      <slot name="pull-refresh" :state="state">
        <div class="down-tip" v-if="state===0">下拉更新</div>
        <div class="up-tip" v-if="state===1">松开更新</div>
        <div class="refresh-tip" v-if="state===2">更新中</div>
      </slot>
    </header>
    <main class="hz-scroll-container" :class="{'hz-scroll-touch':touching}" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
      <slot></slot>
      <footer class="hz-load-container">
        <slot name="load-more">
          <span>加载中。。。</span>
        </slot>
      </footer>
    </main>
  </section>
</template>
<script>
export default {
  props: {
    offset: {
      type: Number,
      default: 68
    },
    isNoMore: {
      type: Boolean,
      default: false
    },
    enableInfinite: {
      type: Boolean,
      default: true
    },
    enableRefresh: {
      type: Boolean,
      default: true
    },
    refreshThreshold: {
      type: Number,
      default: 40
    },
    infiniteThreshold: {
      type: Number,
      default: 20
    },
    onRefresh: {
      type: Function,
      default: undefined,
      required: false
    },
    onInfinite: {
      type: Function,
      default: undefined,
      require: false
    }
  },
  data() {
    return {
      top: 0,
      state: 0,
      startY: 0,
      scrollY: 0,
      direction: 0,
      touching: false,
      infiniteLoading: false
    }
  },
  computed: {
    wrapperHeight() {
      let maxheight = document.documentElement.clientHeight || document.body.clientHeight
      return (maxheight - this.offset)
    }
  },
  methods: {
    handleTouchStart(e) {
      e.preventDefault()
      this.startY = e.targetTouches[0].pageY
      this.touching = true
    },
    handleTouchMove(e) {
      e.preventDefault()
      if (!this.touching || this.state === 2 || this.state === 5) { return }
      const deltaY = e.targetTouches[0].pageY - this.startY
      this.direction = deltaY > 0 ? 1 : deltaY < 0 ? -1 : 0
      this.top = deltaY + this.scrollY
      this.updatePullState(deltaY)
    },
    handleTouchEnd(e) {
      e.preventDefault()
      this.touching = false
      if (this.direction === 1) {
        this.handlePullDown()
      }
      if (this.direction === -1) {
        this.handlePullUp()
      }
    },

    handlePullDown() {
      if (!this.enableRefresh) { return }
      if (this.state === 1) {
        this.updatePullDown()
      } else {
        this.finishPullDown()
      }
    },
    handlePullUp() {
      if (this.state === 4) {
        this.updatePullUp()
      } else {
        this.finishPullUp()
      }
    },
    updatePullDown() {
      this.state = 2
      this.top = this.refreshThreshold
      this.onRefresh(this.finishPullDown)
    },
    finishPullDown() {
      this.scrollY = 0
      this.state = 0
      this.top = 0
    },
    updatePullUp(){
        this.state = 5
       this.onInfinite(this.finishPullUp)
    },
    finishPullUp(){
      this.state = 3
    },
    updatePullState(deltaY) {
      if (deltaY > 0) {
        this.state = this.top >= this.refreshThreshold ? 1 : 0
      }
      if (deltaY < 0) {
        this.state = (Math.abs(this.top) - this.wrapperHeight) >= this.infiniteThreshold ? 4 : 3
      }
    }
  }
}

</script>
<style lang="less" scoped>
@scroll: ~"hz-scroll";
@refresh: ~"hz-refresh";
@load: ~"hz-load";
.setClearfix() {
  position: absolute;
  display: table;
  content: "";
  box-sizing: border-box;
}

.@{scroll} {
  &-wrapper {
    position: relative;
    overflow: hidden;
    zoom: 1;
    height: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-overflow-scrolling: touch;
    transition: all .2s;
    &:before,
    &:after {
      .setClearfix()
    }
    &:after {
      clear: both;
    }
  }

  &-container {
    position: relative;
    display: block;
    transition-duration: 300ms;
  }
  &-touch {
    transition-duration: 0ms;
  }
}

.@{refresh} {
  &-container {
    position: absolute;
    left: 0;
    right: 0;
    display: block;
    text-align: center;
    transform: scale(1);
    transition: all .1s;
  }
}

.@{load} {
  &-container {
    position: relative;
    display: block;
    min-height: 40px;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

</style>
