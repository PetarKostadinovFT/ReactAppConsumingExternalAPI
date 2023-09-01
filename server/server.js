const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/articles", require("./routes/newsRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;