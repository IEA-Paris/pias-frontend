import {
  baseState,
  baseMutations,
  baseActions,
  baseGetters,
} from '~/assets/data/storeListModule'

export const state = () => ({ ...baseState('articles') })
console.log('baseState('articles'): ', baseState('articles'));

export const mutations = {
  ...baseMutations,
}
export const actions = { ...baseActions }
export const getters = { ...baseGetters }
