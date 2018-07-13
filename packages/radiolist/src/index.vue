<template>
  <div class="mxoa-radiolist-group" :class="columnClass">
    <label class="mxoa-radiolist-item" :class="positionClass" v-for="(item,index) in options" :key="index" :for="`redio_item_${index}`">
      <div class="mxoa-radiolist-item-header">
        <input type="radio" :name="name" :value="item.value" class="mxoa-radiolist-input" :id="`redio_item_${index}`" v-model="currentValue">
      </div>
      <div class="mxoa-radiolist-item-main"><span v-text="item.name"></span></div>
    </label>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'mx-radio-list',
  props: {
    name: {
      type: String,
      default: 'mx_radio'
    },
    options: {
      type: Array,
      default: () => []
    },
    isInline: {
      type: Boolean,
      default: true
    },
    value: String,
    labelPosition: {
      type: String,
      default: 'right',
      validator (v) {
        return ['left', 'right'].indexOf(v) > -1
      }
    }
  },
  computed: {
    columnClass () {
      return {
        'mxoa-radiolist-column': !this.isInline
      }
    },
    positionClass () {
      return {
        'mxoa-radiolist-item-left': this.labelPosition === 'left'
      }
    }
  },
  watch: {
    currentValue (nv, ov) {
      if (nv === ov) { return }
      this.$emit('input', nv)
    }
  },
  data () {
    return {
      currentValue: ''
    }
  },
  created () {
    this.currentValue = this.value
  }
}
</script>
<style lang="less" scoped>
@radiolist: ~"mxoa-radiolist";
@bglist: #aaaaaa,
#3598db,
#FFFFFF;
.@{radiolist} {
  &-group {
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }
  &-column {
    flex-direction: column;
  }
  &-column>&-item {
    width: 100%;
  }
  &-item {
    display: flex;
    align-items: center;
    &&-left {
      flex-direction: row-reverse;
    }
    & &-header {
      padding-right: 0.35em;
    }
    & &-main {
      flex: 1;
      min-width: 3em;
    }
  }
  &-input {
    position: relative;
    vertical-align: middle;
    display: block;
    width: 1.4em;
    height: 1.4em;
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
        -webkit-transform: rotate(45deg) scale(1);
        -ms-transform: rotate(45deg) scale(1);
        transform: rotate(45deg) scale(1);
        position: absolute;
        display: table;
        height: 0.7em;
        width: 0.4em;
        left: 0.35em;
        top: 0.1em;
        border: 1px solid extract(@bglist, 3);
        border-top: 0;
        border-left: 0;
        content: " ";
        -webkit-transition: all .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
        transition: all .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
      }
    }
  }
}

</style>
