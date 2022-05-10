import {
  baseState,
  baseMutations,
  baseActions,
} from '~/assets/data/storeListModule'

export const state = () => ({ ...baseState.slice(), type: 'articles' })

export const mutations = {
  ...baseMutations,
}
export const actions = { ...baseActions }
