// Action de base
export default {
  get({ commit }) {
    // charger les contrat-types
    this.$repos.offers.index().then((data) => commit('set', data))
  }
}
