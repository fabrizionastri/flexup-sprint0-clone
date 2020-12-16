export default ($axios, store) => (resource) => ({
  async index() {
    const res = await $axios.$get(`/${resource}`)
    // const headers = await $axios.$get(`/${resource}-headers`)
    // Creer un RepoWithHeaders.js et faire ca dedans
    // return { items: res, headers }
    return res
  },
  async indexWithAccountId() {
    const accountId = store.getters['accounts/selected']
    const res = await $axios.$get(`/${resource}?account_id=${accountId}`)
    // const headers = await $axios.$get(`/${resource}-headers`)
    // return { data: res, headers }
    return res
  },
  async show(id) {
    const res = await $axios.$get(`/${resource}/${id}`)
    return res
  },
  async create(payload) {
    delete payload.id
    const res = await $axios.$post(`/${resource}`, payload)
    return res
  },
  async createWithAccountId(inputPayload) {
    const payload = inputPayload
    delete payload.id
    const accountId = store.getters['accounts/selected']
    payload.account_id = accountId
    const res = await $axios.$post(`/${resource}`, payload)
    return res
  },
  async update(payload) {
    const id = parseInt(payload.id)
    // on supprime: id, created_at et updated_at
    delete payload.id
    delete payload.created_at
    delete payload.updated_at
    const res = await $axios.$put(`/${resource}/${id}`, payload)
    return res
  },
  async delete(id) {
    const res = await $axios.$delete(`/${resource}/${id}`)
    return res
  }
})
