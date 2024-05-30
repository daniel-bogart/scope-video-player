import axios from "axios";

const API_BASE_URL = "https://take-home-assessment-423502.uc.r.appspot.com/api";

export const fetchVideos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/videos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const createVideo = async (video: {
  user_id: string;
  description: string;
  video_url: string;
  title: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/videos`, video);
    return response.data;
  } catch (error) {
    console.error("Error creating video:", error);
    throw error;
  }
};
