<template>
  <v-card
    nuxt
    :to="localePath('/articles/' + item.slug)"
    class="d-flex my-6"
    flat
    @click="$emit('close')"
  >
    <div class="list-image d-flex">
      <YoutubeThumbnail v-if="item.yt && item.yt.length" :item="item">
        <template #categories>
          <ArticleCategories :item="item" />
        </template>
        <template #date>
          <div class="d-flex">
            <v-sheet :color="item.category_1.color" class="sideline"></v-sheet>
            {{
              new Date(item.date).toLocaleDateString('EN', {
                timezone: 'UTC',
              })
            }}
          </div>
        </template>
      </YoutubeThumbnail>
      <PictureItem
        v-else-if="item.picture && item.picture.length"
        :item="item"
        :src="item.picture"
      >
        <template #categories>
          <ArticleCategories :item="item" />
        </template>
        <template #date>
          <div class="d-flex">
            <v-sheet :color="item.category_1.color" class="sideline"></v-sheet>
            {{
              new Date(item.date).toLocaleDateString('EN', {
                timezone: 'UTC',
              })
            }}
          </div>
        </template>
      </PictureItem>
      <TextFingerprint v-else :item="item" :size="200" :margin="20">
        <template #categories>
          <ArticleCategories :item="item" />
        </template>
        <template #date>
          <div class="d-flex">
            <v-sheet :color="item.category_1.color" class="sideline"></v-sheet>
            {{
              new Date(item.date).toLocaleDateString('EN', {
                timezone: 'UTC',
              })
            }}
          </div>
        </template>
      </TextFingerprint>
    </div>
    <div class="text-h5 ml-6 my-3">
      <div class="article-title">
        {{ item.article_title }}
      </div>
      <ArticleAuthorsString :authors="item.authors" class="text-h6 mt-3" />
    </div>
    <br />
    <v-divider></v-divider>
  </v-card>
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
  background-color: black;
}
.article-title {
  display: -webkit-box;
  max-width: 200px;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
