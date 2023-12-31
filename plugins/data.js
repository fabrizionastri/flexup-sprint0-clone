import createRepository from '~/api/Repository'

export default (ctx, inject) => {
  const repo = createRepository(ctx.$axios, ctx.store)

  const repos = {
    accounts: repo('accounts'),
    accountMenu: repo('accountMenu'),
    businessAccountSteps: repo('business-account-steps'),
    subAccountSteps: repo('sub-account-steps'),
    buyerMenu: repo('buyerMenu'),
    categories: repo('categories'),
    charters: repo('charters'),
    countries: repo('countries'),
    currencies: repo('currencies'),
    contacts: repo('contacts'),
    contactSteps: repo('contact-steps'),
    contractHeaders: repo('contract-headers'),
    contracts: repo('contracts'),
    contractSteps: repo('contract-steps'),
    contractTypes: repo('contract-types'),
    functionalRoles: repo('functional-roles'),
    givenRoles: repo('given-roles'),
    globalMenu: repo('globalMenu'),
    legalStructure: repo('legal-structure'),
    manageMenu: repo('manageMenu'),
    manageNavBar: repo('manageNavBar'),
    medias: repo('medias'),
    orderItemHeaders: repo('order-item-headers'),
    orders: repo('orders'),
    orderSteps: repo('order-steps'),
    paymentConditions: repo('payment-conditions'),
    paymentConditionsForPaymentStructureForm: repo('payment-conditions-for-payment-structure-form'),
    paymentConditionsSteps: repo('payment-condition-steps'),
    paymentStructures: repo('payment-structures'),
    paymentStructureSteps: repo('payment-structure-steps'),
    personalAccountSteps: repo('personal-account-steps'),
    products: repo('products'),
    productSteps: repo('product-steps'),
    references: repo('references'),
    sellerMenu: repo('sellerMenu'),
    sellerNavBar: repo('sellerNavBar'),
    settings: repo('settings'),
    team: repo('team'),
    thirdPartyAccounts: repo('third-party-accounts'),
    thirdPartyAccountSteps: repo('third-party-account-steps'),
    units: repo('units'),
    userMenu: repo('userMenu'),
    users: repo('users'),
  }

  inject('repos', repos)
}
