// src/routes/newsRoutes.js
const express = require("express");
const {
  uploadNews,
  fetchNews,
  editNews,
  restrictNews,
} = require("../Controller/newsController");

const router = express.Router();

router.post("/api/upload-news", uploadNews);
router.get("/api/fetch-news", fetchNews);
router.put("/api/edit-news/:id", editNews);
router.put("/api/restrict-news/:id", restrictNews);

module.exports = router;
