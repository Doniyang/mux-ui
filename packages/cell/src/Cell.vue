<template>
  <div class="mux-cell-wrapper">
    <div class="mux-cell-container" :class="[`mux-cell-${direction}`]">
      <slot></slot>
    </div>
    <div class="mux-cell-arrow" v-if="isLink">
      <slot name="icon"><i class="mux-cell-caret"></i></slot>   
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    name:'mx-cell',
    props: {
      isLink: {
        type: Boolean,
        default: false
      },
      direction: {
        type: String,
        default: 'row',
        validator (v) {
          return ['row', 'column'].indexOf(v) > -1
        }
      }
    }
  }
</script>
<style lang="less" scoped>
@cell: ~"mux-cell";
.@{cell} {
  &-wrapper {
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    min-height: 46px;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #FFFFFF;
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
  &-container {
    flex: 1;
    display: flex;
    align-items: center;
  }
  &-row{
    flex-direction: row;
  }
  &-column{
    flex-direction: column;
  }
  &-arrow {
    display: block;
    min-width: 25px;
    text-align: left;
  }

  &-caret {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    &:before,
    &:after {
      position: absolute;
      content: "";
      left: 0;
      top: -1px;
      width: 10px;
      height: 1px;
      background: rgba(0, 0, 0, 0.56);
      transform-origin: right;
      -webkit-transition: all 0.2s;
      -o-transition: all 0.2s;
      transition: all 0.2s;
    }
    &:before {
      transform: rotate(45deg) translate3d(0, 0.5px, 0);
    }
    &:after {
      transform: rotate(-45deg) translate3d(0, 0.5px, 0);
    }
  }
}

</style>
