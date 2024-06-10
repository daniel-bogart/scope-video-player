import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { Comment } from "../../types/Comment"; // Ensure this path is correct

interface ErrorResponse {
  error: string;
  details?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Comment[] | ErrorResponse>
) {
  const { video_id } = req.query as { video_id: string };
  const baseUrl =
    "https://take-home-assessment-423502.uc.r.appspot.com/videos/comments";

  try {
    let response;
    if (req.method === "GET" && video_id) {
      response = await axios.get<Comment[]>(`${baseUrl}?video_id=${video_id}`);
    } else if (req.method === "POST") {
      response = await axios.post<Comment[]>(baseUrl, req.body);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
      return;
    }

    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://www.learnwell-portfolio-project.com"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error(
      "Error handling comments:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to handle comments",
      details: error.message,
    });
  }
}
