<template>
  <section class="mux-card-wrapper">
    <header class="mux-card-header" v-if="hasTitle">
      <slot name="header">
        <span>{{title}}</span>
      </slot>
    </header>
    <main class="mux-card-main">
      <slot name="content">
        <span>{{content}}</span>
      </slot>
    </main>
    <footer class="mux-card-footer">
      <slot name="footer">
        <span>{{footer}}</span>
      </slot>
    </footer>
  </section>
</template>
<script type="text/javascript">
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    footer: {
      type: String,
      default: ''
    },
    hasTitle: {
      type: Boolean,
      default: false
    }
  }
}

</script>
<style lang="less" scoped>
@card: ~"mux-card";
.setClearFix() {
  display: table;
  content: "";
  box-sizing: border-box;
}

.@{card} {
  &-wrapper {
    position: relative;
    display: block;
    width: 100%;
    overflow: hidden;
    zoom: 1;
    margin: 0;
    padding: 0 15px;
    box-sizing: border-box;
    &:before {
      .setClearFix();
    }
    &:after {
      .setClearFix();
      clear: both;
    }
  }
  &-header,
  &-main {
    position: relative;
    display: block;
    width: 100%;
    padding: 15px 0;
    margin: 0;
    border-bottom: 1px solid #dcdcdc;
    @media screen and (-webkit-min-device-pixel-ratio: 1.5) {
      border: none;
      background-size: 100% 1px;
      background-repeat: no-repeat;
      background-position: bottom;
      background-image: linear-gradient(0, #dcdcdc, #dcdcdc 50%, transparent 50%);
      background-image: -webkit-linear-gradient(90deg, #dcdcdc, #dcdcdc 50%, transparent 50%);
    }
  }
  &-footer {
    position: relative;
    display: block;
    width: 100%;
    padding: 15px 0;
    margin: 0;
  }
}

</style>
