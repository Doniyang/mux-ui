<template>
  <span class="mux-checkbox-wrapper">
    <input type="checkbox" class="mux-checkbox-input" :class="{'mux-checkbox-some':indeterminate}" :value="value" :checked="isChecked" @change="handleChange">
  </span>
</template>
<script>
export default {
  name: 'v-check',
  props: {
    indeterminate: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    checked: Boolean
  },
  data () {
    return {
      isChecked: false
    }
  },
  created () {
    this.isChecked = this.checked
  },
  watch: {
    checked (nv, ov) {
      if (nv === ov) { return }
      this.isChecked = nv
    }
  },
  methods: {
    handleChange (ev) {
      let target = ev.target || ev.srcElement
      this.$emit('change', target.checked)
    }
  }
}
</script>
<style lang="less" scoped>
@checkbox: ~"mux-checkbox";
@bglist: #aaaaaa,
#3598db,
#FFFFFF;

.setBoxChecked(@n) {
  -webkit-transform: rotate(45deg) scale(1);
  -ms-transform: rotate(45deg) scale(1);
  transform: rotate(45deg) scale(1);
  position: absolute;
  display: table;
  height: 0.7em;
  width: 0.4em;
  left: 0.45em;
  top: 0.2em;
  border: 1px solid extract(@bglist, @n);
  border-top: 0;
  border-left: 0;
  content: " ";
  -webkit-transition: all .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
  transition: all .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
}

.@{checkbox} {
  &-wrapper {
    position: relative;
    display: inline-block;
    line-height: 1;
    overflow: hidden;
    vertical-align: middle;
  }
  &-input {
    position: relative;
    vertical-align: middle;
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    -webkit-appearance: none;
    appearance: none;
    background-color: extract(@bglist, 3);
    border: 1px solid extract(@bglist, 1);
    border-radius: 50%;
    -webkit-transition: all .3s;
    transition: all .3s;
    &:hover {
      border-color: extract(@bglist, 2);
    }
    &:checked {
      background-color: extract(@bglist, 2);
      border-color: extract(@bglist, 2);
      &:after {
        .setBoxChecked(3);
      }
    }
  }
  &-some {
    border-color: extract(@bglist, 2);
    &:after {
      .setBoxChecked(2);
    }
  }
}

</style>
