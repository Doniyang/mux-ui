<template>
  <section class="mux-container">
    <v-header title="mux-ui 组件" @back-click="$router.back()"></v-header>
    <main class="mux-main">
      <h3 class="mux-container-title">cell</h3>
      <v-cell>
        <p class="mux-cell-box">单独使用</p>
      </v-cell>
      <v-cell>
        <div class="mux-cell-label">label</div>
        <div class="mux-cell-value">value值</div>
      </v-cell>
      <v-cell is-link>
        <div class="mux-cell-label">label</div>
        <div class="mux-cell-value">value值</div>
      </v-cell>
      <h3 class="mux-container-title">button</h3>
      <div class="mux-btn-area">
        <v-button>default</v-button>
      </div>
      <div class="mux-btn-area">
        <v-button block>default</v-button>
      </div>
      <div class="mux-btn-area">
        <v-button plain>default</v-button>
      </div>
      <div class="mux-btn-area">
        <v-button size="small">default</v-button>
      </div>
      <div class="mux-btn-area">
        <v-button disable>default</v-button>
      </div>
      <div class="mux-btn-area">
        <v-button type="primary">primary</v-button>
      </div>
      <div class="mux-btn-area">
        <v-button type="primary" block>primary</v-button>
      </div>
      <div class="mux-btn-area">
        <v-button type="primary" plain>primary</v-button>
      </div>
      <div class="mux-btn-area">
        <v-button type="primary" size="small">primary</v-button>
      </div>
      <div class="mux-btn-area">
        <v-button type="primary" disable>primary</v-button>
      </div>
      <h3 class="mux-container-title">card</h3>
      <v-card title="头部" content="内容" footer="底部"></v-card>
      <v-card>
        <div slot="header">头部</div>
        <div slot="content">内容</div>
        <div slot="footer">底部</div>
      </v-card>
    </main>
  </section>
</template>
<script type="text/javascript">
import { Header, Cell, Button, Card } from 'Packages/index.js'
export default {
  components: {
    'v-card': Card,
    'v-button': Button,
    'v-cell': Cell,
    'v-header': Header
  }
}

</script>
<style lang="less">
@cell: ~"mux-cell";
@btns: ~"mux-btn";

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

.mux-container-title {
  margin: 0;
  padding: 5px 0;
  text-align: center;
  color: rgba(0, 0, 0, 0.34);
}

.@{cell} {
  &-box {
    width: 100%;
    display: inline-block;
    padding: 4px 20px;
    text-decoration: none;
  }

  &-label {
    position: relative;
    display: block;
    width: 90px;
    padding: 4px 0 0 20px;
  }

  &-value {
    flex: 1;
  }
}

.@{btns} {
  &-area {
    margin: 0 30px 8px;
  }
}

</style>
