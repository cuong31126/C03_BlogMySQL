const db = require("../config/database");

// GET ALL TAGS
const getAllTags = async () => {
  const [rows] = await db.query("SELECT * FROM tags");
  return rows;
};

// GET POSTS BY TAG
const getPostsByTag = async (slug, page, limit) => {
  const offset = (page - 1) * limit;

  const [posts] = await db.query(
    `
    SELECT p.*
    FROM posts p
    JOIN post_tags pt ON p.id = pt.post_id
    JOIN tags t ON t.id = pt.tag_id
    WHERE t.slug = ?
    ORDER BY p.created_at DESC
    LIMIT ? OFFSET ?
    `,
    [slug, Number(limit), offset]
  );

  const [[count]] = await db.query(
    `
    SELECT COUNT(*) as total
    FROM posts p
    JOIN post_tags pt ON p.id = pt.post_id
    JOIN tags t ON t.id = pt.tag_id
    WHERE t.slug = ?
    `,
    [slug]
  );

  return {
    data: posts,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: count.total
    }
  };
};

module.exports = {
  getAllTags,
  getPostsByTag
};