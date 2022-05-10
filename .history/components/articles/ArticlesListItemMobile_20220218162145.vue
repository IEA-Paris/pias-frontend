<template>
  <v-list-item
    nuxt
    :to="localePath('/articles/' + item.slug)"
    class="d-flex my-6"
    flat
  >
    <v-list-item-avatar>
      <div class="list-image d-flex">
        <YoutubeThumbnail v-if="item.yt && item.yt.length" :item="item">
        </YoutubeThumbnail>
        <PictureItem
          v-else-if="item.picture && item.picture.length"
          :item="item"
          :src="item.picture"
        >
        </PictureItem>
        <TextFingerprint v-else :item="item" :size="300" :margin="20">
        </TextFingerprint>
      </div>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <div class="article-title" v-bind="attrs" v-on="on">
              {{ item.article_title }}
            </div>
          </template>
          <span v-html="item.article_title"></span> </v-tooltip
      ></v-list-item-title>
      <v-list-item-sub-title
        ><ArticleAuthorsString
          :authors="item.authors"
          class="text-h6 mt-3 article-title"
      /></v-list-item-sub-title>
      <ArticleCategories :item="item" />
      <div class="d-flex">
        <v-sheet :color="item.category_1.color" class="sideline"></v-sheet>
        {{
          new Date(item.date).toLocaleDateString('EN', {
            timezone: 'UTC',
          })
        }}
      </div>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  props: {
    item: {
      required: true,
      type: Object,
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
<style lang="scss">
.list-image {
  display: flex;
  min-width: 25%;
  max-width: 400px;
  background-color: black;
}
.article-title {
  font-size: 1.3rem !important;
  display: -webkit-box;
  width: 220px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
