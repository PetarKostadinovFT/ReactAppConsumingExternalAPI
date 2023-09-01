import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function useArticleFetch() {
  const [allArticles, setAllArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchArticles = async () => {
    setIsLoading(true);

    try {
      const token = Cookies.get("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get("/api/articles/home", {
        params: { q: searchQuery },
        headers,
      });
      const fetchedArticles = response.data;

      if (fetchedArticles) {
        setAllArticles(fetchedArticles);
        setError(null);
      } else {
        setAllArticles([]);
        setError("No articles found.");
      }
    } catch (error) {
      setAllArticles([]);
      setError("Error loading news. Please try again later.");
    }

    setIsLoading(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return {
    allArticles,
    error,
    isLoading,
    searchQuery,
    handleSearchChange,
    fetchArticles,
  };
}

export default useArticleFetch;
