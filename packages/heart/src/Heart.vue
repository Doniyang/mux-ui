<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" @click="heartClick" :class="likeStatus==='1'?'svg-like-clr':'svg-default-clr'" :height="size" :width="size">
    <path d="M352 56h-1c-39.7 0-74.8 21-95 52-20.2-31-55.3-52-95-52h-1c-61.9.6-112 50.9-112 113 0 37 16.2 89.5 47.8 132.7C156 384 256 456 256 456s100-72 160.2-154.3C447.8 258.5 464 206 464 169c0-62.1-50.1-112.4-112-113z" />
  </svg>
</template>
<script type="text/javascript">
export default {
  props: {
    size: {
      type: Number,
      default: 21
    },
    likeStatus: {
      type: String,
      default: '0'
    }
  },
  methods: {
    heartClick() {
      this.$emit('list-heart-click')
    }
  }
}

</script>
<style lang="less" scoped>
.svg-default-clr {
  vertical-align: middle;
  fill: #b3b3b1;
}

.svg-like-clr {
  vertical-align: middle;
  fill: red;
}

</style>
