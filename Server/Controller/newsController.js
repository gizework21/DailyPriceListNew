const News = require("../Model/newsModel");
const errorHandler = require("../Utills/errorHandler");

const uploadNews = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      throw {
        statusCode: 400,
        message: "Please provide title and content for the news.",
      };
    }

    const news = new News({ title, content });
    await news.save();
    return res.json({ message: "News uploaded successfully" });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

const fetchNews = async (req, res, next) => {
  try {
    const fetchedNews = await News.find({});
    return res.json(fetchedNews);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

const editNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      throw {
        statusCode: 400,
        message: "Please provide title and content for the news.",
      };
    }

    const updatedNews = await News.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedNews) {
      throw { statusCode: 404, message: "News not found" };
    }

    return res.json({ message: "News updated successfully", updatedNews });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

const restrictNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isRestricted } = req.body;

    const updatedNews = await News.findByIdAndUpdate(
      id,
      { isRestricted },
      { new: true }
    );

    if (!updatedNews) {
      throw { statusCode: 404, message: "News not found" };
    }

    return res.json({
      message: "News restriction updated successfully",
      updatedNews,
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

module.exports = { uploadNews, fetchNews, editNews, restrictNews };
