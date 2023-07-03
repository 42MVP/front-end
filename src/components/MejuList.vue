<!-- <script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
	setup() {
		
	},
})
</script> -->


<template>
	<div class="position-relative position-relative-example">
		<div class="position-absolute top-0">

		</div>
	</div>
</template>


<style scoped>
.position-relative-example {
	height: 850px;
	width: 240px;
	background-color:  #F4F3EE;
	border-radius: 20px;
}

.position-relative-example div {
	width: 240px;
	height: 50px;
	background-color: #8A817C;
	border-radius: 20px;
}
</style>



<!-- <template>
	<div class="wrap">
		<div class="position-absolute top-0">]
		<h2>
			<slot name="title"></slot>
		</h2>
		<div class="userNum">
			{{ props.userNum }}<span class="timeUnit">명</span>
		</div>
	</div>
	</div>
</template>

<style scoped>
.wrap {
	padding: 20px;
	background-color: #F4F3EE;
	border-radius: 20px;
	width: 540;

}

.position-abs
</style> -->