<template>
  <div class="box">
    <div class="top"></div>
    <div class="bottom"></div>
    <div class="left"></div>
    <div class="right"></div>

    <v-img
      class="mr-2"
      :class="$vuetify.breakpoint.smAndUp ? 'ml-6' : 'ml-3'"
      src="/logo_b.png"
      contain
      max-height="120"
      max-width="120"
      style="cursor: pointer"
    ></v-img>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss">
.box {
	position: relative;
	width: 200px;
	height: 200px;
	margin: 0 auto;
	border: 3px solid transparent;
}
.top,
.bottom,
.left,
.right {
	position: absolute;
	-webkit-animation: 8s linear infinite;
	animation: 8s linear infinite;
}
.top {
	top: -3px;
	left: -3px;
	height: 3px;
	-webkit-animation-name: top;
	animation-name: top;
}
@-webkit-keyframes {
	top {
		25% {
    width: 0;
		background: #ffdb00;
	}
	bottom {
		0% {
    width: 0;
	}
	left {
		12% {
    height: 0;
		background: #ffdb00;
	}
	right {
		38% {
    height: 0;
		background: #ffdb00;
	}
}
38% {
	width: calc(103%);
	background: #ffdb00;
	background: #ffdb00;
	background: #ffdb00;
}
50% {
	background: #ffdb00;
	width: calc(103%);
	background: #ffdb00;
	background: #ffdb00;
	height: calc(103%);
	background: #ffdb00;
}
62% {
	background: #ffdb00;
	left: -3px;
	width: 0;
	background: #ffdb00;
	height: calc(103%);
	background: #ffdb00;
	background: #ffdb00;
}
75% {
	width: calc(103%);
	background: #ffdb00;
	background: #ffdb00;
	top: -3px;
	height: 0;
	background: #ffdb00;
	background: #ffdb00;
}
88% {
	left: auto;
	right: -3px;
	width: 0;
	background: #ffdb00;
	background: #ffdb00;
	height: calc(103%);
	background: #ffdb00;
}
} {
	.bottom {
		bottom: -3px;
		right: -3px;
		height: 3px;
		-webkit-animation-name: bottom;
		animation-name: bottom;
	}
	.left {
		bottom: -3px;
		left: -3px;
		width: 3px;
		-webkit-animation-name: left;
		animation-name: left;
	}
	.right {
		top: -3px;
		right: -3px;
		width: 3px;
		-webkit-animation-name: right;
		animation-name: right;
	}
}
12% {
	width: calc(103%);
	background: #ffdb00;
}
25% {
	background: #ffdb00;
	height: calc(103%);
	background: #ffdb00;
}
100% {
	top: auto;
	bottom: -3px;
	height: 0;
	background: #ffdb00;
}
</style>
