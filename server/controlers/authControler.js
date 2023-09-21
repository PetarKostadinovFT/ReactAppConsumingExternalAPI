const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils");
const jwt = require("jsonwebtoken");
const emailValidator = require("email-validator");

const registerUser = async (req, res) => {
  const { email, password, repass } = req.body;

  if (!emailValidator.validate(email)) {
    return res.json({
      error: "Invalid email format!",
    });
  }
  try {
    if (!email || !password) {
      return res.json({
        error: "All fields are required!",
      });
    }

    if (password.length < 6) {
      return res.json({
        error: "Password must be 6 or more characters!",
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

    jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Error generating token" });
        }
        res.cookie("token", token).json(user);
      }
    );
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
