<template>
  <article class="printpanel page a4" style="background-color: white">
    <header>
      <div class="d-flex" justify="start">
        <Logo></Logo>
      </div>
    </header>

    <table class="paging">
      <thead>
        <tr>
          <td>&nbsp;</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="page-title">{{ item.article_title }}</div>
            <div
              v-if="item.abstract && item.abstract.length"
              class="overline mt-12"
            >
              {{ $t('abstract') }}
            </div>
            <div v-if="item.abstract && item.abstract.length" class="abstract">
              {{ item.abstract }}
            </div>
            <nuxt-content :document="item" class="d-block" />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>&nbsp;</td>
        </tr>
      </tfoot>
    </table>
    <!-- TODO update with variable name -->
    <footer>
      <span class="overline"
        >&copy; {{ new Date().getFullYear() }} {{ $t('paris-ias') }}</span
      >
      - {{ item.article_title }} by
    </footer>
  </article>
</template>
<script>
export default {
  layout: 'print',
  props: {},
  async asyncData({ $content, params }) {
    const item = (
      await $content('articles', { deep: true })
        .where({
          slug: params.slug,
        })
        .fetch()
    )[0]
    return {
      item,
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss">
.printpanel,
.page {
  padding: 10vh 15vw;
}
.printpanel .index {
  display: none;
}
</style>
