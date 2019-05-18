<template>
  <section class="mux-cntainer">
    <tree :options="list"></tree>
  </section>
</template>
<script type="text/javascript">
import { Tree } from 'Packages/index.js'
import Data from 'Packages/tree/src/data.json'
export default {
  components: {
    Tree
  },
  data () {
    return {
      list: [Data]
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
