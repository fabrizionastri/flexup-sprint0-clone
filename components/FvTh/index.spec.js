import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import FvTh from './index.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('FvTh', () => {
  let store

  const factory = (propsData) => {
    return mount(FvTh, {
      localVue,
      store,
      computed: {
        sortIconColor: () => 'black',
      },
      propsData: {
        ...propsData,
      },
    })
  }
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        settings: {
          namespaced: true,
          state: {},
          actions: {
            getSettings: jest.fn(),
          },
        },
      },
    })
  })
  it('should render a fv th', () => {
    const wrapper = factory()
    expect(wrapper.find('[data-testid="div"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-testid="text"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-testid="sortIcon"]').exists()).toBeFalsy()
  })
  it('should render a sort icon if sortable', () => {
    const wrapper = factory({ sortable: true })
    expect(wrapper.find('[data-testid="sortIcon"]').exists()).toBeTruthy()
  })
  it('should do nothing when clicked and not sortable', () => {
    const wrapper = factory()
    const div = wrapper.find('[data-testid="div"]')
    div.trigger('click')
    const thSortEmitted = wrapper.emitted('th:sort')
    expect(thSortEmitted).toBe(undefined)
  })
  it('should emit an event when clicked and sortable', () => {
    const wrapper = factory({ sortable: true })
    const div = wrapper.find('[data-testid="div"]')
    div.trigger('click')
    const thSortEmitted = wrapper.emitted('th:sort')
    expect(thSortEmitted).toHaveLength(1)
  })
})
