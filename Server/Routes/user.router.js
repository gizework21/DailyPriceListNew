const express = require("express");
const userController = require("../Controller/user.controller");
const Helper = require("../middleware/Helpers/auth");

const router = express.Router();
router.post("/postuser", userController.postUser);
router.post("/login", userController.loginUser);

module.exports = router;
