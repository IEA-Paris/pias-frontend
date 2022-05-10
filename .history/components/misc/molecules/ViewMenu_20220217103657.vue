<template>
  <v-menu offset-y>
    <template #activator="{ on: menu, attrs }">
      <v-tooltip bottom>
        <template #activator="{ on: tooltip }">
          <v-btn
            x-large
            tile
            icon
            v-bind="attrs"
            class="mr-3"
            v-on="{ ...tooltip, ...menu }"
          >
            <v-icon> mdi-{{ current.icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ $t(current.text) }}</span>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        @click="updateView(item.value)"
      >
        <v-list-item-icon>
          <v-icon>mdi-{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t(item.text) }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import lists from '~/assets/data/lists'
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
      items: lists[this.type].view,
    }
  },
  computed: {
    current() {
      return (
        this.items.find((item) =>
         item.text === this.$store.state[this.type].view
          )
        ] || this.items[0]
      )
    },
  },
  mounted() {},
  methods: {
    async updateSort(values) {
      await this.$store.dispatch(this.type + '/updateSort', values)
    },
  },
}
</script>
<style lang="scss"></style>
