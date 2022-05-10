export default {
  articles: {
    where: {
      published: true,
    },
  },
  authors: {
    articles: { $exists: true },
  },
  media: {},
}
