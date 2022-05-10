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
export default {
  props: {
    type: {
      type: String,
      default: '',
      required: true,
    },
    filter: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {}
  },

  computed: {
    selected: {
      get() {
        console.log('this.$store.: ', this.$store.state)
        return this.$store.state[this.type].filters[this.filter]
      },
      set(value) {
        this.$store.dispatch(this.type + '/update', {
          filters: { [this.filter]: value },
        })
      },
    },
  },

  created() {},
  beforeCreate() {},
}
</script>
<style scoped></style>
