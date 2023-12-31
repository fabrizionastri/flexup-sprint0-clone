<template lang="pug">
.fv-order-line-list
  v-row
    v-col(cols="12")
      v-data-table.elevation-2(
        data-testid="dataTable"
        :headers='headers'
        :items='orderLines'
        item-key='id'
      )
        template(v-slot:item.product="{ item }")
          div(v-to-locale="item.product")
        template(v-slot:item.unit="{ item }")
          div(v-to-unit="item")
        template(v-slot:item.quantity="{ item }")
          div.text-right(v-if="details")
            fv-flex-items
              template(v-slot:left)
                div(class="quantity-input") {{ item.quantity }}
              template(v-slot:right)
                div {{ item.unit }}
          div(v-else)
            fv-flex-items
              template(v-slot:left)
                fv-quantity-selector.quantity-selector-input(
                  :quantity="item.quantity"
                  @quantitySelector:changed="quantityChanged(arguments, item)"
                )
              template(v-slot:right)
                div {{ item.unit }}
        template(v-slot:item.price="{ item }")
          fv-flex-items
            template(v-slot:left)
              fv-price-to-preferred-currency(
                :price="item.price"
                :currency="item.currency"
              )
            template(v-slot:separator)
              div /
            template(v-slot:right)
              div {{ item.unit }}
        template(v-slot:item.total="{ item }")
          div.text-right(v-to-preferred-currency="{amount: item.price * item.quantity, currency: item.currency}")
        template(v-slot:item.vat='{ item }')
          div.text-right(v-if="details")
            div(class="vat-input") {{ item.vat }} %
          div(v-else)
            fv-vat-field(
              :value="item.vat"
              :hideDetails="true"
              :dense="true"
              class="vat-selector-input"
              @vat:changed="vatChanged(arguments, item)"
            )
        template(v-slot:item.status="{ item }")
          fv-status-select(:status="item.status")
        template(v-slot:item.actions="{ item }")
          div(v-if="details")
          div(v-else)
            fv-delete-action(
              @delete:clicked="deleteOrderLine(item)"
            )
</template>

<script>
import { translateHeaders } from '~/plugins/utils'

export default {
  name: 'FvOrderLineList',
  props: {
    orderLines: {
      type: Array,
      default() {
        return []
      },
    },
    details: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  computed: {
    headers() {
      const addAction = !this.details
      const res = this.$activeAccount.headersOrderLines(addAction)
      return translateHeaders(this.$i18n, res)
    },
  },
  mounted() {
    this.$store.dispatch('headers/getOrderLineHeaders')
    this.$store.dispatch('accounts/get')
    this.$store.dispatch('settings/getSettings')
  },
  methods: {
    vatChanged(values, item) {
      const vat = values[0]
      this.$emit('orderLines:vatChanged', item, vat)
    },
    quantityChanged(values, item) {
      const quantity = values[0]
      this.$emit('orderLines:quantityChanged', item, quantity)
    },
    deleteOrderLine(v) {
      this.$emit('orderLines:delete', v)
    },
  },
}
</script>

<style scoped>
.vat-input {
  width: 50px;
}
.quantity-input {
  max-width: 50px;
  margin-right: 0px;
  margin-left: auto;
}
.vat-selector-input {
  width: 100px;
  margin-right: 0px;
  margin-left: auto;
}
.quantity-selector-input {
  width: 200px;
  margin-right: 10px;
  margin-left: auto;
}
</style>
