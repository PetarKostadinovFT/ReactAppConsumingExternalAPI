const { mongoose, Schema } = require("mongoose");

const EMAIL_PATERN = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      reuired: true,
      validate: {
        validator(value) {
          return EMAIL_PATERN.test(value);
        },
        message: "Invalid Email",
      },
    },
    password: { type: String, required: true },
    isOwner: { type: Boolean, default: false },
    articlesCreated: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

userSchema.index(
  { email: 1 },
  {
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
