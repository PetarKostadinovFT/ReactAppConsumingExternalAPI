const bcrypt = require("bcryptjs");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      isOwner: user.isOwner,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

module.exports = { generateToken, hashPassword, comparePassword };
