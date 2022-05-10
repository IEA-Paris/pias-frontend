<template>
  <v-autocomplete
    v-model="selected"
    v-bind="$attrs"
    multiple
    menu-props="offset-y"
    :loading="$nuxt.loading"
  >
    <template #selection="{ item, index }">
      <SelectionSlot :label="false" :item="item" :index="index" /> </template
  ></v-autocomplete>
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
    return {}
  },

  computed: {
    ...mapState({
      selected(state) {
        console.log('this.type: ', this.type)
        return this.type ? state.list.filters[this.type] : null
      },
    }),
  },

  created() {},
  beforeCreate() {},
}
</script>
<style scoped></style>
