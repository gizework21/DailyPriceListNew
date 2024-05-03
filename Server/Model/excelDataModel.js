// src/models/excelDataModel.js
const mongoose = require("mongoose");

const excelDataSchema = new mongoose.Schema({
  category: String,
  DESCRIPTION: String,
  UNIT: String,
  price: String,
});

const ExcelData = mongoose.model("ExcelData", excelDataSchema);

module.exports = ExcelData;
