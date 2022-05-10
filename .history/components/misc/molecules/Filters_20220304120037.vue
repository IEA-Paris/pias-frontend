<template>
  <div>
    <aside class="d-sticky transition-swing">
      <v-btn
        v-if="showReset"
        outlined
        x-large
        block
        :height="$vuetify.breakpoint.sm ? '40' : '56'"
        @click="$store.dispatch(type + '/resetState') && $emit('close')"
        ><v-icon left>mdi-autorenew</v-icon
        >{{ $t('reset-your-search-filters') }}</v-btn
      >
      <v-sheet v-else height="56" block class="search-label">
        {{ $t('filters') }}
      </v-sheet>

      <component
        :is="filters[filter].type"
        v-for="(filter, name) in Object.keys(filters)"
        :key="name + type + filter"
        hide-details
        :dense="$vuetify.breakpoint.sm"
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
  </div>
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
      return this.$store.state[this.type].filtersCount
    },
  },
  created() {},
  methods: {},
}
</script>
<style lang="scss">
aside {
  position: sticky;
  top: 10px;
  width: inherit;
  left: 250;
  margin-top: 6.5rem;
  margin-left: 25px;
  align-self: start;
  max-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: thin;
}
.search-label {
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: #666666;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.6);
  font-family: 'Open sans', sans-serif;
  font-size: 16px;
}
</style>
