<template lang="pug">
.fv-modal-slot
  v-dialog(
    data-testid="modal"
    v-model='dialog'
    persistent
    max-width='50%'
  )
    v-card.card
      v-card-title
        slot(name='title')
      v-card-text
        slot(name='form')
      v-card-actions
        slot(name='actions')
</template>

<script>
export default {
  name: 'FvModal',
  props: {
    dialog: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
}
</script>

<style scoped>
.card {
  overflow-x: hidden;
}
</style>
