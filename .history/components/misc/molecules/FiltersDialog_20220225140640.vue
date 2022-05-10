<template>
  <v-dialog v-model="open" fullscreen hide-overlay overflowed>
    <template #activator="{ on, attrs }">
      <v-badge bordered color="error" :content="filtersCount" overlap>
        <v-btn v-bind="attrs" large tile fab absolute bottom right v-on="on">
          <v-icon left>mdi-filter</v-icon>
        </v-btn>
      </v-badge>
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
            <Filters :type="type" class="mt-7 w-100" />

            <v-btn
              :disabled="filtersCount > 0"
              x-large
              tile
              outlined
              class="ml-6 mr-2 w-100"
              @click="open = false"
            >
              {{ $t('view-results') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
      default: 'articles',
    },
    filtersCount: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      open: false,
    }
  },
  computed: {},
  mounted() {},
  methods: {},
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
</style>
