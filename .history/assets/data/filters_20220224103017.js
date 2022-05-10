export default {
  articles: {
    where: {
      published: true,
    },
  },
  authors: {
    find: {
      articles: { $exists: true },
    },
  },
  media: {},
}
