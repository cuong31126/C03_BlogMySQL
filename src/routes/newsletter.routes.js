const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email required" });

  const [exist] = await db.query(
    "SELECT * FROM subscribers WHERE email = ?",
    [email]
  );

  if (exist.length) {
    return res.json({ message: "Already subscribed" });
  }

  await db.query(
    "INSERT INTO subscribers (email) VALUES (?)",
    [email]
  );

  res.json({ message: "Subscribed successfully" });
});

module.exports = router;