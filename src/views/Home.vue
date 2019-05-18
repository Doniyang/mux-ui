<template>
  <section class="mux-container">
    <v-header title="mux-ui 组件"></v-header>
    <main class="mux-main">
      <v-cell is-link>
        <router-link class="mux-cell-link" tag="a" to="/basic">基础组件</router-link>
      </v-cell>
      <v-cell is-link>
        <router-link class="mux-cell-link" tag="a" to="/comform">FORM表单组件</router-link>
      </v-cell>
      <v-cell is-link>
        <router-link class="mux-cell-link" tag="a" to="/alter">弹窗组件</router-link>
      </v-cell>
    </main>
  </section>
</template>
<script type="text/javascript">
import { Header, Cell } from 'Packages/index.js'
export default {
  components: {
    'v-cell': Cell,
    'v-header': Header
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

.mux-cell-link {
  width: 100%;
  display: inline-block;
  padding: 4px 20px;
  text-decoration: none;
}

</style>
