<template>
  <section class="mux-input-wrapper">
    <div class="mux-input-label">
      <slot name="label"><span></span></slot>
    </div>
    <div class="mux-input-container">
      <span class="mux-input-icon"><slot name="icon"></slot></span>
      <input :type="type" :name="name" class="mux-input-block">
      <span class="mux-input-times"><i class=""></i></span>
    </div>
  </section>
</template>
<script type="text/javascript"></script>
<style lang="less" scoped>
@input: ~"mux-input";
.@{input} {
  &-wrapper {
    position: relative;
    display: flex;
    width: 100%;
    flex-wrap: nowrap;
    align-items: center;
    overflow: hidden;
    zoom: 1;
  }
  &-label {
    display: block;
    flex: 1;
  }
  &-container {
    position: relative;
    box-sizing: border-box;
    display: block;
    width: 100%;
    overflow: hidden;
    zoom: 1;
    border: 1px solid #DEDEDE;
    border-radius: 4px;
  }
  &-block {
    display: block;
    height: 42px;
    width: 100%;
    padding: 0 10px;
    border: none;
    outline: none;
    box-sizing: border-box;
  }
}

</style>
