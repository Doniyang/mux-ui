<template>
  <section class="mux-tab-wrapper">
    <div class="mux-tab-container">
      <slot></slot>
    </div>
    <div class="mux-tab-bar" :style="barStyle"></div>
  </section>
</template>
<script type="text/javascript">
export default {
  props: {
    barWidth: {
      type: Number,
      default: 70
    }
  },
  data () {
    return {
      hasReady: false,
      currentIndex: -1,
      barLeft: 0,
      transformAxias: 0
    }
  },
  computed: {
    barStyle () {
      return {
        width: this.barWidth + 'px',
        left: this.barLeft + 'px'
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$children.length > 0) {
        this.setChildrenKey()
      }
    })
  },
  updated () {
    this.$nextTick(() => {
      if (!this.hasReady && this.$children.length > 0) {
        this.setChildrenKey()
      }
    })
  },
  watch: {
    currentIndex (nv, ov) {
      if (this.$children[ov]) { this.$children[ov].currentSelected = false }
      this.updateBarPosition(nv)
    }
  },
  methods: {
    setChildrenKey () {
      this.$children.forEach((item, index) => {
        item.keyIndex = index
        if (item.currentSelected) {
          this.currentIndex = index
        }
      })
      this.hasReady = true
    },
    updateSelected (index) {
      this.currentIndex = index
    },
    updateBarPosition (curIndex) {
      let left = 0
      const self = this
      this.$children.forEach((item, index) => {
        if (index < curIndex) {
          left += item.$el.getBoundingClientRect().width
        }
        if (index === curIndex) {
          left += (item.$el.getBoundingClientRect().width - self.barWidth) / 2
        }
      })
      this.barLeft = left
    }
  }
}

</script>
<style lang="less" scoped>
@tab: ~"mux-tab";
.@{tab} {
  &-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    zoom: 1;
    box-sizing: border-box;
    background: #FFFFFF;
  }
  &-container {
    display: flex;
    height: 52px;
    flex-wrap: nowrap;
    align-items: center;
    overflow: hidden;
    transition: all .2s;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &-bar {
    position: absolute;
    bottom: 0;
    height: 3px;
    min-width: 40px;
    border-radius: 5px;
    transition: left .2s;
    background: -webkit-linear-gradient(left, #7956EE, #2EB7FD);
    background: -o-linear-gradient(right, #7956EE, #2EB7FD);
    background: -moz-linear-gradient(right, #7956EE, #2EB7FD);
    background: linear-gradient(to right, #7956EE, #2EB7FD);
  }
}

</style>
