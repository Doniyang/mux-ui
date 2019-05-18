<template>
  <section class="mux-actionsheet" v-if="value">
    <transition name="mux-fade">
      <ul class="mux-actionsheet-container">
        <li class="mux-actionsheet-item" v-for="(act,index) in actions" :key="index" @click.stop="handleClick(act)">
          <span>{{act|mapKeyValue}}</span>
        </li>
        <li class="mux-actionsheet-btn-area" v-if="hasCancel">
          <button class="mux-actionsheet-btn" @click.stop="handleClose">{{cancelText}}</button>
        </li>
      </ul>
    </transition>
  </section>
</template>
<script type="text/javascript">
import MaskMixin from '@/mixins/mask'
export default {
  name:'mx-actionsheet',
  props: {
    actions: {
      type: [Array, Object],
      default () {
        return []
      }
    },
    hasCancel: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  mixins: [MaskMixin],
  filters: {
    mapKeyValue(item) {
      return Object.prototype.toString.call(item) === '[object Object]' ? item['name'] : item
    }
  },
  methods: {
    handleClick(item) {
      this.$emit('on-click-item', item)
      this.$emit('input', false)
    },
    handleClose(e) {
      this.$emit('input', false)
    }
  }
}

</script>
<style lang="less" scoped>
@actionsheet: ~"mux-actionsheet";
.@{actionsheet} {
  position: fixed;
  background: #e0e0e0;
  z-index: 2020;
  width: 100%;
  text-align: center;
  bottom: 0;
  left: 50%;
  -webkit-transform: translate3d(-50%, 0, 0);
  transform: translate3d(-50%, 0, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: -webkit-transform .3s ease-out;
  transition: -webkit-transform .3s ease-out;
  transition: transform .3s ease-out;
  transition: transform .3s ease-out, -webkit-transform .3s ease-out;
  &-container {
    list-style: none;
    margin: 0;
    padding: 0;
    zoom: 1;
    position: relative;
  }
  &-item {
    position: relative;
    display: block;
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    color: #333;
    background-color: #fff;
    &:after {
      width: 100%;
      height: 1px;
      background-color: #e0e0e0;
      display: block;
      content: '';
      position: absolute;
      top: auto;
      right: auto;
      bottom: 0;
      left: 0;
      -webkit-transform-origin: 50% 100%;
      transform-origin: 50% 100%;
    }
  }
  &-btn-area {
    margin-top: 5px;
    display: block;
  }
  &-btn {
    display: block;
    appearance: none;
    outline: 0;
    border: 0;
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    color: #333;
    text-align: center;
    background-color: #fff;
  }
}

.mux-fade-enter-active,
.mux-fade-leave-active {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-transition: -webkit-transform .3s ease-out;
  transition: -webkit-transform .3s ease-out;
  transition: transform .3s ease-out;
  transition: transform .3s ease-out, -webkit-transform .3s ease-out;
}

.mux-fade-enter,
.mux-fade-leave-to {
  opacity: 0;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
  -webkit-transition: -webkit-transform .3s ease-out;
  transition: -webkit-transform .3s ease-out;
  transition: transform .3s ease-out;
  transition: transform .3s ease-out, -webkit-transform .3s ease-out;
}

</style>
