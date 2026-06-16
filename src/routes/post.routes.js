const express = require("express");
const router = express.Router();


const controller = require("../controllers/post.controller");

// MAIN API
router.get("/tags/:slug/posts", controller.getPostsByTag);

router.get("/recent", controller.getRecentPosts);
// DETAIL
router.get("/:slug", controller.getPostBySlug);

// RELATED
router.get("/:slug/related", controller.getRelatedPosts);



module.exports = router;