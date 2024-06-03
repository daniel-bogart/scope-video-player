import axios from "axios";

export const isValidVideoUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await axios.post<{ valid: boolean }>("/api/validate-url", {
      url,
    });
    return response.data.valid;
  } catch (error) {
    console.error("Error validating URL:", error);
    return false;
  }
};
