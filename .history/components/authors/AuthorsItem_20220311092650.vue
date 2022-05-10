<template>
  <div>
    <v-skeleton-loader
      v-if="$store.state.loading"
      type="header"
      height="50"
    ></v-skeleton-loader>
    <v-hover v-else v-slot="{ hover }">
      <v-card
        :elevation="hover ? 2 : 0"
        flat
        nuxt
        :to="localePath('/authors/' + item.slug)"
        class="text-h5 ma-2 pa-2"
      >
        {{ item.firstname + ' ' + item.lastname }}
      </v-card>
    </v-hover>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    search: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
    extended: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    highlight: (word = '', query) => {
      const check = new RegExp(query, 'ig')
      return word.replace(check, function (matchedText, a, b) {
        return (
          '<strong style="color: darkslategray;background-color: yellow;">' +
          matchedText +
          '</strong>'
        )
      })
    },
  },
}
</script>

<style lang="scss"></style>
