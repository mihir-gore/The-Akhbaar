import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const useMarketNews = ({ q = "", symbol = "", market_id = "", size = 10, } = {}) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMarketNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${API_URL}/api/market-news`, {
          params: { q, symbol, market_id, size },
        });

        if (!response.data.success) {
          throw new Error(
            response.data.message || "Failed to fetch market news"
          );
        }
        setResults(
          Array.isArray(response.data.results) ? response.data.results : []
        );
      } catch (error) {
        console.error("Market News Error:", error);
        setError(
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch market news"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMarketNews();
  }, [q, symbol, market_id, size]);

  return { results, loading, error };
};

export default useMarketNews;