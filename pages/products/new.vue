<template lang="pug">
  .page-product-new
    fv-form(
      :payload='product'
      @form:submit="createProduct"
      url='products'
      form='products'
      action='new'
    )
</template>

<script>
export default {
  data() {
    return {
      product: {
        status: 'active',
      },
    }
  },
  methods: {
    createProduct(payload) {
      this.$activeAccount.addProduct(payload)
    },
  },
}
</script>
