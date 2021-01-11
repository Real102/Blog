<template>
	<div class="test">
		<img src="/img/avatar.png" alt="" />
		<img src="../public/img/avatar.jpg" alt="" />
		<img :src="$withBase('/img/avatar.png')" alt="" />
		<img src="~@imgs/avatar.jpg" alt="" />
		<div class="bgc bgc1"></div>
		<div class="bgc bgc2"></div>
	</div>
</template>
<script>
export default {
	name: "Test"
}
</script>
<style lang="scss">
.bgc {
	width: 200px;
	height: 200px;
}
.bgc1 {
	background: url("/img/avatar.jpg") no-repeat;
	background-size: 100% 100%;
}
.bgc2 {
	background: url("../public/img/avatar.png") no-repeat;
	background-size: 100% 100%;
}
</style>
