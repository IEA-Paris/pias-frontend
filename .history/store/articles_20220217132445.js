import {
  baseState,
  baseMutations,
  baseActions,
  baseGetters,
} from '~/assets/data/storeListModule'
console.log('baseState('articles'): ', baseState('articles'));

export const state = () => ({ ...baseState('articles') })

export const mutations = {
  ...baseMutations,
}
export const actions = { ...baseActions }
export const getters = { ...baseGetters }
