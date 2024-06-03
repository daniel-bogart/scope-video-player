import { withNextVideo } from "next-video/process";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "www.dailymotion.com" },
      { protocol: "https", hostname: "vumbnail.com" },
      // Add remote patterns for Dailymotion and Vimeo
    ],
    // Optionally, you can specify image size limits or other configurations here
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.(mp4|webm|ogg|swf|ogv)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "/_next/static/videos/",
              outputPath: "static/videos/",
              name: "[name].[ext]",
              esModule: false,
            },
          },
        ],
      });
    }
    return config;
  },
};

export default withNextVideo(nextConfig);
