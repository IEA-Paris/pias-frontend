export default {
  articles: {
    perPage: {
      options: [9, 12, 16],
      default: 9,
    },
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
        icon: 'sort-alphabetical-ascending',
        text: 'by-name-from-a-to-z',
        value: ['article_title', 'asc'],
      },
      namedesc: {
        icon: 'sort-alphabetical-descending',
        text: 'by-name-from-z-to-a',
        value: ['article_title', 'desc'],
      },
      dateasc: {
        icon: 'sort-calendar-descending',
        text: 'by-date-most-recent-first',
        value: ['date', 'desc'],
        default: true,
      },
      datedesc: {
        icon: 'sort-calendar-ascending',
        text: 'by-date-oldest-first',
        value: ['date', 'asc'],
      },
    },
    views: [
      {
        name: 'tiles',
        icon: 'view-quilt',
      },
      {
        name: 'list',
        icon: 'view-list',
        default: true,
      },
      {
        name: 'text',
        icon: 'text-long',
      },
    ],
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
  media: {
    perPage: {
      options: [9, 12, 16],
      default: 9,
    },
    sort: {
      nameasc: {
        icon: 'sort-alphabetical-ascending',
        text: 'by-name-from-a-to-z',
        value: ['article_title', 'asc'],
      },
      namedesc: {
        icon: 'sort-alphabetical-descending',
        text: 'by-name-from-z-to-a',
        value: ['article_title', 'desc'],
      },
      dateasc: {
        icon: 'sort-calendar-ascending',
        text: 'by-date-most-recent-first',
        value: ['date', 'desc'],
        default: true,
      },
      datedesc: {
        icon: 'sort-calendar-descending',
        text: 'by-date-oldest-first',
        value: ['date', 'asc'],
      },
    },
    views: [
      {
        name: 'tiles',
        icon: 'view-quilt',
        default: true,
      },
      {
        name: 'list',
        icon: 'view-list',
      },
      {
        name: 'text',
        icon: 'text-long',
      },
    ],
  },
  authors: {
    sort: {
      nameasc: {
        icon: 'sort-alphabetical-ascending',
        text: 'by-name-from-a-to-z',
        value: ['article_title', 'asc'],
        default: true,
      },
      namedesc: {
        icon: 'sort-alphabetical-descending',
        text: 'by-name-from-z-to-a',
        value: ['article_title', 'desc'],
      },
      dateasc: {
        icon: 'sort-calendar-ascending',
        text: 'by-date-most-recent-first',
        value: ['date', 'asc'],
      },
      datedesc: {
        icon: 'sort-calendar-descending',
        text: 'by-date-oldest-first',
        value: ['date', 'desc'],
      },
    },
    views: [
      {
        name: 'tiles',
        icon: 'view-quilt',
      },
      {
        name: 'list',
        icon: 'view-list',
      },
      {
        name: 'text',
        icon: 'text-long',
        default: true,
      },
    ],
  },
}
