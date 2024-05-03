const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation error. Please check your input.";
  } else if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 400;
    message = "Invalid ID format.";
  } else if (err.name === "MongoError" && err.code === 11000) {
    statusCode = 400;
    message = "Duplicate key error. The resource already exists.";
  }

  res.status(statusCode).json({ error: { message } });
};

module.exports = errorHandler;

const handleErrors = (err, res) => {
  console.log(err);
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = handleErrors;