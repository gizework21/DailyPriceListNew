// src/models/newsModel.js
const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  isRestricted: { type: Boolean, default: false },
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
