import { useState } from "react";
import axios from "axios";

const useFetchArticles = async () => {
  const [articles, setArticles] = useState([]);

  try {
    const apiKey = "23b364a3b6f643febc8ca02403a66cd4";
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    const response = await axios.get(apiUrl);

    if (response.data.articles) {
      setArticles(response.data.articles);
    } else {
      console.error("No articles found in the response.");
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
};

export default useFetchArticles;
