<template>
  <span class="mxoa-radio-wrapper">
     <input type="radio" :name="name" class="mxoa-radio-input" :checked="radioCheck" @change="handleChange($event)">
  </span>
</template>
<script>
export default {
  name: 'v-radio',
  props: {
    name: {
      type: String,
      default: 'RADIOICON'
    },
    radioCheck: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChange (e) {
      let target = e.target || e.srcElement
      this.$emit('change', target.checked)
    }
  }
}
</script>
<style lang="less" scoped>
@radio: ~"mxoa-radio";
@radioBg: #FFFFFF;
@radioBorderColor: #aaaaaa;
@radioCheckBorderColor: #3598db;
.@{radio} {
  &-wrapper {
    position: relative;
    display: inline-block;
    overflow: hidden;
    zoom: 1;
    line-height: 1;
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
    background-color: @radioBg;
    border: 1px solid @radioBorderColor;
    border-radius: 50%;
    -webkit-transition: all .3s;
    transition: all .3s;
    &:hover {
      border-color: @radioCheckBorderColor;
    }
    &:checked {
      border: 1px solid @radioBorderColor;
      &:after {
        position: absolute;
        display: table;
        height: 1em;
        width: 1em;
        left: 50%;
        top: 50%;
        border-radius: 50%;
        content: " ";
        -webkit-transform: translate3d(-50%, -50%, 0);
        transform: translate3d(-50%, -50%, 0);
        background-color: @radioCheckBorderColor;
        border: none;
      }
    }
  }
}

</style>
