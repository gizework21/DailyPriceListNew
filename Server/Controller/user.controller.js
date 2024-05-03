const User = require("../Model/user.model");
const helper = require("../middleware/Helpers/auth");
const handleErrors  = require("../Utills/errorHandler");

const postUser = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const exists = await User.findOne({ phoneNumber: phoneNumber });
    if (exists) {
      throw Error("phoneNumber already in use");
    }

    const hashedPassword = await helper.hashPassword(password);
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ user: user, status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (user) {
      if (await helper.hashCompare(password, user.password)) {
        const token = await helper.createToken({
          userId: user._id,
        });

        res.status(200).send({
          message: "Login Successful!",
          token,
          user,
        });
      } else {
        res.status(400).send({ message: "Invalid Credentials" });
      }
    } else {
      res.status(400).send({
        message: `A user with phone number ${phoneNumber} does not exist`,
      });
    }
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = {
  postUser,
  loginUser,
};
