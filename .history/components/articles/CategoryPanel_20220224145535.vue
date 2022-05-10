<template>
  <v-card
    outlined
    class="pa-3 mt-3"
    :style="'border-left:' + cat.color + ' 4px solid;'"
    nuxt
    :to="path"
  >
    <v-card-title>{{ cat.title }}</v-card-title>
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
      cat: {
        title: '',
        color: 'white',
      },
      path: '',
    }
  },
  async fetch() {
    this.cat = (
      await this.$content('categories')
        .where({ title: this.item.slice(19, -3) })
        .fetch()
    )[0]
    ;(this.total = (
      await this.$content('articles')
        .where({
          $or: [{ category_1: this.item.path }, { category_2: this.item.path }],
        })
        .only([])
        .fetch()
    ).length),
      console.log('this.localePath ', this.localePath('/'))

    this.path = `${this.localePath('/')}?filters=%7B%22category%22%3A%5B%22${
      this.cat.title
    }%22%5D%7D`
    console.log('this.item.slice(19, -3): ', this.item.slice(19, -3))
    this.total = (
      await this.$content('articles')
        .where({
          $or: [{ category_1: this.item.path }, { category_2: this.item.path }],
        })
        .only([])
        .fetch()
    ).length
    console.log(' this.total: ', this.total)
  },
  computed: {},
  mounted() {
    this.$fetch()
  },
  methods: {},
}
</script>
<style lang="scss"></style>
