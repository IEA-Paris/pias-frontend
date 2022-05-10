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
    selected: {
      ...mapState({
        [this.type]: (state) => state.filters[this.type],
      }),
      get() {
        return this.selectedRaw
      },

      set(value) {
        // set on parent
        this.$router.replace({
          query: {
            ...this.$route.query,
            [this.type]:
              value && value.length ? JSON.stringify(value) : undefined,
          },
        })
        this.selectedRaw = value
        console.log('QIUE')
      },
    },
  },
  watch: {
    '$route.query'() {
      if (this.$route.query[this.type]) {
        this.selectedRaw = JSON.parse(this.$route.query[this.type])
      } else {
        this.selectedRaw = []
      }
    },
  },

  created() {
    if (this.$route.query[this.type]) {
      this.selectedRaw = JSON.parse(this.$route.query[this.type])
    } else {
      this.selectedRaw = []
    }
  },
  beforeCreate() {},
}
</script>
<style scoped></style>
