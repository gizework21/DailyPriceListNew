// src/routes/excelRoutes.js
const express = require("express");
const {
  uploadExcel,
  fetchExcelDataByCategory,
} = require("../Controller/excelController");

const router = express.Router();

router.post("/api/upload", uploadExcel);
router.get("/fetch/:category", fetchExcelDataByCategory);

module.exports = router;
