const express = require("express");
const axios = require("axios");
const cache = require("memory-cache");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const apiKey = "23b364a3b6f643febc8ca02403a66cd4";
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    let { q } = req.query;

    let articles = cache.get("news");

    if (!articles) {
      const response = await axios.get(apiUrl);
      articles = response.data.articles;

      cache.put("news", articles, 5 * 60 * 1000);
    }

    if (q) {
      articles = articles.filter((article) =>
        article.title.toLowerCase().includes(q.toLowerCase())
      );
    }

    res.json(articles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching news", error: error.message });
  }
});

module.exports = router;
