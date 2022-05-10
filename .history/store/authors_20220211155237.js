import {
  state,
  mutations,
  actions,
  getters,
} from '~/assets/data/storeListModule'

export const state = { ...state(), type: 'authors' }

export const mutations = {
  ...mutations,
}
export const actions = {}
