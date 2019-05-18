<template>
  <section class="hz-radio-group" :class="{'hz-radio-block':block}">
    <slot></slot>
  </section>
</template>
<script type="text/javascript">
export default {
  props: {
    labelPosition: {
      type: String,
      default: 'left'
    },
    block: {
      type: Boolean,
      default: false
    },
    value: String
  },
  watch: {
    value(nv, ov) {
      if (nv === ov) { return }
      this.updateChildrenNode(nv)
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$children.length > 0) {
        this.$children.forEach(vm => {
          vm.position = this.labelPosition
          if (this.value) { vm.updateCheckedState(this.value) }
        })
      }
    })
  },
  methods: {
    updateChildrenNode(value) {
      if (this.$children.length > 0) {
        this.$children.forEach(vm => { vm.updateCheckedState(value) })
      }
    }
  }

}

</script>
<style lang="less" scoped>
.hz-radio-group {
  position: relative;
  display: flex;
  overflow: hidden;
  flex-wrap: nowrap;
  align-items: center;
}

.hz-radio-block {
  width: 100%;
  flex-direction: column;
  align-items: flex-start;

  &>.hz-radio-container {
    height: 3em;
    width: 100%;
    border-bottom: 1px solid #dcdcdc;

    @media screen and (-webkit-min-device-pixel-ratio: 1.5) {
      border: none;
      background-size: 100% 1px;
      background-repeat: no-repeat;
      background-position: bottom;
      background-image: linear-gradient(0, #dcdcdc, #dcdcdc 50%, transparent 50%);
      background-image: -webkit-linear-gradient(90deg, #dcdcdc, #dcdcdc 50%, transparent 50%);
    }
  }
}

</style>
