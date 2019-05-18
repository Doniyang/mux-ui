<template>
  <label class="hz-radio-container">
    <div class="hz-radio-box">
      <input type="radio" :name="name" class="hz-radio-block" :checked="currentChecked" :disabled="disabled" @change="handleChange">
    </div>
    <div class="hz-radio-label">
      <slot></slot>
    </div>
  </label>
</template>
<script type="text/javascript">
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      name: 'XRadio'
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: String,
    position: {
      type: String,
      default: 'left',
      vadidator (v) {
        return ['left', 'right'].indexOf(v) > -1
      }
    }
  },
  data () {
    return {
      currentChecked: false
    }
  },
  created () {
    this.currentChecked = this.checked
  },
  watch: {
    value (nv, ov) {
      if (nv === ov) { return }
      this.updateCheckedState(nv)
    },
    checked (nv, ov) {
      if (nv === ov) { return }
      this.setRadioValue (nv) 
    }
  },
  methods: {
    handleChange (e) {
      const target = e.target || e.srcElement
      this.setRadioValue(target.checked)
    },
    setRadioValue (isChecked) {
      if (isChecked) {
        this.$emit('input', this.label)
        this.$parent.$emit('input', this.label)
      }
    },
    updateCheckedState (value) {
      this.currentChecked = this.label === value
    }
  }
}
</script>
<style lang="less" scoped>
@radio: ~"hz-radio";
@bglist: #aaaaaa,
  #3598db,
  #FFFFFF;

.@{radio} {
  &-container {
    flex: 1;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    overflow: hidden;
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }
  }

  &-box {
    display: block;
    overflow: hidden;
  }

  &-label {
    display: block;
    overflow: hidden;
    padding-left: 5px;
    font-size: 15px;
    color: #0c0c0c;
  }

  &-block {
    position: relative;
    vertical-align: sub;
    display: inline-block;
    width: 20px;
    height: 20px;
    outline: 0;
    -webkit-appearance: none;
    appearance: none;
    background-color: extract(@bglist, 3);
    border: 1px solid extract(@bglist, 1);
    border-radius: 50%;
    -webkit-transition: all .3s;
    transition: all .3s;

    &:checked {
      background-color: extract(@bglist, 2);
      border-color: extract(@bglist, 2);
      background-clip: padding-box;

      &:after {
        -webkit-border-radius: 0;
        border-radius: 0;
        -webkit-transform: rotate(-45deg) scale(1);
        -ms-transform: rotate(-45deg) scale(1);
        transform: rotate(-45deg) scale(1);
        position: absolute;
        width: 0.5rem;
        height: 0.25rem;
        top: 50%;
        left: 50%;
        margin-left: -0.25rem;
        margin-top: -0.25rem;
        background: transparent;
        border: 1px solid #ffffff;
        border-top: none;
        border-right: none;
        content: " ";
        -webkit-transition: all .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
        transition: all .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
      }
    }
  }
}

</style>
