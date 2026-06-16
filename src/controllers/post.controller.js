const postService = require("../services/post.service");

// GET /tags/:slug/posts
const getPostsByTag = async (req, res) => {
  const { slug } = req.params;
  const { page = 1, limit = 6 } = req.query;

  const data = await postService.getPostsByTag(slug, page, limit);
  res.json(data);
};

// GET /posts/:slug
const getPostBySlug = async (req, res) => {
  const data = await postService.getPostBySlug(req.params.slug);
  res.json(data);
};

// GET /related
const getRelatedPosts = async (req, res) => {
  const data = await postService.getRelatedPosts(req.params.slug);
  res.json({ data });
};

const getRecentPosts = async (req, res) => {
  const limit = req.query.limit || 3;

  const data = await postService.getRecentPosts(limit);

  res.json({ data });
};

module.exports = {
  getPostsByTag,
  getPostBySlug,
  getRelatedPosts,
  getRecentPosts
};