export default {
  set(state, items) {
    state.items = items
  },
  setManageMenu(state, items) {
    state.manageMenu = items
  },
  setUserMenu(state, items) {
    state.userMenu = items
  },
  setAccountMenu(state, items) {
    state.accountMenu = items
  },
  setBuyerMenu(state, items) {
    state.buyerMenu = items
  },
  setSellerMenu(state, items) {
    state.sellerMenu = items
  },
  setGlobalMenu(state, items) {
    state.globalMenu = items
  },
  setManageNavBar(state, items) {
    state.manageNavBar = items
  },
  setSellerNavBar(state, items) {
    state.sellerNavBar = items
  },
  setSettings(state, item) {
    state.settings = item
  },
  setDefaultSettings(state, item) {
    state.defaultSettings = item
  },
}
