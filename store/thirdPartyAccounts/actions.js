// Action de base
export default {
  get({ commit }) {
    // charger les contracts
    this.$repos.thirdPartyAccounts
      .indexWithAccountId()
      .then((data) => commit('set', data))
  },
  getAll({ commit }) {
    this.$repos.thirdPartyAccounts.index().then((data) => {
      commit('setAll', data)
    })
  },
  clear({ commit }) {
    commit('set', [])
  },
  remove({ commit }, thirdParty) {
    this.$repos.thirdPartyAccounts
      .delete(thirdParty.id)
      .then(() => commit('remove', thirdParty))
  },
  add({ commit }, thirdParty) {
    if (thirdParty.type === 'Personal')
      thirdParty.name = [thirdParty.firstname, thirdParty.lastname].join(' ')
    if (Object.prototype.hasOwnProperty.call(thirdParty, 'id')) {
      this.$repos.thirdPartyAccounts.update(thirdParty).then((res) => {
        commit('remove', res)
        commit('add', res)
      })
    } else {
      this.$repos.thirdPartyAccounts
        .createWithAccountId(thirdParty)
        .then((res) => {
          commit('add', res)
        })
    }
  },
  addToFlexup({ _commit }, thirdParty) {
    this.$repos.thirdPartyAccounts.create(thirdParty)
  }
}
