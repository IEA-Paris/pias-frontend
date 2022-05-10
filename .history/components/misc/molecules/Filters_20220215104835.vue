<template>
  <aside
    class="d-sticky transition-swing mt-3"
    :class="{ 'pr-6': $store.state.scrolled }"
  >
    <v-expand-transition>
      <v-btn
        v-show="showReset"
        outlined
        x-large
        block
        height="56"
        @click="
          $router.push({
            query: null,
          })
        "
        ><v-icon left>mdi-autorenew</v-icon
        >{{ $t('reset-your-search-filters') }}</v-btn
      >
    </v-expand-transition>
    <component
      :is="filters[filter].type"
      v-for="(filter, name) in Object.keys(filters)"
      :key="name + type + filter"
      hide-details
      :dense="$vuetify.breakpoint.smAndDown"
      :items="filters[filter].items.map((item) => $t(item))"
      clearable
      :label="$t(filter)"
      min-height="56"
      outlined
      :type="type"
      :filter="filter"
      style="min-width: 150px"
      :class="!showReset && name === 0 ? 'mb-3' : 'my-3'"
    />
  </aside>
</template>
<script>
import data from '~/assets/generated/filters'
export default {
  props: {
    type: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      filters: data[this.type].filters,
      sorters: data[this.type].sort,
    }
  },
  computed: {
    showReset() {
      return Object.keys(this.$route.query).filter((item) => item !== 'page')
        .length
    },
  },
  created() {},
  methods: {},
}
</script>
<style lang="scss"></style>
