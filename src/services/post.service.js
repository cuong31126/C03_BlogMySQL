const db = require("../config/database");

// GET posts by tag
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

  const [[{ total }]] = await db.query(
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
      page,
      limit,
      total
    }
  };
};

// POST DETAIL
const getPostBySlug = async (slug) => {
  const [rows] = await db.query(
    "SELECT * FROM posts WHERE slug = ?",
    [slug]
  );
  return rows[0];
};

// RELATED POSTS
const getRelatedPosts = async (slug) => {
  const [current] = await db.query(
    "SELECT id FROM posts WHERE slug = ?",
    [slug]
  );

  if (!current.length) return [];

  const postId = current[0].id;

  const [rows] = await db.query(
    `
    SELECT DISTINCT p.*
    FROM posts p
    JOIN post_tags pt1 ON p.id = pt1.post_id
    WHERE pt1.tag_id IN (
      SELECT tag_id FROM post_tags WHERE post_id = ?
    )
    AND p.id != ?
    ORDER BY p.created_at DESC
    LIMIT 3
    `,
    [postId, postId]
  );

  return rows;
};



const getRecentPosts = async (limit) => {
  const [rows] = await db.query(
    `
    SELECT *
    FROM posts
    ORDER BY created_at DESC
    LIMIT ?
    `,
    [Number(limit)]
  );

  return rows;
};



module.exports = {
  getPostsByTag,
  getPostBySlug,
  getRelatedPosts,
  getRecentPosts
};