<template>
  <v-select v-model="selected" v-bind="$attrs" multiple menu-props="offset-y">
    <template #selection="{ item, index }">
      <SelectionSlot
        :label="false"
        :items="selected"
        :index="index"
        :item="item"
      /> </template
  ></v-select>
  <div
    class="panels-flexible-row panels-flexible-row-layout_2_bas-3 panels-flexible-row-first clear-block"
  >
    <div
      class="inside panels-flexible-row-inside panels-flexible-row-layout_2_bas-3-inside panels-flexible-row-inside-first clear-block"
    >
      <div
        class="panels-flexible-region panels-flexible-region-layout_2_bas-gauche_ panels-flexible-region-first panels-flexible-region-last"
      >
        <div
          class="inside panels-flexible-region-inside panels-flexible-region-layout_2_bas-gauche_-inside panels-flexible-region-inside-first panels-flexible-region-inside-last"
        >
          <div class="panel-pane pane-content-field pane-field-description">
            <div class="pane-content">
              <div class="field field-type-text field-field-description">
                <div class="field-items">
                  <div class="field-item odd">
                    <p>
                      Paul Dumouchel, philosophe et historien de la psychiatrie,
                      actuellement en r&eacute;sidence &agrave; l&rsquo;Institut
                      d&rsquo;&Eacute;tudes Avanc&eacute;es (IEA) de Paris,
                      donnera une conf&eacute;rence sur son travail actuel sur
                      Pinel
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
        return this.$store.state[this.type].filters[this.filter]
      },
      set(value) {
        this.$store.dispatch('updateFilters', {
          filters: { [this.filter]: value },
          type: this.type,
        })
      },
    },
  },

  created() {},
  beforeCreate() {},
}
</script>
<style scoped></style>
