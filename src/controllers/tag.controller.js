const tagService = require("../services/tag.service");

// GET /api/tags
const getAllTags = async (req, res) => {
  const data = await tagService.getAllTags();
  res.json({ data });
};

// GET /api/tags/:slug/posts
const getPostsByTag = async (req, res) => {
  const { slug } = req.params;
  const { page = 1, limit = 6 } = req.query;

  const data = await tagService.getPostsByTag(slug, page, limit);

  res.json(data);
};

module.exports = {
  getAllTags,
  getPostsByTag
};