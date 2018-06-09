<template>
	<ul>
		<li v-for="a in []">
			<v-tree-node></v-tree-node>
			<v-tree></v-tree>
		</li>
	</ul>
</template>
<script type="text/javascript">
import TreeNode from './TreeNode.vue'
export default{
  name: 'v-tree',
  components: {
    'v-tree-node': TreeNode
  }
}
</script>
