<template>
  <v-card nuxt :to="localePath('/authors/' + item.slug)">
    <v-row class="mt-12" :class="{ 'mx:6': $vuetify.breakpoint.mdAndUp }">
      <v-col
        v-if="$vuetify.breakpoint.mdAndUp"
        cols="3"
        col-md-offset="1"
        justify="center"
        align="center"
        class="d-flex flex-column align-center"
      >
        <v-avatar size="160" class="mb-3">
          <OptimizedImage
            v-if="item.image"
            alt="Avatar"
            :src="item.image"
            height="160"
            :ratio="1"
          />
          <v-icon
            v-else
            class="white--text headline"
            :style="
              'background-color:' +
              $vuetify.theme.themes.light.primary +
              '; font-style: normal;'
            "
            >{{ item.firstname[0] + item.lastname[0] }}</v-icon
          >
        </v-avatar>
        <div class="flex-row justify-center">
          <v-tooltip v-for="social in socials" :key="social.link" bottom>
            <template #activator="{ on, attrs }">
              <v-btn
                text
                icon
                color="primary"
                v-bind="attrs"
                :href="social.link"
                target="_blank"
                v-on="on"
              >
                <v-icon>{{ social.icon }}</v-icon></v-btn
              >
            </template>
            <span>{{ social.tooltip }} </span>
          </v-tooltip>
        </div>
      </v-col>
      <v-col cols="12" md="8" class="mx-3">
        <div :id="slugifyItem(item.lastname)" class="anchor"></div>
        <div
          class="text-h5 font-weight-black"
          v-html="highlight(item.firstname + ' ' + item.lastname, search)"
        ></div>
        <div
          class="text-h6 mb-3"
          v-html="highlight(item.title_and_institution, search)"
        ></div>
        <div
          v-if="$vuetify.breakpoint.smAndDown"
          class="flex-row justify-center mb-6"
        >
          <v-tooltip v-for="social in socials" :key="social.link" bottom>
            <template #activator="{ on, attrs }">
              <v-btn
                text
                icon
                color="primary"
                v-bind="attrs"
                :href="social.link"
                target="_blank"
                v-on="on"
              >
                <v-icon>{{ social.icon }}</v-icon></v-btn
              >
            </template>
            <span>{{ social.tooltip }} </span>
          </v-tooltip>
        </div>
        <div class="author-exerpt">
          <nuxt-content :document="item" />
        </div>
        <small v-if="item.copyright" class="muted caption"
          >Image of &copy; {{ item.copyright }}</small
        >
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import slugify from '~/assets/utils/slugify'
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
  },
  data() {
    return {
      podcast: false,
      socials: [
        ...(this.item.social_channels.website
          ? [
              {
                link: this.item.social_channels.website,
                icon: 'mdi-link-variant',
                tooltip: 'Visit this author website', // TODO i18n
              },
            ]
          : []),
        ...(this.item.social_channels.wikipedia
          ? [
              {
                link: this.item.social_channels.wikipedia,
                icon: 'mdi-wikipedia',
                tooltip: 'Check the Wikipedia page of the author',
              },
            ]
          : []),
        ...(this.item.social_channels.orcid
          ? [
              {
                link: this.item.social_channels.orcid,
                icon: 'mdi-account',
                tooltip: 'Visit the author Orcid page',
              },
            ]
          : []),
        ...(this.item.social_channels.google_scholar
          ? [
              {
                link: this.item.social_channels.google_scholar,
                icon: 'mdi-google',
                tooltip: 'Visit the author Google Scholar page',
              },
            ]
          : []),
        ...(this.item.social_channels.mendeley
          ? [
              {
                link: this.item.social_channels.mendeley,
                icon: 'mdi-school',
                tooltip: 'Visit the author Mendeley page',
              },
            ]
          : []),
        ...(this.item.social_channels.researchgate
          ? [
              {
                link: this.item.social_channels.researchgate,
                icon: 'mdi-flask',
                tooltip: 'Visit the author Researchgate page',
              },
            ]
          : []),
        ...(this.item.social_channels.linkedin
          ? [
              {
                link: this.item.social_channels.linkedin,
                icon: 'mdi-linkedin',
                tooltip: 'Get in touch on Linkedin',
              },
            ]
          : []),
        ...(this.item.social_channels.twitter
          ? [
              {
                link: this.item.social_channels.twitter,
                icon: 'mdi-twitter',
                tooltip: 'Follow this author on Twitter',
              },
            ]
          : []),
        ...(this.item.social_channels.instagram
          ? [
              {
                link: this.item.social_channels.instagram,
                icon: 'mdi-instagram',
                tooltip: 'Visit the author Instagram page',
              },
            ]
          : []),
      ],
    }
  },
  async fetch() {},
  computed: {},
  mounted() {},
  methods: {
    slugifyItem(item) {
      return slugify(item)
    },
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

<style scoped>
.author-exerpt {
  max-width: 650px;
  height: 80px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
div.anchor {
  display: block;
  position: relative;
  top: -100px;
  visibility: hidden;
}
</style>
