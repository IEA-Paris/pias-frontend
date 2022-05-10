<template>
  <v-card :color="item.color">
    <v-card-title>{{ item.title }}</v-card-title>
    <v-card-actions>
      <v-btn flat color="primary">
        {{ $t('see-all-results-articlescount', [total]) }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  async fetch() {
    this.total = await this.$content('articles').where({$or: {[{category_1: item.path}, {category_2:item.path}]}).fetch()
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
        total:1
    }
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
