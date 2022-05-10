export default {
  articles: {
    published: true,
  },
  authors: {
    articles: { $exists: true },
  },
  media: {},
}
