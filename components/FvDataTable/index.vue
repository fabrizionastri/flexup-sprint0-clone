<template lang="pug">
.fv-data-table
  v-data-table(
    data-testid="dataTable"
    :headers='translatedHeaders'
    :items='items ? items : []'
    :hide-default-footer="hideDefaultFooter"
    :items-per-page="$store.getters['settings/itemPerPage']"
    :footer-props="{ \
      itemsPerPageText: $t('dataTable.footer.rowsPerPage'), \
      itemsPerPageAllText: $t('dataTable.footer.all'), \
      itemsPerPageOptions: rowsPerPageOption \
    }"
    :server-items-length="itemsLength"
    :options="options"
    :style="cssVars"
    disable-sort
    @click:row='selected'
    @pagination='paginationChanged'
  )
    template(
      v-slot:footer.page-text="{ pageStart, pageStop }"
    )
      div {{ pageStart }} {{ $t('dataTable.footer.of') }} {{ pageStop }}
    template(
      v-slot:[getThSlot(key)]="{ header }"
      v-for="key in headers.map(header => header.value)"
    )
      fv-th(
        :class="headerClass(header.align)"
        data-testid="fvTh"
        :text="header.text"
        :sortKey="header.value"
        :sortable="header.sortable"
        :isSorted="header.value === sortKey"
        :isSortedDesc="header.value === sortKey && sortDesc"
        @th:sort="thSort"
      )
    template(
      v-for="(index, name) in $scopedSlots" v-slot:[name]="data"
    )
      slot(
        :name="name"
        v-bind="data"
      )
</template>

<script>
import { translateHeaders } from '~/plugins/utils'

export default {
  name: 'FvDataTable',
  props: {
    hideDefaultFooter: {
      type: Boolean,
      default() {
        return false
      },
    },
    headers: {
      type: Array,
      default() {
        return []
      },
    },
    items: {
      type: Array,
      default() {
        return []
      },
    },
    itemsLength: {
      type: Number,
      default() {
        return undefined
      },
    },
    options: {
      type: Object,
      default() {
        return null
      },
    },
  },
  data() {
    return {
      sortKey: null,
      sortDesc: false,
      rowsPerPageOption: [this.$store.getters['settings/itemPerPage'], 20, 50, 100, -1],
    }
  },
  computed: {
    displayedHeaders() {
      return this.headers.filter((header) => header.active && header.displayed)
    },
    translatedHeaders() {
      return translateHeaders(this.$i18n, this.displayedHeaders)
    },
    cssVars() {
      const settings = this.$store.getters['settings/settings']
      const theme = settings.theme
      let color = '#DBEDFF'
      if (theme === 'dark') color = '#656667'
      const res = {
        '--theadColor': color,
      }
      return res
    },
  },
  mounted() {
    this.$store.dispatch('settings/getSettings')
  },
  methods: {
    getThSlot(key) {
      return 'header.' + key
    },
    thSort(v) {
      const key = v
      if (this.sortKey === key && this.sortDesc) {
        this.sortKey = null
        this.sortDesc = false
      } else if (this.sortKey === key) {
        this.sortDesc = true
      } else {
        this.sortKey = key
        this.sortDesc = false
      }
      const payload = {
        key: this.sortKey,
        desc: this.sortDesc,
      }
      this.$emit('dataTable:sortBy', payload)
    },
    selected(item) {
      this.$emit('dataTable:selected', item)
    },
    paginationChanged(pagination) {
      if (this.itemsLength) pagination.itemsLength = this.itemsLength
      this.$emit('dataTable:paginationChanged', pagination)
    },
    headerClass(alignment) {
      let flexAlignment = alignment
      if (flexAlignment === 'left') flexAlignment = 'start'
      if (flexAlignment === 'right') flexAlignment = 'end'
      const res = 'd-flex justify-' + flexAlignment
      return res
    },
  },
}
</script>

<style scoped>
::v-deep thead {
  background-color: var(--theadColor);
}
</style>
