import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface ApiResponse {
  valid: boolean;
  error?: string;
}

function getEmbedUrl(url: string): string | null {
  // Extract YouTube ID
  const youtubeMatch = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  // Extract Vimeo ID
  const vimeoMatch = url.match(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> {
  if (req.method === "POST") {
    const { url } = req.body;
    const embedUrl = getEmbedUrl(url);

    if (!embedUrl) {
      res
        .status(400)
        .json({ valid: false, error: "Invalid video URL format." });
      return;
    }

    try {
      const response = await axios.head(embedUrl);
      res.status(200).json({ valid: response.status === 200 });
    } catch (error) {
      res.status(500).json({ valid: false, error: (error as Error).message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
