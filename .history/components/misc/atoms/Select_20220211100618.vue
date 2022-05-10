<template>
  <v-select
    v-model="selected"
    v-bind="$attrs"
    multiple
    menu-props="offset-y"
    :loading="$nuxt.loading"
  >
    <template #selection="{ item, index }">
      <SelectionSlot :label="false" :item="item" :index="index" /> </template
  ></v-select>
</template>

<script>
import { mapState } from 'vuex'
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
      selectedRaw: [],
    }
  },

  computed: {
    ...mapState({
      selected: (state) => state.filters[this.type],
    }),
  },

  created() {},
  beforeCreate() {},
}
</script>
<style scoped></style>
