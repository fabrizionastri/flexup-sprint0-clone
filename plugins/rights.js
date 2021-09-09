const rights = (ctx) => ({
  getCurrentRoles() {
    const userId = ctx.$auth.user.sub
    const accountId = ctx.$activeAccount.get()
    return ctx.store.getters['members/roleFor'](accountId, userId)
  },
  canEditOwners() {
    const roles = this.getCurrentRoles()
    return roles.includes('admin')
  },
  canCreateProduct() {
    const roles = this.getCurrentRoles()
    return roles.includes('admin') || roles.includes('editor')
  }
})

export default (ctx, inject) => {
  inject('rights', rights(ctx))
}
