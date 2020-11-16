const Post = require('./post');
const WebPage = require('./webpage');
searchWebPageByQuery = (query, cb) => Post.search(
  {
    query_string: {
      query
    }
  },
  {
    hydrate: true
  },
  async (error, posts) => {
    try {
      if (error) {
        cb(error);
      } else {
        const webpage_ids =
          posts.hits.hits
            .map(post => post && post.webpage)
            .filter(webpage_id => webpage_id);
        const webpages = await WebPage
          .find({_id: {$in: webpage_ids}})
          .populate('author');
        cb(null, webpages);
      }
    } catch (error) {
      cb(error);
    }
  }
);

module.exports = {
  searchWebPageByQuery
}
