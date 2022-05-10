import {
  baseState,
  baseMutations,
  baseActions,
  baseGetters,
} from '~/assets/data/storeListModule'

export const state = () => ({ ...baseState('media') })

export const mutations = {
  ...baseMutations,
}
export const actions = { ...baseActions }
export const getters = { ...baseGetters }
