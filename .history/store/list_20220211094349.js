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
  async search({ dispatch, commit }, type) {
    console.log('search', filters)
  },
  async list({ dispatch, commit }, type) {
    console.log('search', filters)
    const pipeline = {
      ...filters,
    }
    pipeline.$or = []
    Object.keys(query).forEach((filter) => {
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
    })
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
