<template>
  <section class="mux-cntainer">
    <v-header title="树组件" @back-click="$router.back()"></v-header>
    <!-- <tree :options="list"></tree> -->
    <v-table :data="tableData" :columns="tableCols"></v-table>
  </section>
</template>
<script type="text/javascript">
import { Header, Tree } from 'Packages/index.js'
import VTable from 'Packages/table'
import Data from 'Packages/tree/src/data.json'
export default {
  components: {
    Tree,
    VTable,
    'v-header': Header
  },
  data () {
    return {
      list: [Data],
      tableData:[{ID:'11',name:'222',mark:'333'}],
      tableCols:[{title:'第一列',field:'ID'},{title:'第二列',field:'name'},{title:'第三列',field:'mark'}]
    }
  }
}

</script>
<style lang="less" scoped>
.mux-container {
  display: block;
  padding: 0;
  margin: 0;
}

</style>
