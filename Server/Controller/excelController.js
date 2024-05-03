const multer = require("multer");
const xlsx = require("xlsx");
const ExcelData = require("../Model/excelDataModel");
const errorHandler = require("../Utills/errorHandler");

// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("file"); // Use .single("file") to handle a single file

const uploadExcel = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred during file upload
          reject({ statusCode: 400, message: "Multer error during file upload" });
        } else if (err) {
          // An unknown error occurred during file upload
          reject({ statusCode: 500, message: "Unknown error during file upload" });
        } else {
          resolve();
        }
      });
    });

    if (!req.file) {
      throw { statusCode: 400, message: "No file uploaded" };
    }

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const category = req.body.category;

    // Check if data with the same category already exists
    const existingData = await ExcelData.find({ category });

    if (existingData.length > 0) {
      // Remove existing data with the same category
      await ExcelData.deleteMany({ category });
    }

    // Add the new data with the specified category
    const dataWithCategory = data.map((item) => ({
      ...item,
      category,
    }));

    await ExcelData.insertMany(dataWithCategory);
    return res.json({ message: "File uploaded successfully" });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

const fetchExcelDataByCategory = async (req, res, next) => {
  try {
    const category = req.params.category;

    // Fetch Excel data based on the specified category
    const fetchedData = await ExcelData.find({ category });

    return res.json(fetchedData);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

module.exports = { uploadExcel, fetchExcelDataByCategory };
