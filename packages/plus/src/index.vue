<template>
  <i class="mux-plus-icon"></i>
</template>
<script>
export default {
  name: 'v-plus-icon'
}
</script>
<style lang="less" scoped>
@iconColor: #0796e2;
.mux-plus-icon {
  display: inline-block;
  position: relative;
  width: 1.5em;
  height: 1.5em;
  line-height: 1.5em;
  border-radius: 50%;
  vertical-align: sub;
  border: 1px solid @iconColor;
  &:before {
    position: absolute;
    content: "";
    left: 50%;
    top: 50%;
    height: 1px;
    width: 0.8em;
    background: @iconColor;
    transform: translate3d(-50%,-50%,0);
  }
  &:after {
    position: absolute;
    content: "";
    width: 1px;
    height: 0.8em;
    left: 50%;
    top: 50%;
    background: @iconColor;
    transform: translate3d(-50%,-50%,0);
  }
}

</style>