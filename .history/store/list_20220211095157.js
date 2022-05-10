export const state = () => ({
  items: [],
  display: 0,
  views: [],
  total: 0,
  filters: [],
  skip: 0,
  limit: 20,
  search: '',
  page: 1,
  sortBy: [],
  sortDesc: [true],
  itemsPerPage: 9,
  itemsPerPageArray: [9, 12, 16],
})
export const mutations = {
  update(state, filters) {
    console.log('filters: ', filters)
    const queries = Object.fromEntries(
      Object.entries(filters).map(([key, val]) => [
        key,
        val ? JSON.stringify(val) : undefined,
      ])
    )
    delete queries.items
    console.log('queries.length: ', queries)
    console.log(
      'this.app.router.currentRoute.query.length: ',
      this.app.router.currentRoute.query
    )
    if (
      process.client &&
      (Object.keys(this.app.router.currentRoute.query).length ||
        Object.keys(queries).length)
    ) {
      console.log('  this.app.router: ', this.app.router)
      this.app.router.push({
        path: this.app.router.currentRoute.path,
        query: {
          ...this.app.router.currentRoute.query,
          ...queries,
        },
      })
    }

    Object.keys(filters).forEach((key) => {
      state[key] = filters[key]
    })
  },
  setLoading(state, value) {
    state.loading = value
  },
  nextPage(state, value) {
    if (state.page + 1 <= Math.ceil(state.total / state.itemsPerPage)) {
      state.page += 1
      this.app.router.push({
        query: { ...this.app.router.currentRoute.query, page: state.page },
      })
    }
  },
  formerPage(state, value) {
    if (state.page - 1 >= 1) {
      state.page -= 1
      this.app.router.push({
        query: { ...this.app.router.currentRoute.query, page: state.page },
      })
    }
  },
  updateItemsPerPage(state, value) {
    state.itemsPerPage = value
  },
}
export const actions = {
  /*   async search({ dispatch, commit }, type) {
    console.log('search', filters)
  }, */
  async list({ dispatch, commit, state }, type) {
    console.log('search', state.filters)
    const pipeline = {
      ...state.filters,
    }
    pipeline.$or = []
    /*    Object.keys(query).forEach((filter) => {
      console.log('typeof filter: ', query[filter])
      if (query[filter]?.length && !['page', 'search'].includes(filter)) {
        const val = JSON.parse(query[filter])
        console.log('val: ', val)
        // check if we are matching against an array value
        if (['tags'].includes(filter)) {
          pipeline[filter] = { $containsAny: val }
          // years to date special case
          // TODO make a fancy feature to limit the gte lt
        } else if (filter === 'years') {
          console.log('year: ', new Date(+val[0] + 1, 0))
          if (val.length > 1) {
            pipeline.$or.push(
              val.map((year) => {
                return {
                  date: {
                    $regex: year,
                  },
                }
              })
            )
          } else {
            pipeline.date = { $regex: val[0] }
          }
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
        } else {
          pipeline[filter] =
            val.length > 1
              ? {
                  $in: val,
                }
              : val[0]
        }
      }
    }) */
    if (!pipeline.$or.length) {
      delete pipeline.$or
    } else {
      pipeline.$or = pipeline.$or.flat()
    }
    console.log('pipeline: ', pipeline)
    const count = await this.$content(state.type, { deep: true })
      .search(state.search)
      .where(pipeline)
      .only('[]')
      .fetch()

    const totalItems = count.length
    console.log('totalItems: ', totalItems)

    // use Math.ceil to round up to the nearest whole number
    const lastPage = Math.ceil(totalItems / state.itemsPerPage)

    // use the % (modulus) operator to get a whole remainder
    const lastPageCount = totalItems % state.itemsPerPage
    const skipNumber = () => {
      if (+state.page === 1) {
        return 0
      }
      if (+state.page === lastPage) {
        if (lastPageCount === 0) {
          return totalItems - state.itemsPerPage
        }

        return totalItems - lastPageCount
      }
      return (state.page - 1) * state.itemsPerPage
    }
    let items = await this.$content(state.type, { deep: true })
      .where(pipeline)
      .search(state.search)
      .sortBy(state.sortBy)
      .limit(state.itemsPerPage)
      .skip(skipNumber())
      .fetch()

    const pinnedItem = false
    // fetch the item categories
    if (['articles', 'media'].includes(state.type)) {
      items = await Promise.all(
        items.map(async (item) => {
          if (item.category_1 && item.category_1.length)
            item.category_1 = await this.$content(
              item.category_1.split('/').slice(1).join('/').split('.')[0]
            )
              .only(['name', 'color'])
              .fetch()
          if (item.category_2 && item.category_2.length)
            item.category_2 = await this.$content(
              item.category_2.split('/').slice(1).join('/').split('.')[0] // TODO fix (or keep) this shameful display of bad string manipulation. One slice could do it no?
            )
              .only(['name', 'color'])
              .fetch()
          return item
        })
      )
    }

    // on mobile highlight slots are the first ones
    if (this.$vuetify.breakpoints.isMobile) {
      items = items.sort((a, b) => b.highlight - a.highlight)
    } else {
      // on md highlight slots are on a 1/5/6 pattern
      const availableSlots = perPage / 3

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
      items = sortedItems
    }
  },
}

export const getters = {
  activeFiltersCounter(state) {
    return Object.values(state.filters).filter((e) => {
      if (Array.isArray(e)) return e.length
      else {
        return typeof e === 'number' || e
      }
    }).length
  },
}
