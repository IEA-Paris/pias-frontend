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
            <div class="article-authors">
              <ArticleAuthorsString :authors="item.authors" />
            </div>

            <div
              v-if="item.abstract && item.abstract.length"
              class="overline mt-12 mb-4"
            >
              {{ $t('abstract') }}
            </div>
            <div
              v-if="item.abstract && item.abstract.length"
              class="article-abstract"
            >
              {{ item.abstract }}
            </div>
            <nuxt-content
              :document="item"
              class="d-block article-body pl-12 mr-auto"
            />
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
      <v-divider></v-divider>
      <small>
        <span class="overline"
          >&copy; {{ new Date().getFullYear() }} {{ $t('paris-ias') }}</span
        >
        - {{ item.article_title }} by
        <ArticleAuthorsString :authors="item.authors"
      /></small>
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
<style lang="scss" scoped>
.page-title {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
.article-body .node .index {
  display: none !important;
}
.article-body {
  max-width: 6in;
  font-size: 1.5rem;
}
.article-authors {
  padding: 1em 0em;
  font-family: 'Open sans', sans-serif;
}
.article-abstract {
  font-style: italic;
}
@page {
  size: letter;
}

@media print {
  table.paging tfoot td {
    height: 1in;
  }
  table.paging thead td {
    height: 1.5in;
  }
}
footer {
  height: 1in;
}
header {
  height: 1.5in;
}

header,
footer {
  width: 100%;
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
