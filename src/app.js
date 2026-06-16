const express = require("express");
const cors = require("cors");

const postRoutes = require("./routes/post.routes");
const tagRoutes = require("./routes/tag.routes");
const newsletterRoutes = require("./routes/newsletter.routes");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/posts", postRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/newsletter", newsletterRoutes);

module.exports = app;