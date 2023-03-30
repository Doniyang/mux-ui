<template>
	<section class="component mux-picker">
		 	<slot name="header">
		 		 <header class="mux-picker-header">
		 			<div class="mux-picker-left">取消</div>
		 			<div class="mux-picker-title">头部</div>
		 			<div class="mux-picker-right">确定</div>
		 		</header>
		 	</slot>		 
		 <main class="mux-picker-body">
		 	  <div class="mux-divider--is-top"></div>
				<div class="mux-picker-wrap">
					   <ul class="">
							 <li></li>
						 </ul>
				</div>
				<div class="mux-divider--is-bottom"></div>
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