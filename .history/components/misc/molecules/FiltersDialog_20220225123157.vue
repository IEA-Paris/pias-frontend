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
        <v-toolbar-title>{{ $t('pages.search.filters') }}</v-toolbar-title>
      </v-toolbar>
      <div class="pa-4">
        <Filters />
        <v-row dense>
          <v-col>
            <v-checkbox
              v-model="verified"
              label="Verified"
              class="mt-0"
              hide-details
              :disabled="featured || loading"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-checkbox
              v-model="featured"
              label="Featured"
              class="mt-0"
              hide-details
              :disabled="loading"
            />
          </v-col>
        </v-row>
        <v-row v-if="$config.isBranch">
          <v-col>
            <v-checkbox
              v-model="showAllProjects"
              label="All projects"
              class="mt-0"
              hide-details
              :disabled="loading"
            />
          </v-col>
        </v-row>
        <v-btn
          :disabled="!activeFiltersCounter"
          large
          block
          @click="$store.dispatch('project/resetFilters')"
        >
          <v-icon left>mdi-refresh</v-icon>
          {{ $t('pages.search.resetFilters') }}
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
import { mapState, mapGetters } from 'vuex'
import Filters from './Filters.vue'

export default {
  components: {
    Filters,
  },

  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    ...mapState('project', {
      loading: (state) => state.loading,
    }),
    ...mapGetters('project', ['activeFiltersCounter']),
    verified: {
      get() {
        return (
          this.$store.state.project.filters.verified ||
          this.$store.state.project.filters.featured
        )
      },
      set(value) {
        this.$store.dispatch('project/updateFilters', { verified: value })
      },
    },
    featured: {
      get() {
        return this.$store.state.project.filters.featured
      },
      set(value) {
        return this.$store.dispatch('project/updateFilters', {
          featured: value,
        })
      },
    },
  },
}
</script>
