<template>
  <v-card :color="item.color">
    <v-card-title>{{ item.title }}</v-card-title>
    <v-card-actions>
      <v-btn flat color="primary">
        {{ $t('see-all-results-articlescount', [collectionCount]) }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
