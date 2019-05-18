<template>
	<section class="mux-picker-wrapper">
		
		 	<slot name="header">
		 		 <header class="mux-picker-header">
		 			<div class="mux-picker-left"></div>
		 			<div class=""></div>
		 			<div></div>
		 		</header>
		 	</slot>		 
		 <main>
		 	<div></div>
		 </main>
	</section>
</template>
<script type="text/javascript"></script>
<style lang="less" scoped>
	@picker:~"mux-picker";

	.@{picker}{
		&-wrapper{
			display: block;
            position: relative;
            width: 100%;
            overflow: hidden;
		}

		
	}
</style>