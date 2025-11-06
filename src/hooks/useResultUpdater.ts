import { useCallback } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const useResultUpdater = () => {
  const updateAllResults = useCallback(async () => {
    try {
      await axios.post(`${API_URL}/results/update-all`);
    } catch (error) {
      console.error("Error updating results:", error);
    }
  }, []);

  return { updateAllResults };
};
