const express = require("express");
const mongoose = require("mongoose");
const newsRoutes = require("./routes/newsRoutes");
const Routes = require("./routes/userRoutes");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

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

app.use("/api/", newsRoutes);
// app.use("/api/users", userRoutes);
app.use("/", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
