<template>
  <i class="mxoa-times-icon"></i>
</template>
<script type="text/javascript">
export default {
  name: 'v-times-icon'
}
</script>
<style lang="less" scoped>
.mxoa-times-icon {
  position: relative;
  display: block;
  height: 1.4em;
  width: 1.4em;
  line-height: 1.4em;
  border-radius: 50%;
  vertical-align: middle;
  text-align: center;
  border: 1px solid #ff0000;
  &:before {
    position: absolute;
    content: "";
    background-color: #ff0000;
    height: 1px;
    width: 0.75em;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0) rotate(45deg);
  }
  &:after {
    position: absolute;
    content: "";
    background-color: #ff0000;
    height: 1px;
    width: 0.75em;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0) rotate(135deg);
  }
}

</style>
