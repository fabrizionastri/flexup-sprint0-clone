<template lang="pug">
.payment-structure-page-new
  fv-form(
    :payload='paymentStructure'
    @form:submit="createPaymentStructure"
    url='paymentStructures'
    form='paymentStructures'
    action='new'
  )
</template>

<script>
export default {
  data() {
    return {
      paymentStructure: {},
    }
  },
  methods: {
    createPaymentStructure(payload) {
      console.log('Create payment structure: ', payload)
      this.$activeAccount.addPaymentStructure(payload)
    },
  },
}
</script>
