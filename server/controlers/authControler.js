const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({
        error: "Email is required!",
      });
    }
    if (!password) {
      return res.json({
        error: "Password is required and should be at least 6 characters long!",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken already!",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      res.json({
        error: "Wrong Email or Password",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
