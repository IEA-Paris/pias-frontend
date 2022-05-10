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
        <span>{{ $t(current.text || '') }}</span>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        @click="updateSort(item.value)"
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
      items: lists[this.type].sort,
    }
  },
  computed: {
    current() {
      const current =
        this.items[
          Object.keys(this.items).find((item) => {
            console.log('1 ', this.items[item].value.join(''))
            console.log(
              'this.$store.state[this.type].sortBy[0]?: ',
              this.$store.state[this.type].sortBy[0]
            )
            console.log(
              '2 ',
              this.$store.state[this.type].sortBy[0]?.length
                ? this.$store.state[this.type].sortBy[0]
                : this.items[
                    Object.keys(this.items).find(
                      (item) => this.items[item].default === true
                    )
                  ].value[0]
            )
            return (
              this.items[item].value.join('') ===
              (this.$store.state[this.type].sortBy[0]
                ? this.items[
                    Object.keys(this.items).find(
                      (item) => this.items[item].default === true
                    )
                  ].value[0]
                : this.$store.state[this.type].sortBy[0]) +
                (this.$store.state[this.type].sortDesc[0] ? 'desc' : 'asc')
            )
          })
        ] || this.items[Object.keys(this.items).find((item) => item.default)]
      console.log('current: ', current)
      return current
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
