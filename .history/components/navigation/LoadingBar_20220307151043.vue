<template>
  <div v-if="$store.state.loading || $nuxt.loading" class="loading-page">
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  computed: {},
  methods: {},
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(253, 0, 0, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
</style>
