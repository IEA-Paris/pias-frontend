<template>
  <v-card
    ref="articleBox"
    :width="$vuetify.breakpoint.mdAndUp ? '' : '100%'"
    height="100%"
    class="box d-flex flex-column align-center justify-center transition-swing"
    min-height="250px"
    :max-height="highlighted ? '' : '500px'"
    nuxt
    :to="localePath('/articles/' + item.slug)"
  >
    <YoutubeThumbnail v-if="item.yt && item.yt.length" :item="item">
    </YoutubeThumbnail>
    <PictureItem
      v-else-if="item.picture && item.picture.length"
      :item="item"
      :size="200"
      :src="item.picture"
    >
    </PictureItem>
    <TextFingerprint v-else :item="item" :size="200" :margin="10">
    </TextFingerprint>
    <div>
      <ArticleCategories :item="item" />
      <v-sheet
        v-if="item.category_1 && item.category_1.title"
        class="underline-color"
        :color="item.category_1.color"
      ></v-sheet>
      <v-card-title>
        {{ item.article_title }}
      </v-card-title>

      <ArticleAuthorsString :authors="item.authors" />
      <div class="d-flex">
        <v-sheet
          v-if="item.category_1 && item.category_1.title"
          :color="item.category_1.color"
          class="sideline"
        ></v-sheet>
        {{
          new Date(item.date).toLocaleDateString('EN', {
            timezone: 'UTC',
          })
        }}
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
    highlighted: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss">
.box {
}
.underline-color {
  height: 2px;
  width: 33%;
  z-index: 100;
}
.sideline {
  height: 2.2rem;
  width: 4px;
  margin-right: 0.4rem;
}
</style>
