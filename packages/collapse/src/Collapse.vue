<template>
  <section class="mux-collapse-wrapper">
    <header class="mux-collapse-header" @click.stop="handleClick">
      <div class="mux-collapse-title">
        <slot name="title">
          <span class="mux-collapse-label">{{title}}</span>
        </slot>
      </div>
      <div class="mux-collapse-arrow">
        <i :class="arrowClass"></i>
      </div>
    </header>
    <main class="mux-collapse-main" v-show="isCollapse">
      <slot></slot>
    </main>
  </section>
</template>
<script type="text/javascript">
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    arrowClass() {
      return {
        'mux-collapse-close': !this.isCollapse,
        'mux-collapse-open': this.isCollapse
      }
    }
  },
  created() {
    this.isCollapse = this.value
  },
  watch: {
    value(nv, ov) {
      if (nv === ov) { return }
      this.isCollapse = nv
    }
  },
  methods: {
    handleClick() {
      this.isCollapse = !this.isCollapse
      this.$emit('input', this.isCollapse)
      this.$emit('click', this.isCollapse)
    }
  }
}

</script>
<style lang="less" scoped>
@collapse: ~"mux-collapse";
.@{collapse} {
  &-wrapper {
    display: block;
    width: 100%;
    position: relative;
    overflow: hidden;
    zoom: 1;
  }
  &-header {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    border-bottom: 1px solid #dddddd;
    @media screen and (-webkit-min-device-pixel-ratio: 2) {
      border: none;
      background-size: 100% 1px;
      background-repeat: no-repeat;
      background-position: bottom;
      background-image: linear-gradient(0, #dddddd, #dddddd 50%, transparent 50%);
      background-image: -webkit-linear-gradient(90deg, #dddddd, #dddddd 50%, transparent 50%);
    }
  }
  &-title {
    display: block;
    position: relative;
    flex: 1;
    padding: 0.75em 0 0.75em 2.5em;
    text-align: left;
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 1.5em;
      height: 1.5em;
      width: 0.2em;
      background: #009688;
      transform: translate3d(0, -50%, 0);
    }
  }
  &-label {
    font-size: 1.5em;
    color: #212121;
  }
  &-arrow {
    display: block;
    min-width: 2.5em;
    text-align: left;
  }
  &-close {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    &:before,
    &:after {
      position: absolute;
      content: "";
      left: 0;
      top: -0.15em;
      width: 1em;
      height: 0.15em;
      background: rgba(0, 0, 0, 0.56);
      transform-origin: right;
      -webkit-transition: all 0.2s;
      -o-transition: all 0.2s;
      transition: all 0.2s;
    }
    &:before {
      transform: rotate(45deg) translate3d(0, 0.05em, 0);
    }
    &:after {
      transform: rotate(-45deg) translate3d(0, -0.05em, 0);
    }
  }
  &-open {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    &:before,
    &:after {
      position: absolute;
      content: "";
      left: 0;
      top: 0.25em;
      width: 1em;
      height: 0.15em;
      background: rgba(0, 0, 0, 0.56);
      transform-origin: right;
      -webkit-transition: all 0.2s;
      -o-transition: all 0.2s;
      transition: all 0.2s;
    }
    &:before {
      transform: rotate(135deg) translate3d(0.05em,0, 0);
    }
    &:after {
      transform: rotate(45deg) translate3d(0,0.05em, 0);
    }
  }
  &-main {
    display: block;
    width: 100%;
    padding: 1em;
    overflow: hidden;
    transition: all 0.2s;
  }
}

</style>
