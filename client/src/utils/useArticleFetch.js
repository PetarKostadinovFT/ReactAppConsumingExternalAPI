import { useState } from "react";
import { fetchArticles } from "./fetchArticles";

export function useArticleFetch() {
  const [allArticles, setAllArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const fetchedArticles = await fetchArticles(searchQuery);

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

  return {
    allArticles,
    error,
    isLoading,
    searchQuery,
    handleSearchChange,
    fetchArticles: fetchData,
  };
}

export default useArticleFetch;
