<template>
  <div class="mux-switch-container" :class="switchClass" data-role="switch" tabindex="0" @click.stop="handleClick">
    <div class="mux-switch-inner">{{switchTxt}}</div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    checkedValue: {
      type: [String, Number],
      default: 1
    },
    checkedLabel: {
      type: String,
      default: '是'
    },
    unCheckedValue: {
      type: [String, Number],
      default: 0
    },
    unCheckedLabel: {
      type: String,
      default: '否'
    },
    value: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      currentValue: 0
    }
  },
  computed: {
    switchClass() {
      return {
        'mux-switch-checked': this.currentValue === this.checkedValue
      }
    },
    switchTxt() {
      return this.currentValue === this.checkedValue ? this.checkedLabel : this.unCheckedLabel
    }
  },
  created() {
    this.currentValue = this.value
  },
  watch: {
    value(nv, ov) {
      if (nv === ov) { return }
      this.currentValue = nv
    }
  },
  methods: {
    handleClick() {
      this.currentValue = this.currentValue === this.checkedValue ? this.unCheckedValue : this.checkedValue
      this.$emit('input', this.currentValue)
      this.$emit('change', this.currentValue)
    }
  }
}

</script>
<style lang="less">
@switch: ~"mux-switch";
.@{switch} {
  &-container {
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
    margin: 0 0;
    padding: 0;
    position: relative;
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 2.2em;
    min-width: 4.4em;
    line-height: 2em;
    vertical-align: middle;
    border-radius: 8em;
    border: 1px solid transparent;
    background-color: rgba(0, 0, 0, 0.25);
    cursor: pointer;
    -webkit-transition: all 0.36s;
    transition: all 0.36s;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    &:after {
      position: absolute;
      width: 1.8em;
      height: 1.8em;
      left: .1em;
      top: .1em;
      border-radius: 100%;
      background-color: #fff;
      content: " ";
      cursor: pointer;
      -webkit-transition: all 0.36s cubic-bezier(0.78, 0.14, 0.15, 0.86);
      transition: all 0.36s cubic-bezier(0.78, 0.14, 0.15, 0.86);
      -webkit-box-shadow: 0 .2em .4em 0 rgba(0, 35, 11, 0.2);
      box-shadow: 0 .2em .4em 0 rgba(0, 35, 11, 0.2);
    }
  }
  &-checked {
    background-color: #1890ff;
    &:after {
      left: 100%;
      -webkit-transform: translateX(-100%);
      -ms-transform: translateX(-100%);
      transform: translateX(-100%);
      margin-left: -0.1em;
    }
  }

  &-inner {
    color: #fff;
    font-size: 1.2em;
    margin-left: 2.4em;
    margin-right: .6em;
    display: block;
  }

  &-checked &-inner {
    margin-left: .6em;
    margin-right: 2.4em;
  }
}

</style>
