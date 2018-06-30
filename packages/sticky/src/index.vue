<template>
	<div class="mux-sticky-wrapper">
		<slot></slot>
	</div>
</template>
<script type="text/javascript"></script>
<style lang="less" scoped>
@sticky:~"mux-sticky";
.@{sticky}{
	&-wrapper{
		top: 60px;
		position: -webkit-sticky;
		position: sticky;
	}
}

</style>