<template>
  <v-list-item
    nuxt
    :to="localePath('/articles/' + item.slug)"
    class="my-6 d-flex align-start pl-0"
    flat
  >
    <v-list-item-avatar
      v-if="$vuetify.breakpoint.smAndUp"
      x-large
      tile
      min-width="25%"
      height="100%"
    >
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
      <TextFingerprint v-else :item="item" :size="300" :margin="20">
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
    </v-list-item-avatar>
    <div class="mt-3">
      <v-list-item-title class="text-h5 d-inline-flex">
        <ArticleCategories
          v-if="$vuetify.breakpoint.xs"
          :item="item"
          class="pr-3" />

        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              {{ item.article_title }}
            </div>
          </template>
          <span v-html="item.article_title"></span> </v-tooltip
      ></v-list-item-title>
      <v-list-item-subtitle class="mt-6"
        ><ArticleAuthorsString :authors="item.authors" class=""
      /></v-list-item-subtitle>
    </div>
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
<style lang="scss" scoped>
.list-image {
  display: flex;
  min-width: 25%;
  max-width: 400px;
  background-color: black;
}
</style>
