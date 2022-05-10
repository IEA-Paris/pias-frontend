<template>
  <div class="text-muted text-button text-center">
    <div class="box">
      <div class="top"></div>
      <div class="bottom"></div>
      <div class="left"></div>
      <div class="right"></div>

      <v-img
        class="mr-2"
        src="/logo_b.png"
        contain
        max-height="200"
        max-width="200"
        style="cursor: pointer"
      ></v-img>
    </div>
    {{ $t('loading') }}
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
  width: 212px;
  height: 212px;
  margin: 0 auto;
  border: 6px solid transparent;
}

.top,
.bottom,
.left,
.right {
  position: absolute;
  -webkit-animation: 6s ease-in-out infinite;
  animation: 6s ease-in-out infinite;
}
.top {
  top: -3px;
  left: -3px;
  height: 6px;
  -webkit-animation-name: top;
  animation-name: top;
}
@keyframes top {
  25% {
    width: 0;
    background: black;
  }
  38% {
    width: calc(103%);
    background: black;
  }
  50% {
    background: black;
  }
  62% {
    background: black;
  }
  75% {
    width: calc(103%);
    background: black;
  }
  88% {
    left: auto;
    right: -3px;
    width: 0;
    background: black;
  }
}
@-webkit-keyframes top {
  25% {
    width: 0;
    background: black;
  }
  38% {
    width: calc(103%);
    background: black;
  }
  50% {
    background: black;
  }
  62% {
    background: black;
  }
  75% {
    width: calc(103%);
    background: black;
  }
  88% {
    left: auto;
    right: -3px;
    width: 0;
    background: black;
  }
}

.bottom {
  bottom: -3px;
  right: -3px;
  height: 6px;
  -webkit-animation-name: bottom;
  animation-name: bottom;
}
@keyframes bottom {
  0% {
    width: 0;
  }
  12% {
    width: calc(103%);
    background: black;
  }
  25% {
    background: black;
  }
  38% {
    background: black;
  }
  50% {
    width: calc(103%);
    background: black;
  }
  62% {
    left: -3px;
    width: 0;
    background: black;
  }
  75% {
    background: black;
  }
}
@-webkit-keyframes bottom {
  0% {
    width: 0;
  }
  12% {
    width: calc(103%);
    background: black;
  }
  25% {
    background: black;
  }
  38% {
    background: black;
  }
  50% {
    width: calc(103%);
    background: black;
  }
  62% {
    left: -3px;
    width: 0;
    background: black;
  }
  75% {
    background: black;
  }
}

.left {
  bottom: -3px;
  left: -3px;
  width: 6px;
  -webkit-animation-name: left;
  animation-name: left;
}
@keyframes left {
  12% {
    height: 0;
    background: black;
  }
  25% {
    height: calc(103%);
    background: black;
  }
  38% {
    background: black;
  }
  50% {
    background: black;
  }
  62% {
    height: calc(103%);
    background: black;
  }
  75% {
    top: -3px;
    height: 0;
    background: black;
  }
  88% {
    background: black;
  }
}

@-webkit-keyframes left {
  12% {
    height: 0;
    background: black;
  }
  25% {
    height: calc(103%);
    background: black;
  }
  38% {
    background: black;
  }
  50% {
    background: black;
  }
  62% {
    height: calc(103%);
    background: black;
  }
  75% {
    top: -3px;
    height: 0;
    background: black;
  }
  88% {
    background: black;
  }
}
.right {
  top: -3px;
  right: -3px;
  width: 6px;
  -webkit-animation-name: right;
  animation-name: right;
}
@keyframes right {
  38% {
    height: 0;
    background: black;
  }
  50% {
    height: calc(103%);
    background: black;
  }
  62% {
    background: black;
  }
  75% {
    background: black;
  }
  88% {
    height: calc(103%);
    background: black;
  }
  100% {
    top: auto;
    bottom: -3px;
    height: 0;
    background: black;
  }
}
@-webkit-keyframes right {
  38% {
    height: 0;
    background: black;
  }
  50% {
    height: calc(103%);
    background: black;
  }
  62% {
    background: black;
  }
  75% {
    background: black;
  }
  88% {
    height: calc(103%);
    background: black;
  }
  100% {
    top: auto;
    bottom: -3px;
    height: 0;
    background: black;
  }
}
</style>
