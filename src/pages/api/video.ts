import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { Video } from "../../types/Video";

// Proxy endpoint for fetching videos based on userId
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Video[] | { error: string }>
) {
  const { userId } = req.query as { userId: string };

  try {
    const response = await axios.get<Video[]>(
      `https://external-api.com/videos?user_id=${userId}`
    );
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://scope-video-player-6o7tvurip-danielbogarts-projects.vercel.app"
    );

    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}
