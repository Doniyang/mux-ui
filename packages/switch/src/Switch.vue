<template>
  <label class="mux-switch-container" :class="switchClass" data-role="switch">
    <input type="checkbox" class="mux-switch-input" v-model="currentChecked">
    <span class="mux-switch-inner">{{switchTxt}}</span>
  </label>
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
      currentChecked: false
    }
  },
  computed: {
    switchClass() {
      return {
        'mux-switch-checked': this.currentChecked
      }
    },
    switchTxt() {
      return this.currentChecked ? this.checkedLabel : this.unCheckedLabel
    }
  },
  mounted() {
    this.updateCheckedState(this.value)
  },
  watch: {
    value(nv, ov) {
      if (nv === ov) { return }
      this.updateCheckedState(nv)
    },
    currentChecked(nv, ov) {
      if (nv === ov) return
      this.handleChange(nv)
    }
  },
  methods: {
    updateCheckedState(value) {
      this.currentChecked = value === this.checkedValue
    },
    handleChange(isChecked) {
      this.$emit('input', isChecked ? this.checkedValue : this.unCheckedValue)
    }
  }
}

</script>
<style lang="less">
@switch: ~"mux-switch";

.@{switch} {
  &-container {
    position: relative;
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 28px;
    width: 80px;
    color: rgba(0, 0, 0, 0.65);
    overflow: hidden;
    line-height: 28px;
    border-radius: 16px;
    text-align: right;
    padding-right: 12px;
    background-color: rgba(0, 0, 0, 0.25);
    -webkit-transition: all 0.36s;
    transition: all 0.36s;

    &:after {
      position: absolute;
      width: 22px;
      height: 22px;
      left: 3px;
      top: 3px;
      border-radius: 100%;
      background-color: #fff;
      content: " ";
      cursor: pointer;
      -webkit-transition: all 0.36s cubic-bezier(0.78, 0.14, 0.15, 0.86);
      transition: all 0.36s cubic-bezier(0.78, 0.14, 0.15, 0.86);
      -webkit-box-shadow: 0 4px 8px 0 rgba(0, 35, 11, 0.2);
      box-shadow: 0 4px 8px 0 rgba(0, 35, 11, 0.2);
    }
  }

  &-checked {
    background-color: #1890ff;
    text-align: left;
    padding-left: 12px;

    &:after {
      left: 100%;
      -webkit-transform: translateX(-100%);
      -ms-transform: translateX(-100%);
      transform: translateX(-100%);
      margin-left: -2px;
    }
  }

  &-input {
    display: none;
  }

  &-inner {
    color: #fff;
    width: 100%;
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
  }
}

</style>
