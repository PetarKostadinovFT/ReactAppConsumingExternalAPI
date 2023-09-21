import axios from "axios";
import Cookies from "js-cookie";

export async function fetchArticles(searchQuery) {
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

    return fetchedArticles;
  } catch (error) {
    throw error;
  }
}
