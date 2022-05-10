<template>
  <v-dialog
    :value="value"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    @input="$emit('input', $event)"
  >
    <v-card>
      <v-toolbar tile dense>
        <v-btn icon @click="$emit('input', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $t('filters') }}</v-toolbar-title>
      </v-toolbar>
      <div class="pa-4">
        <Filters />

        <v-btn
          :disabled="!$store[type].getters.filtersCount"
          large
          block
          @click="$store.dispatch('project/resetFilters')"
        >
          <v-icon left>mdi-refresh</v-icon>
        </v-btn>

        <v-btn
          class="mt-2"
          large
          color="success"
          block
          @click="$emit('input', false)"
          >Save</v-btn
        >
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    filtersCount: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  computed: {},
}
</script>
<template>
  <v-dialog v-model="open" fullscreen hide-overlay overflowed>
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" large tile fab>
        <v-icon left>mdi-filter</v-icon>
        <v-avatar v-if="$store" class="ml-2" color="green" size="24">{{
          counter
        }}</v-avatar>
      </v-btn>
    </template>
    <v-card dark color="rgba(0, 0, 0, 0.97)">
      <v-app-bar color="transparent" clipped flat hide-on-scroll height="180">
        <div class="d-flex flex-column flex-grow-1">
          <div class="d-flex flex-grow-1 align-start">
            <v-img
              class="ml-10 mr-2"
              src="/icon_dark.png"
              contain
              max-height="120"
              max-width="120"
              style="cursor: pointer"
            ></v-img>
            <v-spacer></v-spacer>
            <v-btn
              icon
              x-large
              class="ma-2 mr-4 mb-4"
              tile
              @click="open = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
      </v-app-bar>
      <v-container fill-height>
        <v-row align="center" justify="center">
          <v-col
            cols="12"
            md="9"
            lg="6"
            class="d-flex justify-center flex-column"
          >
            <PageTitle :text="$t('filters')"></PageTitle>
            <Filters />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import searchContent from '~/assets/utils/searchContent'

export default {
  props: {},
  data() {
    return {
      loading: false,
      results: [],
      open: this.searchString,
      shouldFocus: false,
      base: this.$route.path,
    }
  },
  computed: {
    searchString: {
      get() {
        return this.searchStringRaw
      },
      async set(newValue) {
        if (!this.$wait.any) {
          if (!newValue) {
            console.log('pushin no new val')

            this.results = {
              articles: [],
              media: [],
              authors: [],
              articlesCount: 0,
              mediaCount: 0,
              authorsCount: 0,
            }
          } else {
            this.searchStringRaw = newValue
            this.$router.replace({
              query: { ...this.$route.query, search: newValue },
            })
            const resultsRaw = await searchContent(this.$content, newValue)
            this.results = {
              articles: resultsRaw[0] || [],
              media: resultsRaw[1] || [],
              authors: resultsRaw[2] || [],
              articlesCount: resultsRaw[3].length || 0,
              mediaCount: resultsRaw[4].length || 0,
              authorsCount: resultsRaw[5].length || 0,
            }
          }
        }
      },
    },
  },
  mounted() {
    if (this.$route.query.search) {
      this.searchString = this.$route.query.search
    }
    this.focusSearch()
  },
  methods: {
    focusSearch() {
      // Focus the component, but we have to wait
      // so that it will be showing first.
      this.$nextTick(() => {
        this.$refs?.searchInput?.focus()
      })
    },
    clear() {
      this.shouldFocus = false
      this.open = false
      this.$store.dispatch(this.type + '/updateSearch', undefined)
    },
    onIntersect(entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.shouldFocus = entries[0].isIntersecting
      if (this.shouldFocus) {
        this.$refs?.searchInput?.focus()
      }
    },
  },
}
</script>
<style scoped lang="scss">
$input-font-size: 48px;
.menu-logo {
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-property: color, background, text-shadow;
  transition: all 0.5s ease;
  transform-origin: left top;
  width: 600px !important;
  margin-left: 40px;
  margin-bottom: 25px;
}
#search {
  height: 120px;
  font-size: 48pt;
}
.search label[for] {
  height: 120px;
  font-size: 48pt;
}
</style>
