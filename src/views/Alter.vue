<template>
  <section class="mux-container">
    <v-header title="mux-ui 组件" @back-click="$router.back()"></v-header>
    <main class="mux-main">
      <div class="mux-btn-area">
        <v-button type="primary" block @click.native="handleAlertClick">alert</v-button>
      </div>
      <div class="mux-btn-area">
        <v-button type="primary" block @click.native="handleComfirmClick">comfirm</v-button>
      </div>
      <div class="mux-btn-area">
        <v-button type="primary" block @click.native="handlePromptClick">prompt</v-button>
      </div>
    </main>
  </section>
</template>
<script type="text/javascript">
import { Header, Button, Alert, Comfirm, Prompt } from 'Packages/index.js'
export default {
  components: {
    'v-button': Button,
    'v-header': Header
  },
  methods: {
    handleAlertClick () {
      Alert({ content: 'alert 弹窗提示' }).then(res => {
        console.log(res)
      })
    },
    handleComfirmClick () {
      Comfirm({ content: 'comfirm 弹窗提示' }).then(a => console.log(a), b => console.log(b))
    },
    handlePromptClick () {
      Prompt({}).then(val => {
        console.log(val)
      }, action => console.log(action))
    }

  }
}

</script>
<style lang="less">
.mux-container,
.mux-main {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  zoom: 1;
}

.mux-btn-area {
  margin: 12px 30px 0;
}

</style>
