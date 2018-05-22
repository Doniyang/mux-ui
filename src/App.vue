<template>
  <div id="app">
    <div class="btn-box">
      <v-button @click="handleClick">默认按钮</v-button>
    </div>
    <div class="btn-box">
      <v-button type="primary" @click="showComfirm">默认按钮</v-button>
    </div>
    <div class="btn-box">
      <v-button type="danger" size="large"  :plain="true" :block="true" @click="showPrompt">默认按钮</v-button>
    </div>
  </div>
</template>
<script>
import Alert from 'Packages/alert'
import Comfirm from 'Packages/comfirm'
import Prompt from 'Packages/prompt'
import Button from 'Packages/button'
export default {
  name: 'App',
  components: {
    'v-button': Button
  },
  methods: {
    handleClick (e) {
      Alert({ title: 'aa', content: 'sss' }).then(action => {
        console.log(action)
      })
    },
    showComfirm (e) {
      Comfirm({title: '提示', content: 'comfirm测试'}).then(action => {}).catch(err => {
        console.log(err)
      })
    },
    showPrompt (e) {
      Prompt({title: '提示'}).then(val => {
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
  overflow: hidden;
  zoom: 1;
}

.btn-box{
  margin-bottom: 20px;
}

</style>
