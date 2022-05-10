<template>
  <div>
    <v-chip v-if="index < maxItems" outlined label>
      <span>{{ text }}</span>
    </v-chip>
    <v-tooltip v-if="index === maxItems" bottom>
      <template #activator="{ on, attrs }">
        <span class="caption" v-bind="attrs" v-on="on"
          >&nbsp;( {{ $t('pls-x-more', [selection.length - maxItems]) }})</span
        >
      </template>
      <span>Tooltip</span>
    </v-tooltip>
  </div>
</template>

<script>
import truncate from '~/assets/utils/truncate'
export default {
  props: {
    items: {
      type: [Object, String],
      default: () => ({}),
    },

    selection: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      required: true,
    },
    maxItems: {
      type: Number,
      default: 3,
    },
  },

  computed: {
    text() {
      return truncate(
        typeof this.item === 'object' ? this.item.text : this.item,
        18
      )
    },
  },
}
</script>
