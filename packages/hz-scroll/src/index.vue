<template>
  <div class="mux-scroll-wrapper" :style="scrollStyle">
    <div class="mux-scroll-container">
      <slot></slot>
      <slot name="pullup" :is-pullup="isPullup" :is-no-more="isNoMore" :is-pullup-loading="isPullupLoading">
        <div class="mux-pullup-container" v-if="isPullup">
          <div class="mux-pullup-nodata" v-if="isNoMore">
            <span>{{noMoreTxt}}</span>
          </div>
          <div class="mux-pullup-more" v-else>
            <div class="mux-pullup-loading" v-if="isPullupLoading">
              <inline-loading></inline-loading>
            </div>
            <div class="mux-pullup-tips" v-else>
              <span>{{pullupTxt}}</span>
            </div>
          </div>
        </div>
      </slot>
    </div>
    <slot name="pulldown" :is-pulldowm="isPulldown" :pulldown-style="pulldownStyle" :is-prior-pulldown="isPriorPulldown" :is-pulldown-loading="isPulldownLoading" :dir-y="dirY">
      <div class="mux-pulldown-container" :style="pulldownStyle" v-if="isPulldown">
        <div class="mux-before-pulldown" v-if="isPriorPulldown">
          <spinner :y="dirY"></spinner>
        </div>
        <div class="mux-after-pulldown" v-else>
          <div class="mux-pulldown-loading" v-if="isPulldownLoading">
            <inline-loading></inline-loading>
          </div>
          <div class="mux-pulldown-fresh" v-else>{{pulldowmTxt}}</div>
        </div>
      </div>
    </slot>
  </div>
</template>
<script type="text/javascript">
import BScroll from 'better-scroll'
import Spinner from '@/components/spinner'
import InlineLoading from '@/components/inline-loading'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 0
    },
    isNoMore: {
      type: Boolean,
      default: false
    },
    probeType: {
      type: Number,
      default: 2
    },
    lockClick: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: false
    },
    lockBeforeScroll: {
      type: Boolean,
      default: false
    },
    lockScrollEnd: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'vertical',
      validator (v) {
        return ['vertical', 'horizontal'].indexOf(v) > -1
      }
    },
    scrollbar: {
      type: [Object, Boolean],
      default: false
    },
    pullDownRefresh: {
      type: [Object, Boolean],
      default: false
    },
    pullUpLoad: {
      type: [Object, Boolean],
      default: false
    },
    startY: {
      type: Number,
      default: 0
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    freeScroll: {
      type: Boolean,
      default: false
    },
    mouseWheel: {
      type: Boolean,
      default: false
    },
    bounce: {
      default: true
    },
    zoom: {
      default: false
    }
  },
  components: {
    InlineLoading,
    Spinner
  },
  data () {
    return {
      isPullup: false,
      isPulldown: false,
      isPriorPulldown: false,
      isFinishPulldown: false,
      isPulldownLoading: false,
      isPulldownRefresh: false,
      isPulldownRebound: false,
      isPullupMore: false,
      isPullupLoading: false,
      isFinishPullup: false,
      pulldownStyle: { top: '-56px' },
      dirY: 0,
      initThreshold: -56,
      scroll: null
    }
  },
  computed: {
    pullupTxt () {
      return (this.pullUpLoad && this.pullUpLoad.moreTxt) || '上拉加载更多'
    },
    noMoreTxt () {
      return (this.pullUpLoad && this.pullUpLoad.noMoreTxt) || '没有更多数据'
    },
    pulldowmTxt () {
      return (this.pullDownRefresh && this.pullDownRefresh.txt) || '刷新成功'
    },
    scrollStyle () {
      let maxheight = document.documentElement.clientHeight || document.body.clientHeight
      return { height: (maxheight - this.interval) + 'px' }
    }
  },
  watch: {
    value (nv, ov) {
      if (nv === ov) { return }
      this.fetchCompleted(nv)
    },
    isFinishPulldown (nv, ov) {
      if (nv === ov) { return }
      this.pulldownUpdate(nv)
    },
    isFinishPullup (nv, ov) {
      if (nv === ov) { return }
      this.pullupUpdate(nv)
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.initScroll()
      }
    })
  },
  destroyed () {
    this.scroll && this.scroll.destroy()
  },
  methods: {
    initScroll () {
      let options = {
        probeType: this.probeType,
        click: this.lockClick,
        scrollY: this.freeScroll || this.direction === 'vertical',
        scrollX: this.freeScroll || this.direction === 'horizontal',
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        startY: this.startY,
        freeScroll: this.freeScroll,
        mouseWheel: this.mouseWheel,
        bounce: this.bounce,
        zoom: this.zoom
      }
      this.scroll = new BScroll(this.$el, options)
      if (this.lockScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }
      if (this.lockScrollEnd) {
        this.scroll.on('scrollEnd', (pos) => {
          this.$emit('scroll-end', pos)
        })
      }
      if (this.lockBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('before-scroll-start')
        })
        this.scroll.on('scrollStart', () => {
          this.$emit('scroll-start')
        })
      }
      if (this.pullDownRefresh) {
        this.isPulldown = true
        this.initPullDown()
      }
      if (this.pullUpLoad) {
        this.isPullup = true
        this.initPullUp()
      }
    },
    initPullDown () {
      this.scroll.on('scrollStart', () => {
        this.isPriorPulldown = true
      })
      this.scroll.on('pullingDown', () => {
        this.isPriorPulldown = false
        this.isPulldownRefresh = true
        this.isPulldownLoading = true
        this.$emit('pulling-down')
      })
      this.scroll.on('scroll', (pos) => {
        if (!this.pullDownRefresh) {
          return
        }
        if (this.isPriorPulldown) {
          this.dirY = Math.max(0, pos.y + this.initThreshold)
          this.pulldownStyle = `top:${Math.min(pos.y + this.initThreshold, 10)}px`
        } else {
          this.dirY = 0
        }
        if (this.isPulldownRebound) {
          this.pulldownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
        }
      })
    },
    initPullUp () {
      this.scroll.on('pullingUp', () => {
        if (this.isNoMore) { return }
        this.isPullupMore = true
        this.isPullupLoading = true
        this.$emit('pulling-up')
      })
    },
    fetchCompleted (isComplete) {
      if (isComplete) {
        if (this.isPulldownRefresh) {
          this.isPulldownLoading = false
          this.isFinishPulldown = true
        }
        if (this.isPullupMore) {
          this.isPullupLoading = false
          this.isFinishPullup = true
        }
      } else {
        this.isFinishPulldown = false
        this.isFinishPullup = false
      }
    },
    pulldownUpdate (isComplete) {
      if (isComplete) {
        const { delay = 600 } = this.pullDownRefresh
        setTimeout(() => {
          this.isPulldownRebound = true
          this.scroll.finishPullDown()
          this.pulldownComplete()
        }, delay)
      } else {
        this.refresh()
      }
    },
    pulldownComplete () {
      setTimeout(() => {
        this.pulldownStyle = `top:${this.initThreshold}px`
        this.isPulldownRebound = false
        this.isPulldownRefresh = false
        this.$emit('input', false)
      }, this.scroll.options.bounceTime)
    },
    pullupUpdate (isComplete) {
      if (isComplete) {
        this.$nextTick(() => {
          this.isPullupMore = false
          this.scroll.finishPullUp()
          this.$emit('input', false)
        })
      } else {
        this.refresh()
      }
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    destroy () {
      this.scroll.destroy()
    }
  }
}

</script>
<style lang="less" scoped>
@scroll: ~"mux-scroll";
@pullup: ~"mux-pullup";
@pulldown: ~"mux-pulldown";
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
  }
}

.@{pullup} {
  &-container {
    position: relative;
    display: block;
    min-height: 40px;
    transform: translate3d(0, 0, 0) scale(1);
  }
  &-nodata {
    display: block;
    font-size: 16px;
    color: #5077aa;
    padding: 12px 0;
    text-align: center;
  }
  &-more {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  &-tips {
    font-size: 16px;
    color: #5077aa;
    padding: 12px 0;
    text-align: center;
  }
  &-loading {
    padding: 12px 0;
    text-align: center;
  }
}

.@{pulldown} {
  &-container {
    position: absolute;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(1);
    transition: all .1s;
    & .mux-before-pulldown {
      text-align: center;
    }
    & .mux-after-pulldown {
      margin: 10px 0 0;
    }
  }
  &-loading {
    text-align: center;
  }
  &-fresh {
    font-size: 16px;
    color: #5077aa;
    text-align: center;
  }
}

</style>
