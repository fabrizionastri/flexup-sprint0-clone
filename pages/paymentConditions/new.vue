<template lang="pug">
.payment-condition-page-new
  fv-form(
    :payload='paymentCondition'
    @form:submit="createPaymentCondition"
    url='paymentConditions'
    form='paymentConditions'
    action='new'
  )
</template>

<script>
export default {
  data() {
    return {
      paymentCondition: {},
    }
  },
  methods: {
    createPaymentCondition(payload) {
      this.$activeAccount.addPaymentCondition(payload)
    },
  },
}
</script>
