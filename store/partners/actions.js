// Action de base
export default {
  get({ commit }) {
    // charger les contracts
    this.$repos.partners.index().then((data) => commit('set', data))
  },
  remove({ commit }, partner) {
    // charger les contracts
    this.$repos.partners.delete(partner).then(() => commit('remove', partner))
  },
  add({ commit }, partner) {
    // charger les contracts
    if (Object.prototype.hasOwnProperty.call(partner, 'id')) {
      console.log('on update')
      this.$repos.partners.update(partner).then((res) => {
        commit('remove', res)
        commit('add', res)
      })
    } else {
      console.log('on ajoute')
      this.$repos.partners.create(partner).then((res) => {
        commit('add', res)
      })
    }
  }
}
