export default {
  articles: {
    filter: {
      year: {
        type: 'Select',
        rules: {},
        label: 'year',
        items: (articles) => {
          return articles.map((article) => new Date(article.date).getFullYear())
        },
      } /* 
      categories: {
        type: 'TextInput',
        rules: {},
        label: 'Search',
      },
      author: {
        type: 'Autocomplete',
        rules: {},
        label: 'authors',
      }, */,
    },
    sort: {
      nameasc: {
        icon: 'mdi-sort-alphabetical-ascending',
        text: 'By name, from A to Z',
      },
      namedesc: {
        icon: 'mdi-sort-alphabetical-descending',
        text: 'By name, from Z to A',
      },
      dateasc: {
        icon: 'mdi-sort-calendar-ascending',
        text: 'By date, most recent first',
      },
      datedesc: {
        icon: 'mdi-sort-calendar-descending',
        text: 'By date, oldest first',
      },
    },
    views: {},
  },
  events: {
    search: {
      type: 'Search',
    },
    sortBy: {
      type: 'Select',
      items: ['date'],
    },
    status: {
      type: 'Select',
      items: ['draft', 'published'],
    },
  },
  media: {},
  authors: {},
}
