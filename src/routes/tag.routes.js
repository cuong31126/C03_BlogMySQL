const express = require("express");
const router = express.Router();

const tagController = require("../controllers/tag.controller");

// GET ALL TAGS
router.get("/", tagController.getAllTags);

// GET POSTS BY TAG
router.get("/:slug/posts", tagController.getPostsByTag);

module.exports = router;