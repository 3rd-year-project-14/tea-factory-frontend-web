import { useEffect, useState } from "react";
import axios from "axios";

export function useRoutes() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRoutes() {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/api/routes");
        setRoutes(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRoutes();
  }, []);

  return { routes, loading, error };
}
