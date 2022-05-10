<template>
  <div>
    <v-row no-gutters class="mt-n12">
      <v-col cols="12" class="d-flex">
        <div class="sidebtn">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn
                tile
                outlined
                text
                v-bind="attrs"
                class="pa-7"
                @click="filter = !filter"
                v-on="on"
              >
                <v-icon :left="!filter">
                  {{ filter ? 'mdi-chevron-left' : 'mdi-filter' }}
                </v-icon>
                {{ filter ? '' : $t('filters') }}
              </v-btn>
            </template>
            <span
              v-html="filter ? $t('hide-filters') : $t('show-filters')"
            ></span>
          </v-tooltip>
        </div>
        <v-spacer></v-spacer>
        <!--  <IconMenu :type="sort"></IconMenu
        > --><!--
        <v-select
          class="flex-grow-0"
          no-data-text=""
          solo
          flat
          append-icon="mdi-sort"
          icon
          x-large
          tile
          width="56"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-select>

        <v-select
          class="flex-grow-0"
          no-data-text=""
          solo
          flat
          append-icon="mdi-sort"
          icon
          x-large
          tile
          width="56"
        >
          <v-icon>mdi-view-quilt</v-icon>
        </v-select>
        <v-select
          class="flex-grow-0"
          no-data-text=""
          solo
          flat
          append-icon="mdi-sort"
          icon
          x-large
          tile
          width="56"
        >
          <v-icon>mdi-text-long</v-icon>
        </v-select>
        <v-select
          class="flex-grow-0"
          no-data-text=""
          solo
          flat
          append-icon="mdi-sort"
          icon
          x-large
          tile
          width="56"
        >
          <v-icon>mdi-sort</v-icon>
        </v-select>
        -->
      </v-col>
    </v-row>
    <v-row
      class="transition-swing flex-row-reverse d-flex"
      :fluid="filter"
      :class="{ 'justify-center': $vuetify.breakpoint.lgAndUp }"
    >
      <v-col
        :cols="filter ? 10 : 12"
        :xl="filter ? 8 : 10"
        :lg="filter ? 9 : 11"
        :md="filter ? 9 : 12"
        :sm="filter ? 7 : 12"
        class="transition-swing pt-0"
      >
        <v-data-iterator
          :loading="$nuxt.loading"
          :items="$store.state[type].items"
          :footer-props="{ itemsPerPageOptions: [5, 10, 20, 50, 100] }"
          :server-items-length="$store.state[type].total"
          :page="$store.state[type].page"
          :sort-by="$store.state[type].sortBy"
          :sort-desc="$store.state[type].sortDesc"
          hide-default-footer
          @update:page="$vuetify.goTo(0)"
        >
          <template #header>
            <v-container
              class="transition-swing py-0"
              :fluid="!$store.state.scrolled"
              :class="{ '': !$store.state.scrolled, 'pl-0': filter }"
            >
              <v-row
                class="transition-swing"
                :no-gutters="!$store.state.scrolled"
                :class="[
                  $store.state.scrolled
                    ? 'mb-0'
                    : $vuetify.breakpoint.mobile
                    ? 'mx-2 '
                    : 'mx-6 ',
                  ,
                ]"
              >
                <v-col cols="12 ">
                  <div class="mr-4 text-subtitle-1 grey--text">
                    <template
                      v-if="
                        $store.state[type].filterCount &&
                        !($route.query && $route.query.search)
                      "
                    >
                      {{ $t('searching') }}
                    </template>
                    <template v-if="$route.query && $route.query.search">
                      {{
                        $t('searching-for-string', [
                          $route.query && $route.query.search,
                        ])
                      }}
                    </template>
                    <template v-if="$store.state[type].filterCount"
                      >{{
                        $tc('with-activefilters-filters', [
                          $store.state[type].filterCount,
                        ])
                      }}
                    </template>
                    <template
                      v-if="
                        $store.state[type].filterCount ||
                        ($route.query && $route.query.search)
                      "
                      >-
                    </template>
                    {{
                      $tc('total-' + type, $store.state[type].total) +
                      ' - ' +
                      $t('page-current-of-total', {
                        current: $store.state[type].page,
                        total: $store.state[type].numberOfPages,
                      })
                    }}
                    <component
                      :is="
                        type.charAt(0).toUpperCase() +
                        type.slice(1) +
                        'SearchHint'
                      "
                      outline
                    ></component>
                  </div>
                  <v-text-field
                    v-model="search"
                    :placeholder="$t('search')"
                    prepend-inner-icon="mdi-magnify"
                    single-line
                    :loading="$nuxt.loading"
                    class="transition-swing"
                    outlined
                    hide-details
                    :dense="$vuetify.breakpoint.smAndDown"
                    :disabled="$nuxt.loading"
                    clearable
                    style="min-width: 150px"
                  >
                    <template v-if="!search" #label>
                      <div class="searchLabel">{{ $t('search') }}</div>
                    </template></v-text-field
                  ></v-col
                ></v-row
              ></v-container
            >
          </template>
          <template #loading>
            <v-progress-linear
              indeterminate
              rounded
              height="6"
            ></v-progress-linear>
            <v-container style="height: 400px">
              <v-row
                class="fill-height"
                align-content="center"
                justify="center"
              >
                <v-col align="center" cols="12">
                  <v-img src="/loading.gif" height="250" width="250"></v-img>
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template #default="props">
            <FrontTiles
              v-if="tiles"
              :data="props"
              :filter="filter"
              :sections="Math.ceil(itemsPerPage / 3)"
              :type="type"
            ></FrontTiles>
            <RegularList
              v-else
              :data="props"
              :filter="filter"
              :type="type"
            ></RegularList>
          </template>

          <template #no-data>
            <div width="100%">
              {{ $t('no-result-found') }}
            </div>
          </template>
          <template #no-result>
            <template v-if="!$store.state[type].filterCount">
              <div class="my-3" width="100%">
                {{ $t('no-result-found') }}
              </div>
            </template>
            <template v-else>
              <div width="100%">
                {{ $t('no-result-matching-your-filters') }}
                <br />
                <v-btn
                  v-if="$store.state[type].filterCount"
                  outlined
                  small
                  color="white"
                  class="ma-3"
                  @click="
                    $router.push({ query: undefined }) &&
                      $store.dispatch('list/updatePage', {
                        type,
                        value: 1,
                      })
                  "
                >
                  <v-icon left>mdi-refresh</v-icon>
                  {{ $t('reset-filters') }}
                </v-btn>
              </div>
            </template>
          </template>
          <template #footer>
            <v-container>
              <v-row
                :no-gutters="layout.nogutters"
                justify="center"
                align="center"
              >
                <v-sheet class="d-flex align-center">
                  <span class="grey--text px-3">{{
                    $t('items-per-page')
                  }}</span>
                  <v-select
                    v-model="$store.state[type].itemsPerPage"
                    class="perPageSelect"
                    solo
                    outlined
                    flat
                    dense
                    :items="$store.state[type].itemsPerPageArray"
                    hide-details
                  ></v-select>
                </v-sheet>

                <v-spacer></v-spacer>

                <div v-if="$store.state[type].numberOfPages > 1">
                  <v-pagination
                    total-visible="5"
                    color="black"
                    large
                    :value="page || 1"
                    :length="$store.state[type].numberOfPages"
                    @input="
                      $store.dispatch(type + '/update', {
                        page: $event,
                      })
                    "
                  ></v-pagination>
                </div>
                <v-spacer></v-spacer>

                <span class="mr-4 grey--text">
                  {{
                    $t('page-current-of-total', {
                      current: $store.state[type].page,
                      total: $store.state[type].numberOfPages,
                    })
                  }}
                </span>
              </v-row>
            </v-container>
          </template>
        </v-data-iterator>
      </v-col>
      <v-col
        v-show="filter"
        :cols="filter ? 2 : 1"
        :xl="filter ? 2 : 1"
        :lg="filter ? 3 : 1"
        :md="filter ? 3 : 1"
        :sm="filter ? 5 : 1"
        class="transition-swing pt-0"
      >
        <Filters :type="type" class="mt-7" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    addBtn: {
      type: Boolean,
      required: false,
      default: false,
    },
    tiles: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      default: '',
      required: true,
    },
    layout: {
      type: Object,
      required: true,
      default: () => {
        return {
          cols: 12,
          xl: 12,
        }
      },
    },
    pagination: {
      type: Object,
      required: false,
      default: () => {
        return {
          itemsPerPage: 9,
          page: 1,
          sortBy: [],
          sortDesc: [true],
          itemsPerPageArray: [9, 12, 16],
        }
      },
    },
    addButton: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      filter: !!this.$store.state[this.type].filterCount || false,
    }
  },
  async fetch({ params, store: { dispatch, getters } }) {
    console.log('fetch', this.type)
    await dispatch(this.type + '/update')
  },
  computed: {
    search: {
      get() {
        return this.$store.state[this.type].search
      },
      async set(v) {
        console.log('this.type: ', this.type)
        await this.$store.dispatch(this.type + '/update', { search: v })
      },
    },
    display: {
      get() {
        return this.$store.state[this.type].display
      },
      async set(v) {
        console.log('this.type: ', this.type)
        await this.$store.dispatch(this.type + '/update', { display: v })
      },
    },
    items() {
      return this.$store.state[this.type].items
    },
  },
  async mounted() {
    await this.$store.dispatch(this.type + '/update')
  },
  updated() {},
  methods: {
    /*     async updatePage(page) {
      await this.$router.push({
        query: { ...this.$route.query, page },
      })
      this.options.page = +page
    }, */
  },
}
</script>
<style lang="scss">
.sidebtn {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 4;
  align-self: flex-start;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  overflow: hidden;
  padding-bottom: 10px;
}
.perPageSelect {
  max-width: 90px;
  margin-top: 0;
  padding-top: 0;
}
.searchLabel {
  text-transform: uppercase !important;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.6) !important;
}
</style>
