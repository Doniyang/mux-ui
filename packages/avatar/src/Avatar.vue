<template>
  <div class="mux-avatar-wrapper" :style="avatarStyle" :class="avatarClass">
    <img :src="src" class="mux-avatar-img" v-if="isLoadSuccess" @error="handleLoadError" />
    <div class="mux-avatar-placeholder">
      <p class="mux-avatar-holder">{{alt|fomate}}</p>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name:'mx-avatar',
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '4em'
    },
    isShadow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isLoadSuccess: true
    }
  },
  computed: {
    avatarStyle () {
      return {
        width: this.size,
        height: this.size
      }
    },
    avatarClass () {
      return {
        'mux-avatar-shadow': this.isShadow
      }
    }
  },
  watch:{
    src(nv,ov){
      if (nv===ov) {return}
      this.isLoadSuccess = true  
    }
  },
  filters: {
    fomate (name) {
      return name.slice(-2)
    }
  },
  methods: {
    handleLoadError () {
      this.isLoadSuccess = false
    }
  }
}

</script>
<style lang="less" scoped>
@avatar: ~"mux-avatar";
.@{avatar} {
  &-wrapper {
    display: block;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 50%;
  }
  &-shadow{
     box-shadow: 0 -0.1em 0.2em 0.1em #a9d9ef;
  }
  &-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  &-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #009688;
    border-radius: 100%;
    text-align: center;
  }
  &-holder {
    font-size: 1.5em;
    color: #ffffff;
    vertical-align: middle;
  }
}

</style>
