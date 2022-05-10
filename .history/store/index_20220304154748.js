import Vue from 'vue'
import filtersRaw from '~/assets/data/filters'
import lists from '~/assets/data/lists'

export const state = () => ({
  scrolled: process.browser ? window.pageYOffset > 0 : false,
  logo: 0,
})

export const mutations = {
  setLogo(state, value) {
    state.logo = value
  },
  setScrolled(state) {
    if (process.browser) {
      state.scrolled = window.pageYOffset > 0
    }
  },

  loadRouteQuery(state, type, rootState) {
    const query = this.app.router.currentRoute.query
    let pristine = true
    if (query.search) {
      this.state[type].search = query.search
      pristine = false
    }
    if (query.filters) {
      pristine = false
      const filters = JSON.parse(query.filters)
      Object.keys(filters).forEach((filter) => {
        Vue.set(this.state[type].filters, filter, filters[filter])
      })
    }
    console.log('LOAD ROUTE QUREYR')

    if (query.view) Vue.set(state, 'view', query.view)
    if (query.page) {
      Vue.set(state, 'page', query.page)
    } else {
      Vue.set(state, 'page', 1)
    }
    if (query.sortBy) Vue.set(state, 'sortBy', query.sortBy)
    console.log('query.sortDesc: ', query.sortDesc)
    if (query.sortDesc) Vue.set(state, 'sortDesc', query.sortDesc)
  },
  setSearch(state, search, type, rootState) {
    this.state[type].search = search
  },
  setItems(state, values, type, rootState) {
    this.state[type].items = values.items
    this.state[type].total = values.total
    this.state[type].numberOfPages = values.numberOfPages
  },
  setItemsPerPage(state, value, type, rootState) {
    this.state[type].itemsPerPage = value
  },
  setPage(state, page, type, rootState) {
    console.log('page: ', page, type, rootState)
    Vue.set(state, 'page', page)
    console.log('this.state[type].apge', this.state[type].page)
  },
  setFilters(state, filters, type, rootState) {
    Vue.set(
      this.state[type].filters,
      Object.keys(filters)[0],
      filters[Object.keys(filters)[0]]
    )
  },
  setSort(state, values, type, rootState) {
    console.log('values: ', values)
    this.state[type].sortBy = [values[0]]
    this.state[type].sortDesc = [values[1] === 'desc']
  },
  setView(state, value, type, rootState) {
    this.state[type].view = value
  },
  setFiltersCount(state, type, rootState) {
    console.log('rootState: ', state)
    console.log('type: ', type)
    const filters = this.state[type].filters
    const filtersCount = Object.keys(filters)
      // remove empty values
      .filter(
        (filter) =>
          (typeof filters[filter] === 'boolean' &&
            filters[filter] !== null &&
            filters[filter] !== undefined) ||
          (Array.isArray(filters[filter]) && filters[filter].length) ||
          (typeof filters[filter] === 'object' &&
            Object.keys(filters[filter]).length)
      ).length
    this.state[type].filtersCount = filtersCount
  },
  setBlankState(state, type, rootState) {
    console.log('RESET STATE')
    const defaultView =
      lists[type].views[
        Object.keys(lists[type].views).find(
          (item) => lists[type].views[item].default === true
        )
      ]
    const defaultSort = [
      lists[type].sort[
        Object.keys(lists[type].sort).find(
          (item) => lists[type].sort[item].default === true
        )
      ],
    ]
    console.log('defaultSort: ', defaultSort)
    Vue.set(state, 'filters', {
      years: [],
      category: [],
      tags: [],
      language: [],
    })

    Vue.set(state, 'search', '')
    Vue.set(state, 'view', defaultView.name)
    Vue.set(state, 'sortBy', [defaultSort[0].value[0]])
    Vue.set(state, 'sortDesc', [defaultSort[0].value[1]] === 'desc')
  },
}

// ACTIONS
export const actions = {
  async resetState({ dispatch, commit, state, rootState }, value, type) {
    commit('setBlankState', type)
    commit('setPage', 1, type)
    await dispatch('update', { type })
  },
  async updateSort({ dispatch, commit, state, rootState }, value, type) {
    commit('setSort', value, type)
    commit('setPage', 1, type)
    await dispatch('update', { type })
  },
  async updateView({ dispatch, commit, state, rootState }, value, type) {
    commit('setView', value, type)
    await dispatch('update', { type })
  },
  async updateFilters({ dispatch, commit, state, rootState }, value, type) {
    commit('setFilters', value, type)
    commit('setPage', 1, type)
    await dispatch('update', { type })
  },
  async updateItemsPerPage(
    { dispatch, commit, state, rootState },
    value,
    type
  ) {
    commit('setPage', 1, type)
    commit('setItemsPerPage', value, type)
    await dispatch('update', { type })
  },
  async updatePage({ dispatch, commit, state, rootState }, page, type) {
    commit('setPage', page, type)
    await dispatch('update', { type })
  },
  async updateSearch({ dispatch, commit, state, rootState }, search, type) {
    commit('setPage', 1, type)
    commit('setSearch', search, type)
    await dispatch('update', { type })
  },
  async update({ dispatch, commit, state, getters, rootState }, value = {}) {
    const type = value.type
    console.log('type: ', type)
    console.log('rootState: ', rootState)
    const pipeline = {
      // default filters
      ...filtersRaw[type],
    }
    const queryFilters = {}
    console.log('state', state)
    pipeline.$or = []
    const filters = rootState[type].filters

    Object.keys(filters).forEach((filter) => {
      // remove empty values
      if (
        !(
          (typeof filters[filter] === 'boolean' &&
            filters[filter] !== null &&
            filters[filter] !== undefined) ||
          (Array.isArray(filters[filter]) && filters[filter].length) ||
          (typeof filters[filter] === 'object' &&
            Object.keys(filters[filter]).length)
        )
      ) {
        delete filters[filter]
        return
      }
      // update route query
      queryFilters[filter] = filters[filter]
      const val = filters[filter]
      // convert filters into mongo-like loki query & push in the pipeline
      if (
        filters[filter] ||
        (Array.isArray(filters[filter]) && filters[filter].length)
      ) {
        // check if we are matching against an array value
        if (['tags'].includes(filter)) {
          pipeline[filter] = { $containsAny: val }
          // years to date special case
          // TODO make a fancy feature to limit the gte lt
        } else if (['language'].includes(filter)) {
          pipeline.language = { $containsAny: val }
        } else if (filter === 'category') {
          pipeline.$or.push(
            ...[
              {
                category_1:
                  val.length > 1
                    ? {
                        $in: val.map(
                          (item) => 'content/categories/' + item + '.md'
                        ),
                      }
                    : 'content/categories/' + val[0] + '.md',
              },
              {
                category_2:
                  val.length > 1
                    ? {
                        $in: val.map(
                          (item) => 'content/categories/' + item + '.md'
                        ),
                      }
                    : 'content/categories/' + val[0] + '.md',
              },
            ]
          )
        } else if (filter === 'years') {
          const yearsToInt = val.map((i) => +i)
          if (['articles', 'media'].includes(type)) {
            pipeline[filter] = { $in: yearsToInt }
          } else {
            pipeline[filter] = { $containsAny: yearsToInt }
          }
        } else {
          pipeline[filter] = Array.isArray(val) ? val[0] : val
        }
      }
    })
    if (!pipeline.$or.length) {
      delete pipeline.$or
    } else {
      pipeline.$or = pipeline.$or.flat()
    }
    console.log('pipeline: ', pipeline)
    const count = await this.$content(type, { deep: true })
      .search(rootState[type].search)
      .where(pipeline)
      .only('[]')
      .fetch()

    const totalItems = count.length
    console.log('totalItems: ', totalItems)

    // use Math.ceil to round up to the nearest whole number
    const lastPage = Math.ceil(totalItems / rootState[type].itemsPerPage)

    // use the % (modulus) operator to get a whole remainder
    const lastPageCount = totalItems % rootState[type].itemsPerPage
    const skipNumber = () => {
      if (+rootState[type].page === 1) {
        return 0
      }
      if (+rootState[type].page === lastPage) {
        if (lastPageCount === 0) {
          return totalItems - rootState[type].itemsPerPage
        }

        return totalItems - lastPageCount
      }
      return (+rootState[type].page - 1) * rootState[type].itemsPerPage
    }
    console.log('pipeline: ', pipeline)

    let items = await this.$content(type, { deep: true })
      .where(pipeline)
      .search(rootState[type].search)
      .sortBy(
        rootState[type].sortBy[0],
        rootState[type].sortDesc[0] ? 'desc' : 'asc'
      )
      .skip(skipNumber())
      .limit(rootState[type].itemsPerPage)
      .fetch()
    const defaultView =
      lists[type].views[
        Object.keys(lists[type].views).find(
          (item) => lists[type].views[item].default === true
        )
      ]
    const defaultSort =
      lists[type].sort[
        Object.keys(lists[type].sort).find(
          (item) => lists[type].sort[item].default === true
        )
      ]
    console.log('defaultView: ', defaultView)
    console.log('defaultSort: ', defaultSort)
    // update route
    const query = {
      ...(rootState[type].search &&
        typeof rootState[type].search !== 'undefined' && {
          search: rootState[type].search,
        }),
      ...(rootState[type].page > 1 && {
        page: rootState[type].page.toString(),
      }),
      ...(rootState[type].sortBy?.length &&
        rootState[type].sortBy[0] !== defaultSort.value[0] && {
          sortBy: rootState[type].sortBy[0],
        }),
      ...(rootState[type].sortDesc?.length &&
        (rootState[type].sortDesc[0] ? 'desc' : 'asc') !==
          defaultSort.value[1] && {
          sortDesc: !!(
            rootState[type].sortDesc[0] || defaultSort.value[1] === 'desc'
          ),
        }),
      ...(rootState[type].view &&
        rootState[type].view !== defaultView.name && {
          view: rootState[type].view,
        }),
      ...(Object.keys(filters)?.length && {
        filters: JSON.stringify(queryFilters),
      }),
    }
    const sortObject = (obj) => Object.fromEntries(Object.entries(obj).sort())
    console.log('query: ', JSON.stringify(query))
    console.log(
      'query12: ',
      JSON.stringify(this.$router.currentRoute.query).replace('"true"', 'true')
    )

    Object.keys(query).forEach((key) =>
      query[key] === undefined ? delete query[key] : {}
    )
    console.log(
      'should replace',
      JSON.stringify(sortObject(this.$router.currentRoute.query)) !==
        JSON.stringify(sortObject(query))
    )
    if (
      JSON.stringify(this.$router.currentRoute.query) !== JSON.stringify(query)
    ) {
      this.$router.replace({
        query,
      })
    }

    const pinnedItem = false
    // fetch the item categories
    if (['articles', 'media'].includes(type)) {
      items = await Promise.all(
        await items.map(async (item) => {
          if (item.category_1 && item.category_1.length)
            item.category_1 = await this.$content(
              item.category_1.split('/').slice(1).join('/').split('.')[0]
            )
              .only(['title', 'color'])
              .fetch()
          if (item.category_2 && item.category_2.length)
            item.category_2 = await this.$content(
              // TODO fix (or keep as a lesson) this shameful display of bad string manipulation. One slice could do it, no?
              item.category_2.split('/').slice(1).join('/').split('.')[0]
            )
              .only(['title', 'color'])
              .fetch()
          return item
        })
      )
    }
    console.log('items: ', items)
    /*     const isDesc = rootState[type].sortDesc[0] || defaultSort.value[1]
    const sorter = rootState[type].sortBy[0] || defaultSort.value[0]
    console.log('sorter: ', sorter)
    items = items.sort(
      (a, b) =>
        (isDesc ? a[sorter] : b[sorter]) - (isDesc ? b[sorter] : a[sorter])
    ) */
    commit('setFiltersCount', type)
    commit(
      'setItems',
      {
        items,
        total: totalItems,
        numberOfPages: lastPage,
      },
      type
    )
    /* HIGHLIGHT MECHANISM (disabled until reassessment of its usefulness & relevance
    //TODO deal with that ) 
    // on mobile or list view, highlight slots are the first ones
    if (
      window.$nuxt.$root.$vuetify.breakpoint.mobile ||
      ['list', 'text'].includes(rootState[type].view)
    ) {
      items = items.sort((a, b) => b.highlight - a.highlight)
      console.log('length2', items.length)
      commit('setFiltersCount')
      commit('setItems', {
        items,
        total: totalItems,
        numberOfPages: lastPage,
      })
    } else {
      // on md highlight slots are on a 1/5/6 pattern
      const availableSlots = rootState[type].itemsPerPage / 3

      const highlightedItems = items.filter((item) => item.highlight)

      const slotedHighlightedItems = highlightedItems.slice(0, availableSlots)

      const regularItems = [
        ...highlightedItems.slice(availableSlots),
        ...items.filter((item) => !item.highlight),
      ]

      const sortedItems = []
      slotedHighlightedItems.forEach((element, index) => {
        sortedItems.push(element)
        sortedItems.push(...regularItems.splice(index * 2, 2))
      })
      sortedItems.push(...regularItems)
      commit('setFiltersCount')
      commit('setItems', {
        items: sortedItems,
        total: totalItems,
        numberOfPages: lastPage,
      })
    } */
  },
}
export const getters = {}
