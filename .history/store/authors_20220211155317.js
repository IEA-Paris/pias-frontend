import {
  baseState,
  baseMutations,
  baseActions,
  baseGetters,
} from '~/assets/data/storeListModule'

export const state = { ...baseState(), type: 'authors' }

export const mutations = {
  ...baseMutations,
}
export const actions = { ...baseActions }
