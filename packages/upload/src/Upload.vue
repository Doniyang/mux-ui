<template>
  <section class="mux-upload-wrapper">
    <div class="mux-upload-container">
      <label class="mux-upload-btn" :class="opsitionClass">
        <input type="file" :accept="accept" :multiple="multiple" :capture="capture" class="mux-upload-input" @change="handleChange($event)">
        <span class="mux-upload-icons">
        	<i class="mux-upload-arrow"></i>
        	<i class="mux-upload-pipe"></i>
        </span>
      </label>
    </div>
    <ul class="mux-upload-preview-container" v-if="preview">
      <li class="mux-upload-preview-item" v-for="(url,index) in urlList" :key="index">
        <i class="mux-upload-times-icon" @click.stop="handleClick(url)"></i>
        <img :src="url" @load="handleRevoke(url)" class="mux-upload-preview-img">
      </li>
    </ul>
  </section>
</template>
<script type="text/javascript">
export default {
  name: 'v-upload',
  props: {
    accept: {
      type: String,
      default: 'image/*'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    capture: {
      type: [String, Boolean],
      default: false,
      validator(v) {
        return [false, 'camera', 'camcorder', 'microphone'].includes(v)
      }
    },
    preview: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'middle',
      validator(v) {
        return ['left', 'right', 'middle'].includes(v)
      }
    },
    maxSize: {
      type: Number,
      default: 2
    }
  },
  computed: {
    opsitionClass() {
      return ['mux-upload-btn-' + this.position]
    }
  },
  data() {
    return {
      urlList: []
    }
  },
  methods: {
    handleChange(e) {
      const files = e.target.files
      if (files.length > this.maxSize || this.urlList.length >= this.maxSize) {
        this.$emit('onCross')
      } else {
        let self = this
        Array.from(files).forEach((file, index) => {
          let URLs = window.URL || window.webkitURL
          let fileUrl = URLs.createObjectURL(file)
          self.urlList.push(fileUrl)
        })
        this.$emit('onUpload', files)
      }
      e.target.value = ''
    },
    handleRevoke(url) {
      let URLs = window.URL || window.webkitURL
      URLs.revokeObjectURL(url)
    },
    handleClick(url) {
      this.urlList = this.urlList.filter(item !== url)
      this.$emit('onCutOff', url)
    }
  }
}

</script>
<style lang="less" scoped>
@upload: ~"mux-upload";
.base-pseudo() {
  display: table;
  content: '';
  position: absolute;
  box-sizing: border-box;
}

.@{upload} {
  &-wrapper {
    position: relative;
    display: block;
    margin: 0;
    padding: 0;
    width: 100%;
    box-sizing: border-box;
    &:before,
    &:after {
      .base-pseudo()
    }
    &:after {
      clear: both;
    }
  }
  &-container {
    position: relative;
    display: block;
    overflow: hidden;
    zoom: 1;
    margin: 0;
    padding: 0 20px;
  }
  &-btn {
    position: relative;
    overflow: hidden;
    zoom: 1;
    display: block;
    box-sizing: border-box;
    width: 60px;
    height: 60px;
    padding: 8px;
    &-left {
      left: 0;
      transform: translate3d(0, 0, 0);
    }
    &-middle {
      left: 50%;
      transform: translate3d(-50%, 0, 0);
    }
    &-right {
      left: 100%;
      transform: translate3d(-100%, 0, 0);
    }
  }
  &-input {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    filter: alpha(opacity=0);
  }
  &-icons {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    border: none;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: 0 0 0.8rem 1px rgba(7, 150, 226, .375);
  }
  &-pipe {
    position: absolute;
    display: inline-block;
    left: 50%;
    bottom: 12px;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 22px;
    height: 11px;
    border-radius: 2px;
    border-left: 1px solid #0796e2;
    border-right: 1px solid #0796e2;
    border-bottom: 1px solid #0796e2;
  }
  &-arrow {
    position: absolute;
    display: inline-block;
    width: 1px;
    height: 16px;
    left: 50%;
    top: 8px;
    background-color: #0796e2;
    transform: translate3d(-50%, 0, 0);
    &:before,
    &:after {
      position: absolute;
      display: block;
      content: "";
      width: 12px;
      height: 1px;
      left: 0.5px;
      background-color: #0796e2;
      -webkit-transform-origin: left;
      transform-origin: left;
    }
    &:before {
      -webkit-transform: rotate(135deg);
      transform: rotate(135deg);
    }
    &:after {
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
  &-preview-container {
    position: relative;
    overflow: hidden;
    zoom: 1;
    list-style: none;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
  }

  &-preview-item {
    position: relative;
    display: block;
    margin-left: 15px;
    height: 60px;
  }

  &-times-icon {
    position: absolute;
    right: 0;
    background-color: #0796e2;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    &:before,
    &:after {
      display: block;
      content: "";
      width: 10px;
      height: 1px;
      top: 50%;
      left: 50%;
      margin: -.5px 0 0 -5px;
      position: absolute;
      background-color: #fff;
    }
    &:before {
      transform: rotate(-45deg);
    }
    &:after {
      transform: rotate(45deg);
    }
    ;
  }
  &-preview-img {
    display: inline-block;
    width: auto;
    height: 100%;
    vertical-align: middle;
  }
}

</style>
