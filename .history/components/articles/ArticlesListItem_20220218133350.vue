<template>
  <v-card
    nuxt
    :to="localePath('/articles/' + item.slug)"
    class="d-flex"
    @click="$emit('close')"
  >
    <div class="list-image">
      <YoutubeThumbnail v-if="item.yt && item.yt.length" :item="item">
      </YoutubeThumbnail>
      <PictureItem
        v-else-if="item.picture && item.picture.length"
        :item="item"
        :src="item.picture"
      >
      </PictureItem>
      <TextFingerprint v-else :item="item" :size="200" :margin="20">
      </TextFingerprint>
    </div>
    <div class="text-h6">
      {{ item.article_title }}
      <v-list-item-subtitle>
        <ArticleAuthorsString :authors="item.authors" />
      </v-list-item-subtitle>
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
  width: 31%;
  background-color: black;
}
</style>
