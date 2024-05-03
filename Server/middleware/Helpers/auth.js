const User = require("../../Model/user.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./config");
const SALT = 10;

const hashPassword = async (password) => {
  let salt = await bcrypt.genSalt(SALT);
  let hash = await bcrypt.hash(password, salt);
  return hash;
};

const hashCompare = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const createToken = async (payload) => {
  let token = await jwt.sign(payload, config.secret);
  return token;
};

const decodeToken = async (token) => {
  try {
    let data = await jwt.verify(token, config.secret);
    return data;
  } catch (error) {
    return new Error("Invalid Token");
  }
};

const validate = async (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1].toString();
    let data = await decodeToken(token);

    const user = await User.findById(data.userId);
    if (user) {
      req.user = data;
      next();
    } else {
      res.status(401).send({ message: "Invalid Credentials" });
    }
  } else {
    res.status(400).send({
      message: "No Token Found",
    });
  }
};


module.exports = {
  hashPassword,
  hashCompare,
  createToken,
  decodeToken,
  validate,
 
};
