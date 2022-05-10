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
            <DoiBadge :doi="item.doi"></DoiBadge>
            <div class="overline mt-6">{{ $t('publication-date') }}</div>
            <div class="mb-6">
              {{
                new Date(item.date).toLocaleDateString('EN', {
                  timezone: 'UTC',
                })
              }}
            </div>
            <template v-if="item.tags && item.tags.length">
              <div class="overline">{{ $t('keywords') }}</div>

              <div class="mb-6">
                <Tag
                  v-for="(tag, index2) in item.tags"
                  :key="index2"
                  small
                  :tag="tag"
                  :class="index2 === 0 ? 'my-1 mr-1' : 'ma-1'"
                ></Tag>
              </div>
            </template>
            <v-divider class="my-3"></v-divider>
            <div class="article-abstract-frame">
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
      <v-divider class="my-3"></v-divider>
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
<style lang="scss">
.page-title {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
.index {
  display: none !important;
}
.article-body {
  max-width: 6in;
  font-size: 1.5rem !important;
}
.article-authors {
  padding: 1em 0em;
  font-family: 'Open sans', sans-serif;
}
.article-abstract {
  font-style: italic;
  margin-top: 0.8em;
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
.article-abstract-frame {
  border: 1px black solid;
  padding: 1em;
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
