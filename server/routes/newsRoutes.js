const express = require("express");
const router = express.Router();
const cors = require("cors");
const { fetchCatalog } = require("../controlers/newsControler.js");

const newsRouter = express.Router();
newsRouter.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

newsRouter.get("/home", fetchCatalog);

module.exports = newsRouter;
