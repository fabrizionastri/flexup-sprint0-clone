// Action de base
export default {
  get({ commit }) {
    // charger les contrat-types
    this.$repos.offers.indexWithAccountId().then((data) => commit('set', data))
  },
  remove({ commit }, offer) {
    // charger les contracts
    this.$repos.offers.delete(offer.id).then(() => {
      commit('remove', offer)
    })
  },
  clear({ commit }) {
    commit('set', [])
  },
  add({ commit }, offer) {
    // charger les contracts
    if (Object.prototype.hasOwnProperty.call(offer, 'id')) {
      this.$repos.offers.update(offer).then((res) => {
        commit('remove', res)
        commit('add', res)
      })
    } else {
      this.$repos.offers.createWithAccountId(offer).then((res) => {
        commit('add', res)
      })
    }
  }
}
