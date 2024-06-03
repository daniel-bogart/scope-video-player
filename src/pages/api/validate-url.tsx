import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface ApiResponse {
  valid: boolean;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> {
  if (req.method === "POST") {
    const { url } = req.body;
    try {
      const response = await axios.head(url);
      res.status(200).json({ valid: response.status === 200 });
    } catch (error) {
      res.status(500).json({ valid: false, error: (error as Error).message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
