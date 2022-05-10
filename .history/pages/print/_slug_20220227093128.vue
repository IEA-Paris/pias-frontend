<template>
  <article class="printpanel page a4" style="background-color: white">
    <header>
      <Logo></Logo>
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
            <ArticleAuthorsString :authors="item.authors" />

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
      <ArticleAuthorsString :authors="item.authors" />
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
}
.printpanel .index {
}
@page {
  size: letter;
  margin: 4vh 7vw;
}

@media print {
  table.paging thead td,
  table.paging tfoot td {
    height: 1in;
  }
}

header,
footer {
  width: 100%;
  height: 1in;
}

header {
  position: absolute;
  top: 0;
}

@media print {
  header,
  footer {
    position: fixed;
  }

  footer {
    bottom: 0;
  }
}
</style>
