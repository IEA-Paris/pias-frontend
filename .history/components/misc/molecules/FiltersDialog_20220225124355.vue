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
  },

  computed: {},
}
</script>
