<template>
  <button class="mux-btn" :class="btnClass" :disabled="disable" @click="handleClick">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'v-button',
  props: {
    block: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'normal',
      validator (v) {
        return ['small', 'normal', 'large'].includes(v)
      }
    },
    type: {
      type: String,
      default: 'default',
      validator (v) {
        return ['default', 'primary', 'danger'].includes(v)
      }
    }
  },
  computed: {
    btnClass () {
      return ['mux-btn-' + this.type, 'mux-btn-' + this.size, { 'mux-btn-disable': this.disable, 'mux-btn-block': this.block, 'mux-btn-plain': this.plain }]
    }
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}

</script>
<style lang="less" scoped>
@import url('../../../src/style/variable.less');
.mux-btn {
  position: relative;
  overflow: hidden;
  zoom: 1;
  text-align: center;
  border: none;
  outline: 0;
  display: inline-block;
  margin: 0;
  border-radius: @btn-radius;
  box-sizing: border-box;
  appearance: none;
  &.mux-btn-default {
    background-color: @btn-default-bg;
    color: @btn-default-color;
    border: 1px solid @btn-default-border-color;
    &.mux-btn-plain {
      background-color: transparent;
    }
  }
  &.mux-btn-primary {
    background-color: @btn-primary-bg;
    color: @btn-primary-color;
    border: 1px solid @btn-primary-border-color;
    &.mux-btn-plain {
      background-color: transparent;
      color: @btn-primary-bg;
    }
  }
  &.mux-btn-danger {
    background-color: @btn-danger-bg;
    color: @btn-danger-color;
    border: 1px solid @btn-danger-border-color;
    &.mux-btn-plain {
      background-color: transparent;
      color: @btn-danger-bg;
    }
  }
  &.mux-btn-small {
    font-size: @btn-small;
    padding: @btn-small-padding;
  }
  &.mux-btn-normal {
    font-size: @btn-normal;
    padding: @btn-normal-padding;
  }
  &.mux-btn-large {
    font-size: @btn-large;
    padding: @btn-large-padding;
  }
  &.mux-btn-disable {
    opacity: 0.6;
  }
  &.mux-btn-block {
    display: block;
    width: 100%;
  }
}

</style>
