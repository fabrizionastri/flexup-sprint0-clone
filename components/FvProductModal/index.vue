<template lang="pug">
.fv-product-modal
  fv-modal-slot(:dialog="show")
    template(
      slot='title'
    )
      v-toolbar(flat='')
        v-toolbar-title {{ $t('forms.products.new.change') }}
        v-spacer
        v-btn(
          icon=''
          @click.stop="close"
        )
          v-icon mdi-close
    template(
      slot='form'
    )
      fv-product-step-detail(
        :product="product"
        @payload:changed="productChanged"
      )
    template(
      slot='actions'
    )
      v-spacer
      fv-modal-actions(
        @modal:actions:close="close"
        @modal:actions:save="save"
      )
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default() {
        return false
      },
    },
    product: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    close() {
      this.$emit('modal:close')
    },
    save() {
      this.$emit('modal:save')
    },
    productChanged(product) {
      this.$emit('product:changed', product)
    },
  },
}
</script>
