<template lang="pug">
.fv-contract-step-detail
  fv-contact-dialog(:show='showDialog')
  v-row
    v-spacer
    fv-modal-and-button(
      :buttonText="$t('buttons.create.partner')"
      :title="$t('forms.partners.new.title')"
      :subtitle="$t('forms.partners.new.subtitle')"
      component="fv-new-partner-form"
      @modal:close="modalClosed"
      @modal:save="modalSaved"
    )
  .fv-contract-step1(v-if="etape.id === 1")
    v-row
      v-col(cols="6")
        v-select(
          v-model="contractType"
          :items="contractTypeList"
          item-text="name"
          item-value="id"
          label="Type de contrat"
          outlined=''
        )
    v-row
      v-col(cols="6")
        v-autocomplete(
          v-model="contact"
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          append-icon="mdi-plus"
          :label="$t('forms.contracts.detail.partner')"
          item-text="name"
          item-value="id"
          outlined=''
          @click:append='addContact'
        )
      v-col(cols="6")
        v-select(
          v-model="charter"
          :items="charterList"
          item-text="name"
          item-value="id"
          :label="$t('forms.contracts.detail.charter')"
          outlined=''
        )
    v-row
      v-col(cols="6")
        fv-field-date(
          :label="$t('forms.contracts.detail.dateOfSignature')"
          @date:changed="dateSignatureChanged"
        )
      v-col(cols="6")
        fv-field-date(
          :label="$t('forms.contracts.detail.effectiveDate')"
          @date:changed="dateEffectChanged"
        )
    v-row
      v-col(cols="6")
        fv-field-date(
          :label="$t('forms.contracts.detail.endDate')"
          @date:changed="dateEndChanged"
        )
      v-col(cols="6")
        v-textField(
          v-model="duree"
          readonly=''
          outlined=''
        )
</template>

<script>
export default {
  name: 'FvContractStepDetail',
  props: {
    etape: {
      type: Object,
      default() {
        return {
          id: 1,
        }
      },
    },
    values: {
      type: Object,
      default() {
        return {
          contact: null,
          charter: null,
          contractType: null,
          dteSignature: null,
          dteEffect: null,
          dteEnd: null,
        }
      },
    },
  },
  data() {
    return {
      showDialog: false,
      isLoading: false,
      search: null,
      items: [],
      payload: {
        contact: null,
        charter: null,
        contractType: null,
        dteSignature: null,
        dteEffect: null,
        dteEnd: null,
      },
    }
  },
  computed: {
    contact: {
      get() {
        return this.payload.contact || this.values.contact
      },
      set(v) {
        this.payload.contact = v
        this.$emit('wizard', this.payload)
      },
    },
    charter: {
      get() {
        return this.payload.charter || this.values.charter
      },
      set(v) {
        this.payload.charter = v
        this.$emit('wizard', this.payload)
      },
    },
    contractType: {
      get() {
        return this.payload.contractType || this.values.contractType
      },
      set(v) {
        this.payload.contractType = v
        this.$emit('wizard', this.payload)
      },
    },
    dteSignature: {
      get() {
        return this.payload.dteSignature || this.values.dteSignature
      },
      set(v) {
        this.payload.dteSignature = v
        this.$emit('wizard', this.payload)
      },
    },
    dteEffect: {
      get() {
        return this.payload.dteEffect || this.values.dteEffect
      },
      set(v) {
        this.payload.dteEffect = v
        this.$emit('wizard', this.payload)
      },
    },
    dteEnd: {
      get() {
        return this.payload.dteEnd || this.values.dteEnd
      },
      set(v) {
        this.payload.dteEnd = v
        this.$emit('wizard', this.payload)
      },
    },
    contractTypeList() {
      const res = this.$store.getters['contracts/getTypes'](1)
      return res
    },
    charterList() {
      const idA = 1
      const idB = 2
      // TODO : Selection asynchrone, requierant account et contact id
      const res = this.$store.getters['charters/get'](idA, idB)
      return res
    },
    duree: {
      get() {
        // 1 date de signature
        // 2 date effective
        // A date fin
        // const debut = signature || effective
        // const res = fin - debut
        const res = 0
        return this.$tc('forms.duration', res)
      },
      set(v) {
        console.log('Valeur de durée :', v)
      },
    },
  },
  watch: {
    search(val) {
      val && val !== this.contact && this.contactList(val)
    },
  },
  methods: {
    addContact() {
      this.showDialog = true
    },
    dateSignatureChanged(payload) {
      this.dteSignature = payload
    },
    dateEffectChanged(payload) {
      this.dteEffect = payload
    },
    dateEndChanged(payload) {
      this.dteEnd = payload
    },
    contactList(v) {
      this.isLoading = true
      const res = this.$store.getters['contacts/all']
      setTimeout(() => {
        this.items = res.filter((item) => {
          const name = item.name || ''
          return name.toLowerCase().includes((v || '').toLowerCase()) > -1
        })
        this.isLoading = false
      }, 500)
    },
    modalClosed() {
      console.log('close')
    },
    modalSaved(payload) {
      console.log('saved: ', payload)
    },
  },
}
</script>
<style scoped>
.fv-contract-step1 {
  background-color: inherit;
}
</style>
