<template>
  <v-app>
    <!--     <PlaceHolder v-if="isProd || mdp !== 'ieaftw'" @submit="mdp = $event"></PlaceHolder>
    <template v-else> -->
    <TopBar />
    <v-main style="padding-bottom: 5rem">
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <Footer />
    <!--    </template> -->
  </v-app>
</template>

<script>
export default {
  scrollToTop: true,
  data() {
    return {
      mdp: '',
      isProd: process.env.NODE_ENV === 'production',
    }
  },
  created() {
    this.$store.registerModule('articles', {
      state: { ...state(), type: 'articles' },
      mutations,
      actions,
      getters: {
        /*   articlesfilterCounter: filterCounter(), */
      },
    })
    this.$store.registerModule('media', {
      state: { ...state(), type: 'media' },
      mutations,
      actions,
      getters: {
        /*   mediafilterCounter: filterCounter(), */
      },
    })
    this.$store.registerModule('authors', {
      state: { ...state(), type: 'authors' },
      mutations,
      actions,
      getters: {
        /*  authorsfilterCounter: filterCounter(), */
      },
    })
    /*  this.$nuxt.$loading.finish = function () {
      this.clear()
      this.pause()
      return this
    }
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    }) */
  },
  updated() {
    /*   this.$nextTick(() => {
      this.$nuxt.$loading.start()
    }) */
  },
  methods: {},
}
</script>
<style lang="scss"></style>
