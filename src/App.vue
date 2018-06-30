<template>
  <div id="app">
    <div class="btn-box">
      <v-button :plain="true" @click="handleClick">默认按钮</v-button>
    </div>
    <div class="btn-box">
      <v-button type="primary" @click="showComfirm">默认按钮</v-button>
    </div>
    <div class="btn-box">
      <v-button type="danger" size="large" :plain="true" :block="true" @click="showPrompt">默认按钮</v-button>
    </div>
    <v-cell title="left" :is-link="true">right</v-cell>
    <div class="btn-box">
      <v-upload :preview="true"></v-upload>
    </div>
    <div class="btn-box">
      <v-input></v-input>
    </div>
    <v-sticky>
      <div>Sticky:粘性定位是相对定位和固定定位的混合。</div>
    </v-sticky>
    <ul>
      <li v-for="(it,index) in dataList" :key="index">{{it}}</li>
    </ul>
    <v-actionsheet :actions="menus" v-model="visible" :has-cancel="true"></v-actionsheet>
  </div>
</template>
<script>
import Alert from 'Packages/alert'
import Comfirm from 'Packages/comfirm'
import Prompt from 'Packages/prompt'
import Button from 'Packages/button'
import Cell from 'Packages/cell'
import Actionsheet from 'Packages/actionsheet'
import Upload from 'Packages/upload'
import Input from 'Packages/input'
import Sticky from 'Packages/sticky'
export default {
  name: 'App',
  data () {
    return {
      dataList: [],
      menus: [{
        name: '122'
      }, {
        name: '233'
      }],
      visible: false
    }
  },
  components: {
    'v-button': Button,
    'v-cell': Cell,
    'v-upload': Upload,
    'v-input': Input,
    'v-sticky': Sticky,
    'v-actionsheet': Actionsheet
  },
  mounted () {
    this.dataList = Array.from(new Array(30)).map((item, index) => index + 1)
  },
  methods: {
    handleClick (e) {
      Alert({ title: 'aa', content: 'sss' }).then(action => {
        this.visible = true
      })
    },
    showComfirm (e) {
      Comfirm({ title: '提示', content: 'comfirm测试' }).then(action => {}).catch(err => {
        console.log(err)
      })
    },
    showPrompt (e) {
      Prompt({ title: '提示' }).then(val => {
        console.log(val)
      }, cel => {
        console.log(cel)
      })
    }
  }
}

</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 30px;
  transform: scale(1,1);
  zoom: 1;
}

.btn-box {
  margin-bottom: 20px;
}

</style>
