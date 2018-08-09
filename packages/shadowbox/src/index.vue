<template>
  <div class="mux-shadowbox-container">
    <slot></slot>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'mx-shadow-box'
}

</script>
<style lang="less" scoped>
.mux-shadowbox-container {
  display: block;
  overflow: hidden;
  zoom: 1;
  margin: 0;
  padding: 0;
  border-radius: 0.5em;
  background-color: #FFFFFF;
  -moz-box-shadow: 0 0.3em 0.6em 0px rgba(43, 183, 255, 0.15);
  -webkit-box-shadow: 0 0.3em 0.6em 0px rgba(43, 183, 255, 0.15);
  box-shadow: 0 0.3em 0.6em 0px rgba(43, 183, 255, 0.15);
}

</style>
