<template>
  <v-card :color="item.color" flat outlined>
    <v-card-title>{{ item.title }}</v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn x-large tile outlined>
        {{ $t('see-all-results-articlescount', [total]) }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    item: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      total: 1,
    }
  },
  async fetch() {
    const cat = await this.$content(this.item.slice(8)).fetch()
    console.log('cat: ', cat)
    this.total = await this.$content('articles')
      .where({
        $or: [{ category_1: this.item.path }, { category_2: this.item.path }],
      })
      .only([])
      .fetch().length
    console.log(' this.total: ', this.total)
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss"></style>
