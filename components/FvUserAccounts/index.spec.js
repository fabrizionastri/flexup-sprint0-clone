import { mount } from '@vue/test-utils'
import FvUserAccount from './index.vue'

describe('FvUserAccount', () => {
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.append(app)
  const factory = (propsData) => {
    return mount(FvUserAccount, {
      stubs: {
        FvLoginButton: true,
        FvListAccounts: true
      },
      mocks: {
        $auth: {
          loggedIn: propsData ? propsData.loggedIn : true,
          user: {
            preferred_username: 'toto'
          }
        },
        theme: {}
      }
    })
  }
  it('should render a fvUserAccount when logged in', () => {
    const wrapper = factory()
    expect(wrapper.find('[data-testid="loginBtn"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="menu"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="accountBtn"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="accountList"]').exists()).toBe(false)
  })
  it('should render a loggedIn button when logged out', () => {
    const wrapper = factory({ loggedIn: false })
    expect(wrapper.find('[data-testid="loginBtn"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="menu"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="accountBtn"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="accountList"]').exists()).toBe(false)
  })
  it('should show the account list when button is clicked', async () => {
    const wrapper = factory()
    await wrapper.find('[data-testid="accountBtn"]').trigger('click')
    expect(wrapper.find('[data-testid="accountList"]').exists()).toBe(true)
  })
})
